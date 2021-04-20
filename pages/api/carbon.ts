import { NextApiRequest, NextApiResponse } from 'next'
import {wrenApi} from 'server/wrenApi'

import respondError from 'server/respondError'
export default async function(req: NextApiRequest, res: NextApiResponse){

    try{
        if(req.method === 'GET'){
            const results = await wrenApi()
            res.json(results)
            console.log("results", results)
        }else{
            res.status(405)
        }
    }catch(e){
        respondError(res, e)
    }
}