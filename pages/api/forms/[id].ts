import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "server/byMethod"
import hashAnything from "hash-anything"
import { submitForm } from "server/addToCRM"
import { Field, Context } from "server/Hubspot"

const HONEY_FIELD = "accountNumber"

async function put(req: NextApiRequest, res: NextApiResponse) {
  const formID = req.query.id as string
  const fields = req.body.fields as Field[]
  const context = req.body.context as Context
  const checksum = req.body.checksum
  if (validate(formID, fields, checksum)) {
    await submitForm(formID, fields, context)
    res.json({ ok: true })
  } else {
    res.json({ bad: true })
  }
}

function validate(formID: string, fields: Field[], checksum: string) {
  // TODO check formID length in hubspot and make this match it
  // TODO validate checksum
  if (!formID || formID.length !== 36) {
    return false
  } else if (checksum !== hashAnything.sha1(fields)) {
    return false
  } else {
    return !fields.find((field) => field.name === HONEY_FIELD && field.value.length > 0)
  }
}

export default byMethod({ putHandler: put })
