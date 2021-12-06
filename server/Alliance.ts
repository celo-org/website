import * as hubspot from "@hubspot/api-client"
import { Attachment, FieldSet, Table } from "airtable"
import getConfig from "next/config"
import Ally, { NewMember } from "../src/alliance/AllianceMember"
import { Category } from "../src/alliance/CategoryEnum"
import addToCRM, { ListID } from "./addToCRM"
import airtableInit, { getImageURI, getWidthAndHeight, ImageSizes } from "./airtable"
import { fetchCached, MINUTE } from "./cache"

export const CATEGORY_FIELD = "Web Category*"
export const LOGO_FIELD = "Logo Upload"
export const URL_FIELD = "Company URL*"

interface Fields extends FieldSet {
  Name: string
  Approved: boolean
  [URL_FIELD]: string
  [CATEGORY_FIELD]: Category[]
  [LOGO_FIELD]: Attachment[]
}

const WRITE_SHEET = "Web Requests"

export default async function getAllies() {
  return fetchCached("approved_alliance_member", "en", 2 * MINUTE, () => fetchAllies())
}

async function fetchAllies() {
  const { serverRuntimeConfig } = getConfig()

  const hubspotClient = new hubspot.Client({ apiKey: serverRuntimeConfig.HUBSPOT_API_KEY })

  try {
    const apiResponse = await hubspotClient.crm.companies.searchApi.doSearch({
      // @ts-ignore
      filterGroups: [
        { filters: [{ value: "true", propertyName: "approved_alliance_member", operator: "EQ" }] },
      ],
      properties: ["categories", "name", "domain"],
      // limit: 0,
      after: 0,
    })
    console.log(JSON.stringify(apiResponse.body, null, 2))
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

function getAirtable<T extends FieldSet>(sheet: string) {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ALLIANCE_ID)(sheet) as Table<T>
}

export function normalize(asset: Fields): Ally {
  return {
    name: asset.Name,
    logo: {
      uri: getImageURI(asset["Logo Upload"], ImageSizes.large),
      ...getWidthAndHeight(asset["Logo Upload"]),
    },
    url: asset[URL_FIELD],
  }
}

// creates entry in airtable and (if opted in) in Hubspot's Alliance list
export async function create(data: NewMember) {
  const actions: Promise<any>[] = [
    getAirtable<WebRequestFields>(WRITE_SHEET).create(convertWebToAirtable(data)),
  ]

  actions.push(
    addToCRM(
      { email: data.email, fullName: data.name, contribution: data.contribution },
      ListID.Alliance
    )
  )

  return Promise.all(actions)
}

interface WebRequestFields extends FieldSet {
  Name: string
  Email: string
  Contribution: string
  Newsletter: boolean
}

function convertWebToAirtable(input: NewMember): WebRequestFields {
  return {
    Name: input.name,
    Contribution: input.contribution,
    Newsletter: input.subscribe,
    Email: input.email,
  }
}
