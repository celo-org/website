import WebSocket from "ws"
import Sentry from "./sentry"
import NodeCache from 'node-cache'
import {StatKeys, StatsTransport, StatsState, InitialResponse} from "../fullstack/statsTransport"
const statsCache = new NodeCache({ stdTTL: 0, checkperiod: 720 })


function storeValue(key: StatKeys  ,value: number | string) {
  return statsCache.set(key, value)
}

function getValue<t>(key: StatKeys) {
  return statsCache.get<t>(key)
}
const SECOND = 1000
const HEARTBEAT  = [null,"5","phoenix","heartbeat",{}]


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
    const dataArray: ReturnValues = await JSON.parse(event as string)
    process(dataArray[TYPE_INDEX] as EventTypes, dataArray[INFO_INDEX])
  })

  wsc.onclose =() => {
    console.warn("Connection to blockscout lost")
  }
   // send heartbeat every 30 seconds, increasing the integer by 1 each time
   setInterval(() => {
    const beat =  Number(HEARTBEAT[1])
    const upBeat = beat +1
    HEARTBEAT[1] = upBeat.toString()
    wsc.send(JSON.stringify(HEARTBEAT))
  }, 30 * SECOND)
}


function process(action: EventTypes, data: NewTransaction | NewBlock | NewAddress ) {
  switch (action) {
    case EventTypes.NEW_ADDRESS:
      const address = data as NewAddress
      updateStat(StatKeys.addressCount, address.count)
      return
    case EventTypes.NEW_BLOCK:
      const block =  (data as NewBlock)
      const averageTime = formatBlockTime(block.average_block_time)
      updateStat(StatKeys.blockCount, block.block_number)
      updateStat(StatKeys.avgBlockTime, averageTime)
      return
    case EventTypes.NEW_TRANSACTION:
      incrementStat(StatKeys.totalTx, 1)
      return
    default:
      console.warn("unknown", action, data)
  }
}

function formatBlockTime(raw: string): string {
  if (raw) {
    return raw.split(" ")[0]
  } else {
    return "5"
  }
}


// GIVERS


function incrementStat(key: StatKeys.totalTx, by:number) {
    const last =  getValue<number>(key) || 0
    const current = last + by
    return storeValue(key, current)
}

function updateStat(key: StatKeys, recent: number | string) {
  try {
    const previous = getValue(key)
    if (previous === recent ) {
      return
    } else {
      return storeValue(key, recent)
    }
  } catch (e) {
    console.warn("Failed to update stat", e)
  }
}


function currentState(): StatsState {
  const {avgBlockTime, blockCount, totalTx, addressCount} = statsCache.mget<number|string>(Object.values(StatKeys))
  return {
    avgBlockTime: avgBlockTime as string,
    blockCount: blockCount as number,
    totalTx: totalTx as number,
    addressCount: addressCount as string
  }
}

export default function PlatformStats(wss: WebSocket) {
  obtainStats()

  wss.on('message', (msg) => {
    if (msg === "saluton") {
      const inital: InitialResponse = {
        action: 'init',
        value: currentState()
      }
      wss.send(JSON.stringify(inital))
      return
    }
      wss.send("say hello");
    });

    // when values changes send to browser
  statsCache.on("set", (key: StatKeys, value ) => {
    console.info(key, value)
    const transit: StatsTransport = {action: key, value}
    wss.send(JSON.stringify(transit))
  })

  wss.on("error", () => {
    Sentry.captureMessage("platform stats relay ran into an issue")
  })

  wss.onclose = () => {
    console.warn("websockets relay closed")
  }
}

