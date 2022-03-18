import getConfig from "next/config"
import airtableInit from "./airtable"
import { fetchCached, MINUTE } from "./cache"

async function fetchCico() {
  const country = await getAirtable()
    .select({ sort: [{ field: "cicoProvider" }] })
    .firstPage()
  return country
}

export default async function getCico() {
  const data = await fetchCached("cico", "en", 1 * MINUTE, fetchCico)
  return data.map(({ fields }) => fields)
}

function getAirtable() {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_CICO_DATABASE_ID)("CICO Database")
}
