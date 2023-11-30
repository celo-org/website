import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "server/byMethod"
import respondError from "server/respondError"
import { Tables } from "src/../fullstack/EcoFundFields"
import ecoFundSubmission from "src/../server/EcoFundApp"

const CREATED = 201

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.body.mielpoto) {
      await ecoFundSubmission(req.body, req.query.form as Tables)
      res.status(CREATED).json({ ok: true })
    } else {
      console.info("suspected bot", req.body)
      res.status(CREATED).json({ ok: true })
    }
  } catch (e) {
    console.error(e)
    respondError(res, e)
  }
}

export default byMethod({ postHandler: post })
