import airtableInit from "./airtable"
import getConfig from "next/config"
import { FieldSet, Table } from "airtable"
import addToCRM, { ListID } from "./addToCRM"

export interface Fields extends FieldSet {
  Name: string
  Email: string
  Reason: string
  Organization: string
}

function getAirtable<T extends FieldSet>(sheet: string) {
  const id = getConfig().serverRuntimeConfig.AIRTABLE_PUBLIC_SECTOR_ID
  return airtableInit(id)(sheet) as Table<T>
}

export async function create(data) {
  try {
    return Promise.all([
      getAirtable<Fields>("Web").create(convert(data)),
      addToCRM({ email: data.email, fullName: data.name }, ListID.PublicSector, {
        name: data.orgName,
        description: data.reason,
      }),
    ])
  } catch (e) {
    return Promise.reject(e)
  }
}

function convert(data): Fields {
  return {
    Name: data.name,
    Email: data.email,
    Reason: data.reason,
    Organization: data.orgName,
  }
}
