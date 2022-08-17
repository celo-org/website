import getConfig from "next/config"
import airtableInit from "./airtable"
import { fetchCached, MINUTE } from "./cache"

async function fetchCico() {
  const countries = []
  await getAirtable()
    .select({ sort: [{ field: "cicoProvider" }] })
    .eachPage((records, fetchNextPage) => {
      records.forEach((country) => countries.push(country))
      fetchNextPage()
    })

  return countries
}

export default async function getCico() {
  const data = await fetchCached("cico", "en", 1 * MINUTE, fetchCico)
  return data.map(({ fields }) => fields)
}

function getAirtable() {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_CICO_DATABASE_ID)(
    "CICO_DB_March2022"
  )
}
