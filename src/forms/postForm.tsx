import { FormState } from "./Form"
import hashAnything from "hash-anything"

export function postForm(route: string, formData: FormState) {
  const checkSum = hashAnything.sha1(formData)
  window.document.title
  window.location.href
  return fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...formData, checkSum }),
  })
}
