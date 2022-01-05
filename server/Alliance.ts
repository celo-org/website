import * as hubspot from "@hubspot/api-client"
import getConfig from "next/config"
import AllianceMember from "../src/alliance/AllianceMember"
import Ally, { Grouping } from "../src/alliance/AllianceMember"
import { fetchCached, MINUTE } from "./cache"
import { groupBy } from "./GroupBy"
import probe from "probe-image-size"

export const CATEGORY_FIELD = "Web Category*"
export const LOGO_FIELD = "Logo Upload"
export const URL_FIELD = "Company URL*"

interface HubSpotField {
  id: string
  properties: {
    [key: string]: string
  }
}

export default async function getAllies() {
  return fetchCached("approved_alliance_member", "en", 2 * MINUTE, () => fetchAllies())
}
// get the data, normalize it, group it, format it as an Array of Groupings

async function fetchAllies(): Promise<Grouping[]> {
  const { serverRuntimeConfig } = getConfig()

  const hubspotClient = new hubspot.Client({ apiKey: serverRuntimeConfig.HUBSPOT_API_KEY })

  try {
    const apiResponse = await hubspotClient.crm.companies.searchApi.doSearch({
      filterGroups: [
        // @ts-ignore
        { filters: [{ value: "true", propertyName: "approved_alliance_member", operator: "EQ" }] },
      ],
      properties: ["categories", "name", "domain", "logo"],
      after: 0,
    })

    const probeImage = await Promise.all(
      apiResponse.body.results.map((image) => {
        try {
          const logo = image.properties.logo
          if (logo !== null && logo.startsWith("https://")) {
            console.log(logo, "this is logo inside the conditional")
            return probe(logo)
          }
        } catch (err) {
          console.error(err)
        }
      })
    )
    const imgWidth = probeImage[0].width
    const imgHeight = probeImage[0].height

    // console.log(JSON.stringify(apiResponse.body, null, 2))
    const normalized = apiResponse.body.results.map((result) => normalizeHubspot(result))
    const groups = groupBy(normalized)
    const companies = Object.entries<AllianceMember[]>(groups).map((group) => {
      group[1][0].logo.width = imgWidth
      group[1][0].logo.height = imgHeight
      return { name: group[0], records: group[1] }
    })
    return companies
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

export function normalizeHubspot(asset: HubSpotField): Ally {
  return {
    name: asset.properties.name,
    url: asset.properties.domain,
    logo: { uri: asset.properties.logo, width: 0, height: 0 },
    categories: asset.properties.categories,
  }
}
