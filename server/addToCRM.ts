import * as hubspot from "@hubspot/api-client"
import getConfig from "next/config"
import { Field, Context, PORTAL_ID } from "./Hubspot"

interface CRMInterface {
  email: string
  fullName: string
}

interface PreparedContact {
  email: string
  firstname: string
  lastname: string
}
interface CreationError {
  error: string
}

export enum ListID {
  Newsletter = "70",
  Alliance = "76",
}

function convert(formContact: CRMInterface) {
  const [firstName, ...restNames] = formContact.fullName.split(" ")
  const lastName = restNames.join(" ")
  const properties = {
    email: formContact.email,
    firstname: firstName,
    lastname: lastName,
  }
  return properties
}

function apiKey() {
  const { serverRuntimeConfig } = getConfig()
  return serverRuntimeConfig.HUBSPOT_API_KEY
}

export default async function addToCRM(
  { email, fullName },
  list: ListID
): Promise<PreparedContact | CreationError> {
  const hubspotClient = new hubspot.Client({ apiKey: apiKey() })
  const preparedContact = convert({ email, fullName })
  const simplePublicObjectInput = { properties: preparedContact }
  try {
    Promise.all([await hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInput)]),
      await fetch(
        "https://api.hubapi.com/contacts/v1/lists/" + list + "/add" + "?hapikey=" + apiKey(),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ emails: [email] }),
        }
      )
    return preparedContact
  } catch (e) {
    e.message === "HTTP request failed"
      ? console.error(JSON.stringify(e.response, null, 2))
      : console.error(e)
  }
}

export async function submitForm(formID: string, fields: Field[], context?: Context) {
  // const properties = await fetch(`https://api.hubapi.com/properties/v1/contacts/properties?hapikey=${apiKey()}`)

  // console.info("PROPERTIES", await properties.json())

  const form = await fetch(
    `https://api.hubapi.com/marketing/v3/forms/${formID}/?hapikey=${apiKey()}`,
    {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )

  console.info(form)

  const formInfo = await form.json()
  console.info(formInfo)
  console.info(
    formInfo.formFieldGroups.map((group) => group.fields.map((field) => JSON.stringify(field)))
  )

  const data = {
    fields,
  }
  console.info(data, context)
  const response = await fetch(
    `https://api.hsforms.com/submissions/v3/integration/secure/submit/${PORTAL_ID}/${formID}?hapikey=${apiKey()}`,
    {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )

  console.info(response)
  const json = await response.json()
  console.info(json)
  return json
}
