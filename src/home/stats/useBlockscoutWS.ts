import {useRef, useEffect, useReducer} from "react"

const SECOND = 1000
const NEW_ADDRESSES = JSON.stringify(["2","2","addresses:new_address","phx_join",{}])
const NEW_BLOCK = JSON.stringify(["3","3","blocks:new_block","phx_join",{}])
const NEW_TRANSACTION =  JSON.stringify(["4","4","transactions:new_transaction","phx_join",{}])

const HEARTBEAT  = [null,"5","phoenix","heartbeat",{}]

const INFO_INDEX = 4
const TYPE_INDEX = 2
type AddressArray = [null,null,"addresses:new_address","count",{"count": string}]
type TransactionArray = [null,null,"transactions:new_transaction","transaction",{"transaction_html": string, transaction_hash: string}]

type BlockArray = [null,null,"blocks:new_block","new_block",
  {
    average_block_time: string,
    block_html: string
    block_miner_hash: string
    block_number: number
    chain_block_html: string
  }
]
type ReturnValues = TransactionArray | BlockArray |AddressArray

interface State {
  walletAddresses: number,
  blockCount: number,
  average: number,
  txCount: number
}

const initialState: State = {
  walletAddresses: 0,
  blockCount: 0,
  average: 5,
  txCount: 0
}

export default function useBlockscoutWS(): State {
  const ws = useRef<WebSocket>(null);
  const rawTxData = useRef("")

  const [state, dispatch] =  useReducer(reduce, initialState)

  function reduce(lastState: State, dataArray: ReturnValues) {
    switch (dataArray[TYPE_INDEX]) {
      case "addresses:new_address":
        const addressData = dataArray as AddressArray
        return {...lastState, walletAddresses: addressData[INFO_INDEX].count}
      case  "blocks:new_block":
        const blockData = dataArray as BlockArray
        const average = blockData[INFO_INDEX].average_block_time.split(" ")[0]
        return  {...lastState, blockCount: blockData[INFO_INDEX].block_number, average}
      case  "transactions:new_transaction":
        const txData = dataArray as TransactionArray
        console.info(txData[INFO_INDEX].transaction_hash)
        return {...lastState, txCount: lastState.txCount +1 }
      default:
        console.info("doesnt fit", dataArray)
        return lastState
    }
  }

  useEffect(() => {
    ws.current = new WebSocket("wss://explorer.celo.org/socket/websocket?locale=en&vsn=2.0.0")

    ws.current.onopen = function onOpen() {
      ws.current.send(NEW_ADDRESSES)
      ws.current.send(NEW_BLOCK)
      ws.current.send(NEW_TRANSACTION)
    }

    ws.current.onmessage = async function recieve(event) {
      if (rawTxData.current === event.data || event.data.indexOf("phx_reply") !== -1 ) {
        return
      }
      rawTxData.current = event.data
      const dataArray: ReturnValues = await JSON.parse(event.data)
      dispatch(dataArray)
    }

    // send heartbeat every 30 seconds, increasing the integer by 1 each time
    setInterval(() => {
      const beat =  Number(HEARTBEAT[1])
      const upBeat = beat +1
      HEARTBEAT[1] = upBeat.toString()
      ws.current.send(JSON.stringify(HEARTBEAT))
    }, 30 * SECOND)

    ws.current.onclose = (data) => console.info("ws closed", data);

    return () => {
      ws.current.close();
    };
  }, [])

  return state
}


