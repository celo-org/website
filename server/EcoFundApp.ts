import getConfig from "next/config"
import { Application, Recommendation, Tables } from "../fullstack/EcoFundFields"
import airtableInit from "../server/airtable"
import { submitForm } from "./addToCRM"
import { FormIDs, HubSpotEcoFundApplication, HubSpotEcoFundRecommendation } from "./Hubspot"

export default function submit(fields: Recommendation | Application, table: Tables) {
  switch (table) {
    case Tables.Applicants:
      return apply(fields as Application)
    case Tables.Recommendations:
      return recommend(fields as Recommendation)
    default:
      return Promise.reject({ message: `Invalid Table ${table}` })
  }
}

function getAirtable(tableName: Tables) {
  const { serverRuntimeConfig } = getConfig()
  return airtableInit(serverRuntimeConfig.AIRTABLE_ECOFUND_ID)(tableName)
}

async function recommend(fields: Recommendation) {
  await submitForm(
    FormIDs.ECO_FUND_REFERRAL,
    objectToFieldsArray(convertRecommendationToHubSpot(fields))
  )
  return getAirtable(Tables.Recommendations).create(fields)
}

async function apply(fields: Application) {
  return submitForm(FormIDs.ECO_FUND, objectToFieldsArray(convertApplicationToHubSpot(fields)))
  // return getAirtable(Tables.Applicants).create(fields)
}

function convertApplicationToHubSpot(fields: Application): HubSpotEcoFundApplication {
  return {
    name: fields.org,
    domain: fields.url,
    email: fields.founderEmail,
    website: fields.video, // video
    description: fields.about, // What the company does
    project_description: fields.product,
  }
}

function convertRecommendationToHubSpot(fields: Recommendation): HubSpotEcoFundRecommendation {
  return {
    email: fields.email,
    company: fields.org,
  }
}

function objectToFieldsArray(
  fields: HubSpotEcoFundRecommendation | HubSpotEcoFundApplication
): { name: string; value: string }[] {
  return Object.keys(fields).map((name) => ({ name, value: fields[name] }))
}
