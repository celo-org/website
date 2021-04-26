import airtableInit from './airtable'
import getConfig from 'next/config'
import { FieldSet, Table } from 'airtable'

interface Fields extends FieldSet {
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
  return getAirtable<Fields>('Web').create(convert(data))
}

function convert(data): Fields {
  return {
    Name: data.name,
    Email: data.email,
    Reason: data.reason,
    Organization: data.orgName
  }
}