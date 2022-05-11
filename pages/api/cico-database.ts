import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "../../server/byMethod"
import addToCRM, { ListID } from "../../server/addToCRM"

async function submit(req: NextApiRequest, res: NextApiResponse) {
  if (!req.body.mielpoto) {
    const data = req.body
    await addToCRM({ email: data.email, fullName: data.name }, ListID.ConnectTheWorld, {
      name: data.orgName,
      description: data.reason,
    })
    res.json({ ok: true })
  } else {
    console.info("suspected bot", req.body)
    res.json({ ok: true })
  }
}

export default byMethod({ postHandler: submit })
