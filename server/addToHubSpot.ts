import * as hubspot from '@hubspot/api-client'
import getConfig from "next/config"

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
    Alliance = "76"
}

function convert(formContact: CRMInterface) {
    const [firstName, ...restNames] = formContact.fullName.split(" ")
    const lastName = restNames.join(" ")
    const properties = {
        "email": formContact.email,
        "firstname":firstName,
        "lastname":lastName,
      }
    return properties
  }

  function apiKey() {
    const { serverRuntimeConfig } = getConfig()
    return serverRuntimeConfig.HUBSPOT_API_KEY
  }
  
export default async function addToHubspot({email, fullName}, list: ListID): Promise<PreparedContact | CreationError> {
    const hubspotClient = new hubspot.Client({"apiKey":apiKey()})
    const preparedContact = convert({ email, fullName })
    const simplePublicObjectInput = { properties: preparedContact }
      try {
        Promise.all([await hubspotClient.crm.contacts.basicApi.create(simplePublicObjectInput),
        ]), await fetch("https://api.hubapi.com/contacts/v1/lists/" + list + "/add" + "?hapikey=" + apiKey(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:  JSON.stringify({emails: [email]})
        })
        return preparedContact
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
}
