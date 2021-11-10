import getConfig from "next/config"
import { Application, Recommendation, Tables } from "../fullstack/EcoFundFields"
import airtableInit from "../server/airtable"
import { addManyCRM, ListID } from "./addToCRM"
import { HubSpotCompany, HubSpotContact } from "./Hubspot"

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
  const [contact1, contact2, company] = convertRecommendationToHubSpot(fields)
  await Promise.all([
    addManyCRM(ListID.FundReferrals, company, [contact1, contact2]),
    getAirtable(Tables.Recommendations).create(fields),
  ])
}

async function apply(fields: Application) {
  const [contact, otherContacts, company] = convertApplicationToHubSpot(fields)
  await Promise.all([
    addManyCRM(ListID.FundApplicants, company, [...otherContacts, contact]),
    getAirtable(Tables.Applicants).create(fields),
  ])
}

function convertApplicationToHubSpot(
  fields: Application
): [HubSpotContact, HubSpotContact[], HubSpotCompany] {
  const emails =
    fields.coFounderEmail.length > 2
      ? fields.coFounderEmail.includes(",")
        ? fields.coFounderEmail.split(",")
        : fields.coFounderEmail.split(" ")
      : []
  return [
    {
      email: fields.founderEmail,
    },
    emails.map((email) => ({
      email,
      hs_content_membership_notes: "listed as a cofounder on Ecosystem Fund Application",
    })),
    {
      name: fields.org,
      domain: fields.url,
      website: fields.video, // video
      description: fields.about, // What the company does
      project_description: fields.product,
    },
  ]
}

function convertRecommendationToHubSpot(
  fields: Recommendation
): [HubSpotContact, HubSpotContact, HubSpotCompany] {
  const [firstname, lastname] = separateName(fields.founderName)
  return [
    {
      email: fields.email,
    },
    {
      email: fields.founderEmail,
      firstname,
      lastname,
      hs_content_membership_notes: `Referred by ${fields.email}`,
    },
    { name: fields.org },
  ]
}

function separateName(name: string) {
  const [firstName, ...restNames] = name.split(" ")
  const lastName = restNames.join(" ")
  return [firstName, lastName]
}
