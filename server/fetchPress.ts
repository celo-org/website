import getConfig from "next/config"
import airtableInit from "./airtable"
import { fetchCached, MINUTE } from "./cache"

async function fetchPress() {
  const records = await getAirtable()
    .select({ sort: [{ field: "date", direction: "desc" }] })
    .firstPage()
  return records
}

export default async function getMilestones() {
  const releases = await fetchCached("celo-press", "en", 1 * MINUTE, fetchPress)
  return releases.map(({ fields }) => fields)
}

function getAirtable() {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ANNOUNCEMENT_ID)("Press")
}
