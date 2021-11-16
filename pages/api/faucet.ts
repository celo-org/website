import { faucetOrInviteController } from "server/controllers"
import { NextApiRequest, NextApiResponse } from "next"
import byMethod from "server/byMethod"
import { RequestType } from "src/fauceting/FaucetInterfaces"

async function post(req: NextApiRequest, res: NextApiResponse) {
  faucetOrInviteController(req, res, RequestType.Faucet)
}

export default byMethod({ postHandler: post })
