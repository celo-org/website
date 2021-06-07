import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "../../server/byMethod"
import { create } from "src/../server/PublicSector"

async function submit(req: NextApiRequest, res: NextApiResponse) {
  await create(req.body)
  res.json({ ok: true })
}

export default byMethod({ postHandler: submit })
