import {useRef, useEffect, useReducer} from "react"
import { InitialResponse, StatKeys, StatsState, StatsTransport } from "../../../fullstack/statsTransport"

type State = Partial<StatsState>

type Action = InitialResponse | StatsTransport

export default function useStatsRelay() {
  const ws = useRef<WebSocket>(null);
  const initialState:State = {}

  const [stats, dispatch] = useReducer((state:State, action: Action) => {
    switch (action.action)  {
      case "init":
        return action.value
      case StatKeys.addressCount:
        return {...state, addressCount: action.value}
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
    const queue = []
    function relayURI() {
      const protocol = window.location.protocol === "https:" ? "wss" : "ws"
      const host = window.location.host
      return `${protocol}://${host}/api/stats`
    }

    ws.current = new WebSocket(relayURI())

    ws.current.onopen = () => {
      ws.current.send("saluton")
    }

    ws.current.onmessage = (event) => {
      console.info(event)
      const data: Action = JSON.parse(event.data)
       if (data.action === "init") {
         requestAnimationFrame(() => dispatch(data))
       } else {
         queue.push(data)
       }
    }

    // spread out the updates as they tend to come in chunks and then nothing at all.
    const interval = setInterval(() => {
      const update = queue.shift()
      if (update) {
        dispatch(update)
      }
    }, 200)

    ws.current.onclose = (data) => console.info("ws closed", data);

    return () => {
      clearInterval(interval)
      ws.current.close();
    };
  }, [])

  return stats
}