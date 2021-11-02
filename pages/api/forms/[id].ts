import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "server/byMethod"

interface Context {
  pageTitle: string
  pageURL: string
}

interface Field {
  value: string
  name: string
}

const HONEY_FIELD = "accountNumber"

async function put(req: NextApiRequest, res: NextApiResponse) {
  const formID = req.query.id as string
  const fields = req.body.fields as Field[]
  const context = req.body.context as Context

  if (validate(formID, fields, context)) {
    submitForm()
  } else {
    res.json({ bad: true })
  }
}

function validate(formID: string, fields: Field[], context: Context) {
  // TODO check formID length in hubspot and make this match it
  if (!formID || formID.length > 10) {
    return false
  } else {
    return !fields.find((field) => field.name === HONEY_FIELD && field.value.length > 0)
  }
}

export default byMethod({ putHandler: put })
