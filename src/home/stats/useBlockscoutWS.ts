import {useRef, useEffect, useState} from "react"

const SECOND = 1000
const NEW_ADDRESSES = JSON.stringify(["2","2","addresses:new_address","phx_join",{}])

const HEARTBEAT  = [null,"3","phoenix","heartbeat",{}]

const INFO_INDEX = 4
const TYPE_INDEX = 3

type WsArray = [null,null,"addresses:new_address","count",{"count": string}]

export default function useBlockscoutWS() {
  const ws = useRef<WebSocket>(null);
  const rawTxData = useRef("")
  const [walletTransactions, setWalletTransactions] = useState("0")
  useEffect(() => {
    ws.current = new WebSocket("wss://explorer.celo.org/socket/websocket?locale=en&vsn=2.0.0")

    ws.current.onopen = function onOpen() {
      ws.current.send(NEW_ADDRESSES)
    }

    ws.current.onmessage = async function recieve(event) {
      if (rawTxData.current === event.data || event.data.indexOf("phx_reply") !== -1 ) {
        return
      }
      rawTxData.current = event.data
      const dataArray: WsArray = await JSON.parse(event.data)
      console.log(dataArray)
      if (dataArray[TYPE_INDEX] === "count") {
        setWalletTransactions(dataArray[INFO_INDEX].count)
      }
    }

    // send heartbeat every 30 seconds, increasing the integer by 1 each time
    setInterval(() => {
      const beat =  Number(HEARTBEAT[1])
      const upBeat = beat +1
      HEARTBEAT[1] = upBeat.toString()
      ws.current.send(JSON.stringify(HEARTBEAT))
    }, 30 * SECOND)

    ws.current.onclose = () => console.info("ws closed");

    return () => {
      ws.current.close();
    };
  }, [])

  return walletTransactions
}