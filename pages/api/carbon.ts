import { NextApiRequest, NextApiResponse } from 'next'
import respondError from 'server/respondError'
export default async function(req: NextApiRequest, res: NextApiResponse){
    try{
        if(req.method === 'GET'){
            res.json({"carbon": 2000})
        }else{
            res.status(405)
        }
    }catch(e){
        respondError(res, e)
    }
}