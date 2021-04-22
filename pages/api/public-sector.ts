import { NextApiRequest, NextApiResponse } from 'next'
import byMethod from '../../server/byMethod'

async function submit(req: NextApiRequest, res: NextApiResponse) {
  req.body
  console.info(req.body)
  res.json({ok: true})
}

export default byMethod({ postHandler: submit })
