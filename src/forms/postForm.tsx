import { FormState } from "./Form"

export function postForm(route: string, formData: FormState) {
  debugger
  return fetch(route, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
}
