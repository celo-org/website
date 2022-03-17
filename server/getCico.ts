import { Attachment, FieldSet, Table } from "airtable"
import getConfig from "next/config"
import { Contributor } from "../src/about/Contributor"
import airtableInit from "./airtable"
import { fetchCached, MINUTE } from "./cache"

interface Fields extends FieldSet {
  Country?: string
  Population?: number
  Restricted?: string
  "CICO Provider"?: string
  "Payment Type"?: string
  "CICO Type"?: string
  "Celo Assets"?: string[]
}

async function fetchCico() {
  // const country = await fetchCached()
}

// const SHEET = "CICO Database"

// async function fetchCico() {

//   }

//   const IS_APROVED = "Approved=1"
function getAirtable() {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_CICO_DATABASE_ID)("CICO Database")
}
