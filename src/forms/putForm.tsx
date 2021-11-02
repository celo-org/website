import hashAnything from "hash-anything"

import { Field, Context, FormIDs } from "src/../server/Hubspot"

export function putForm(formID: FormIDs, formFields: Field[]) {
  const checkSum = hashAnything.sha1(formFields)

  const context: Context = {
    pageTitle: window.document.title,
    pageURL: window.location.href,
  }

  return fetch(`/api/forms/${formID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ fields: formFields, context, checkSum }),
  })
}
