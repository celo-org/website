import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "../../server/byMethod"
import fetchCico from "../../server/fetchCico"

async function get(_: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await fetchCico()
    res.json(data)
    console.log(res.json(data), "this is res")
  } catch {
    res.status(500).json([])
  }
}

export default byMethod({ getHandler: get })
