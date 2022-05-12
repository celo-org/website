import addToCRM, { ListID } from "./addToCRM"

export async function create(data) {
  return addToCRM({ email: data.email, fullName: data.name }, ListID.Enterprise, {
    name: data.orgName,
    description: data.reason,
  })
}
