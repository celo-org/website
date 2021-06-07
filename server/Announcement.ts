import getConfig from "next/config"
import airtableInit from "../server/airtable"
import Sentry from "../server/sentry"
import cache from "./cache"

export interface Fields {
  live?: boolean
  text: string
  link: string
  block?: string[]
}

interface Record {
  id: string
  fields: Fields
}
// countryCode is a ISO 3166-1 alpha-2
export default async function latestAnnouncements(countryCode: string): Promise<Fields[]> {
  try {
    const announcements = await cache<Fields[]>("blue-announcements", fetchAnouncmentRecords)

    const anyBlocked = announcements.some(
      (announcement) => announcement.block && announcement.block.length > 0
    )

    if (anyBlocked) {
      return censor(announcements, countryCode)
    }
    return announcements
  } catch (err) {
    Sentry.captureException(err)
  }
}

async function fetchAnouncmentRecords() {
  const records = (await getAirtable()
    .select({
      maxRecords: 10,
      filterByFormula: IS_LIVE,
      sort: [{ field: "order", direction: "desc" }],
    })
    .firstPage()) as Record[]
  return records.map((record) => record.fields)
}

function getAirtable() {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ANNOUNCEMENT_ID)("Bluebanner")
}

// just export for testing!
// remove announcements that have been marked as blocked for the country our ip says we are in
export function censor(announcements: Fields[], country?: string) {
  const lowerCountry = country && country.toLowerCase && country.toLowerCase()

  if (!country) {
    return announcements.filter((announcement) => !announcement.block)
  }

  return announcements.filter((announcement) =>
    announcement.block ? !announcement.block.includes(lowerCountry) : true
  )
}

const IS_LIVE = "live=1"
