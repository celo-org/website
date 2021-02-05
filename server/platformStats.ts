import WebSocket from "ws"
import Sentry from "./sentry"
import NodeCache from 'node-cache'
const statsCache = new NodeCache({ stdTTL: 0, checkperiod: 720 })

// GETTERS
const INFO_INDEX = 4
const TYPE_INDEX = 2
enum EventTypes {
  "NEW_ADDRESS" = "addresses:new_address",
  "NEW_BLOCK" = "blocks:new_block",
  "NEW_TRANSACTION" = "transactions:new_transaction"
}

interface NewAddress {
  "count": string
}

interface NewTransaction {"transaction_html": string, transaction_hash: string}

interface NewBlock  {
  average_block_time: string,
  block_html: string
  block_miner_hash: string
  block_number: number
  chain_block_html: string
}

type AddressArray = [null,null,EventTypes.NEW_ADDRESS,string,NewAddress]
type TransactionArray = [null,null,EventTypes.NEW_TRANSACTION,string,NewTransaction]
type BlockArray = [null,null,EventTypes.NEW_BLOCK,"new_block",NewBlock]
type ReturnValues = TransactionArray | BlockArray | AddressArray

function obtainStats() {
  const NEW_ADDRESSES = JSON.stringify(["2","2","addresses:new_address","phx_join",{}])
  const NEW_BLOCK = JSON.stringify(["3","3","blocks:new_block","phx_join",{}])
  const NEW_TRANSACTION =  JSON.stringify(["4","4","transactions:new_transaction","phx_join",{}])
  const wsc = new WebSocket("wss://explorer.celo.org/socket/websocket?locale=en&vsn=2.0.0")

  wsc.onopen = () => {
    wsc.send(NEW_ADDRESSES)
    wsc.send(NEW_BLOCK)
    wsc.send(NEW_TRANSACTION)
  }
  wsc.on("message", async (event) => {
    console.log(typeof event, event)
    const dataArray: ReturnValues = await JSON.parse(event as string)
    process(dataArray[TYPE_INDEX] as EventTypes, dataArray[INFO_INDEX])
    // parse format and store in cache + emit
  })

  wsc.onclose =() => {
    console.warn("Connection to blockscout lost")
  }
}

interface StatsState {
  avgBlockTime: string
  blockCount: number
  totalTransactions: number
  addressess: number
}

function process(action: EventTypes, data: NewTransaction | NewBlock | NewAddress ) {
  switch (action) {
    case EventTypes.NEW_ADDRESS:
      const address = data as NewAddress
      address.count
    case EventTypes.NEW_BLOCK:
     const block =  (data as NewBlock)
      block.block_number
      block.average_block_time
    case EventTypes.NEW_TRANSACTION:
      (data as NewTransaction).transaction_hash
    default:
      console.log(data)
  }
}



// GIVERS

enum StatKeys {
  "avgBlockTime"= "avgBlockTime",
  "blockCount" = "blockCount",
  "totalTx"= "totalTx",
  "addressCount" = "addressCount"
}

const initialState = {test: "ok", number: 1}

function currentState(): StatsState {
  const {avgBlockTime} = statsCache.mget<any>(Object.values(StatKeys))
  return {
    avgBlockTime
  }
}

export default function PlatformStats(wss: WebSocket) {

  wss.on('message', (msg) => {
    if (msg === "saluton") {
      wss.send(JSON.stringify(initialState))
    }
    console.log(currentState())
    wss.send(msg);
  });

  wss.on("error", () => {
    Sentry.captureMessage("platform stats stream ran into an issue")
  })
}


obtainStats()