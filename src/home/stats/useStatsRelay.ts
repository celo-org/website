import {useRef, useEffect, useReducer} from "react"

interface StatsState {
  avgBlockTime: string
  blockCount: number
  totalTx: number
  addressCount: number
}

enum StatKeys {
  "avgBlockTime"= "avgBlockTime",
  "blockCount" = "blockCount",
  "totalTx"= "totalTx",
  "addressCount" = "addressCount"
}

interface StatsTransport {
  action: StatKeys
  value: string | number
}

interface InitialResponse {
  action: "init"
  value: StatsState
}

type State = Partial<StatsState>

type Action = InitialResponse | StatsTransport

export default function useStatsRelay() {
  const ws = useRef<WebSocket>(null);
  const initialState:State = {
    addressCount: 0
  }

  const [stats, dispatch] = useReducer((state:State, action: Action) => {
    switch (action.action)  {
      case "init":
        return action.value
      case StatKeys.addressCount:
        const addressAsNumber =  Number((action.value as string).replace(/,/g, ""))
        if (addressAsNumber > state.addressCount) {
          return {...state, addressCount:addressAsNumber }
        }
      case StatKeys.avgBlockTime:
        return {...state, avgBlockTime: action.value}
      case StatKeys.blockCount:
        return {...state, blockCount: action.value}
      case StatKeys.totalTx:
        return {...state, totalTx: action.value}
      default:
      console.warn("Bug", action)
      return state
    }
  }, initialState)

  useEffect(() => {
    const queues: Record<StatKeys, StatsTransport[]> = {
      [StatKeys.addressCount]:[],
      [StatKeys.avgBlockTime]:[],
      [StatKeys.blockCount]:[],
      [StatKeys.totalTx]:[]
    }

    function relayURI() {

      const host = (window.location.hostname === "localhost") ?  "0.0.0.0:8001" : "web-stats-relay-dot-celo-testnet.wl.r.appspot.com"
      const protocol = window.location.protocol === "https:" ? "wss" : "ws"
      return `${protocol}://${host}/stats`
    }

    ws.current = new WebSocket(relayURI())

    ws.current.onopen = () => {
      ws.current.send("saluton")
    }

    ws.current.onmessage = (event) => {
      const data: Action = JSON.parse(event.data)
       if (data.action === "init") {
         requestAnimationFrame(() => dispatch(data))
       } else {
         queues[data.action].push(data)
       }
    }

    // spread out the updates as they tend to come in chunks and then nothing at all.
    const interval = setInterval(() => {
        Object.keys(StatKeys).forEach((key: StatKeys) => {
          const update = queues[key].shift()
          if (update) {
            dispatch(update)
          }
        })

      }, 350)


    ws.current.onclose = (data) => console.info("ws closed", data);

    return () => {
      clearInterval(interval)
      ws.current.close();
    };
  }, [])

  return stats
}