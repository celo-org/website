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

// const SHEET = "CICO Database"

// // async function fetchCico() {

// //   }

//   function getAirtable(sheet: string) {
//     return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ANNOUNCEMENT_ID)(
//       sheet
//     ) as Table<Fields>
//   }

//   const IS_APROVED = "Approved=1"
