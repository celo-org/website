import {useRef, useEffect, useReducer} from "react"
import { InitialResponse, StatKeys, StatsState, StatsTransport } from "../../../fullstack/statsTransport"

const HOST = "ws://localhost:3000"

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
    function relayURI() {
      const protocol = window.location.protocol === "https" ? "wss" : "ws"
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
      dispatch(data)
    }

    ws.current.onclose = (data) => console.info("ws closed", data);

    return () => {
      ws.current.close();
    };
  }, [])

  return stats
}