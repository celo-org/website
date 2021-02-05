import { NextApiRequest, NextApiResponse } from 'next'
import WebSocket from "ws"

export default  async function get(_: NextApiRequest, res: NextApiResponse) {
  const wss = new WebSocket.Server({noServer: true})
  wss.on('connection', function connection(ws) {
    ws.on('message', function incoming(message) {
      console.log('received: %s', message);
    });
    ws.send('something');
  });

  // res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

