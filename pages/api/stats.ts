import { NextApiRequest, NextApiResponse } from 'next'
import byMethod from '../../server/byMethod'
import getStats from '../../server/stats'

async function get(_: NextApiRequest, res: NextApiResponse) {
  try {
    const stats = await getStats()
    res.json(stats)
  } catch {
    res.status(500).json([])
  }
}

export default byMethod({ getHandler: get })
