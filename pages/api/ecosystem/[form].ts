import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "server/byMethod"
import respondError from "server/respondError"
import { Tables } from "src/../fullstack/EcoFundFields"
import ecoFundSubmission from "src/../server/EcoFundApp"

const CREATED = 201

async function post(req: NextApiRequest, res: NextApiResponse) {
  try {
    await ecoFundSubmission(req.body, req.query.form as Tables)
    res.status(CREATED).json({ ok: true })
  } catch (e) {
    respondError(res, e)
  }
}

export default byMethod({ postHandler: post })