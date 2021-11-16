import { NextApiRequest, NextApiResponse } from "next"
import getAllies, { create } from "server/Alliance"
import respondError from "server/respondError"
const CREATED = 201

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      const allies = await getAllies()
      res.json(allies.filter((ally) => ally.records.length > 0))
    } else if (req.method === "POST") {
      await create(req.body)
      res.status(CREATED).json({ ok: true })
    } else {
      res.status(405).json({ error: `${req.method} does not exist here` })
    }
  } catch (e) {
    respondError(res, e)
  }
}
