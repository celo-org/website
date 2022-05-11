import * as hubspot from "@hubspot/api-client"
import getConfig from "next/config"
import { HubSpotCompany, HubSpotContact } from "./Hubspot"

interface CRMInterface {
  email: string
  fullName: string
  contribution?: string
}

export enum ListID {
  Newsletter = "70",
  Alliance = "76",
  FundReferrals = "118",
  FundApplicants = "117",
  PublicSector = "119",
  CeloConnect = "142",
  Enterprise = "124",
}

function convert(formContact: CRMInterface): HubSpotContact {
  let names = {}
  let contribution = {}
  if (formContact.fullName) {
    const [firstName, ...restNames] = formContact.fullName
    const lastName = restNames.join(" ")
    names = {
      firstname: firstName,
      lastname: lastName,
    }
  }

  if (formContact.contribution) {
    contribution = {
      additional_information_about_your_project___areas_of_interest: formContact.contribution,
    }
  }
  return {
    email: formContact.email,
    ...names,
    ...contribution,
  }
}

function apiKey() {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.HUBSPOT_API_KEY
}

export default async function addToCRM(
  contact: CRMInterface,
  list: ListID,
  company?: HubSpotCompany
) {
  const hubSpotClient = HubSpotClient()

  try {
    const [contactCreated, _] = await Promise.all([
      createContactOrUpdate(hubSpotClient, contact),
      addContactsToList(list, [contact.email]),
    ])

    addContactsToList(list, [contact.email])

    if (company) {
      const companyCreated = await createCompany(hubSpotClient, company)
      await linkContactToCompany(hubSpotClient, {
        companyId: companyCreated.body.id,
        contactId: contactCreated.body.id,
      })
    }
  } catch (e) {
    throw new CRMError(e)
  }
}

export async function addManyCRM(
  list: ListID,
  company: HubSpotCompany,
  contacts: HubSpotContact[]
) {
  try {
    const hubSpotClient = HubSpotClient()

    const companyCreated = await createCompany(hubSpotClient, company)

    const modifiedContacts = await batchCreateOrUpdate(hubSpotClient, contacts)
    await addContactsToList(
      list,
      contacts.map((contact) => contact.email)
    )
    return Promise.all(
      modifiedContacts.map((contact) =>
        linkContactToCompany(hubSpotClient, {
          companyId: companyCreated.body.id,
          contactId: contact.id,
        })
      )
    )
  } catch (e) {
    throw new CRMError(e)
  }
}

function CRMError(e) {
  e.message === "HTTP request failed"
    ? console.error("RESPONSE", JSON.stringify(e.response, null, 2))
    : console.error(e)

  this.name = "CRMError"
  this.message = e.response?.body?.message || e.message
  this.statusCode = e.response?.statusCode
  this.toString = () => {
    return String(this.message)
  }

  const start = this.message.indexOf("{")
  const end = this.message.lastIndexOf("}")

  if (start !== -1 && end !== -1) {
    const maybeJson = this.message.slice(start, end + 1)
    try {
      this.message = JSON.parse(maybeJson).message
    } catch {
      // if its not json just silently fail and use original message for error.
    }
  }
}

async function batchCreateOrUpdate(hubSpotClient: hubspot.Client, contacts: HubSpotContact[]) {
  const BatchReadInputSimplePublicObjectId = {
    properties: ["email"],
    idProperty: "email",
    inputs: contacts.map((contact) => ({ id: contact.email })),
  }

  // Get already existing contacts
  const existingContactsResponse = await hubSpotClient.crm.contacts.batchApi.read(
    BatchReadInputSimplePublicObjectId
  )

  const updates: Array<Promise<{ body: hubspot.contactsModels.BatchResponseSimplePublicObject }>> =
    []

  // Update all Updatable
  if (existingContactsResponse.body.results.length > 0) {
    const merged = existingContactsResponse.body.results.map((existingContact) => {
      return {
        id: existingContact.id,
        properties: contacts.find(
          (updates) => updates.email === existingContact.properties.email
        ) as any,
      }
    })
    updates.push(hubSpotClient.crm.contacts.batchApi.update({ inputs: merged }))
  }

  // Create any new if needed
  if (existingContactsResponse.body.results.length < contacts.length) {
    // ones that were updated should not be created
    const excludeFromCreation = new Set(
      existingContactsResponse.body.results.map((contact) => contact.properties.email)
    )

    const needToBeCreatedContacts = contacts.filter(
      (contact) => !excludeFromCreation.has(contact.email)
    )

    updates.push(
      hubSpotClient.crm.contacts.batchApi.create({
        inputs: contactsToProperties(needToBeCreatedContacts),
      })
    )
  }

  const results = await Promise.all(updates)

  if (results.length === 2) {
    return [...results[0].body.results, ...results[1].body.results]
  } else {
    results[0].body.results
  }
}

function contactsToProperties(
  contacts: HubSpotContact[]
): Array<{ properties: { [key: string]: string } }> {
  return contacts.map((contact) => {
    return { properties: contact as any }
  })
}

async function createContactOrUpdate(hubSpotClient: hubspot.Client, contact: CRMInterface) {
  const preparedContact = convert(contact)
  const simplePublicObjectInput = { properties: preparedContact as any }
  try {
    const result = await hubSpotClient.crm.contacts.basicApi.create(simplePublicObjectInput)
    return result
  } catch (e) {
    const message = e.response.body?.message
    if (message?.includes("Contact already exists")) {
      const id = message.split("Existing ID: ")[1] as string
      return hubSpotClient.crm.contacts.basicApi.update(id, simplePublicObjectInput)
    } else throw e
  }
}

function HubSpotClient() {
  return new hubspot.Client({ apiKey: apiKey() })
}

function createCompany(hubSpotClient: hubspot.Client, company: HubSpotCompany) {
  return hubSpotClient.crm.companies.basicApi.create({ properties: company as any })
}

function linkContactToCompany(hubSpotClient: hubspot.Client, { companyId, contactId }) {
  return hubSpotClient.crm.companies.associationsApi.create(
    companyId,
    "contact",
    contactId,
    "company_to_contact"
  )
}

function addContactsToList(list: ListID, contactEmails: string[]) {
  return fetch(
    "https://api.hubapi.com/contacts/v1/lists/" + list + "/add" + "?hapikey=" + apiKey(),
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ emails: contactEmails }),
    }
  )
}
