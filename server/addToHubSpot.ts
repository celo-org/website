import * as hubspot from '@hubspot/api-client'
import getConfig from "next/config"

function convert(formContact) {
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
  
export default async function addToHubspot({email, fullName}, list: string): Promise<any> {
    const hubspotClient = new hubspot.Client({"apiKey":apiKey()})
    const preparedContact = convert({ email, fullName })
    const SimplePublicObjectInput = { properties: preparedContact }
      try {
        Promise.all([await hubspotClient.crm.contacts.basicApi.create(SimplePublicObjectInput),
        await fetch("https://api.hubapi.com/contacts/v1/lists/" + list + "/add?hapikey=" + apiKey(), {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:  JSON.stringify({emails: [email]})

        })])
      } catch (e) {
        e.message === 'HTTP request failed'
          ? console.error(JSON.stringify(e.response, null, 2))
          : console.error(e)
      }
}
