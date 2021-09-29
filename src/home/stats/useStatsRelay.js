import { useRef, useEffect, useReducer } from "react";
var StatKeys;
(function (StatKeys) {
    StatKeys["avgBlockTime"] = "avgBlockTime";
    StatKeys["blockCount"] = "blockCount";
    StatKeys["totalTx"] = "totalTx";
    StatKeys["addressCount"] = "addressCount";
})(StatKeys || (StatKeys = {}));
export default function useStatsRelay() {
    const ws = useRef(null);
    const initialState = {
        addressCount: 0,
    };
    const [stats, dispatch] = useReducer((state, action) => {
        switch (action.action) {
            case "init":
                const addressCount = toNumber(action.value.addressCount);
                return { ...action.value, addressCount };
            case StatKeys.avgBlockTime:
                return { ...state, avgBlockTime: action.value };
            case StatKeys.totalTx:
                return { ...state, totalTx: action.value };
            default:
                return state;
        }
    }, initialState);
    useEffect(() => {
        const queues = {
            [StatKeys.addressCount]: [],
            [StatKeys.avgBlockTime]: [],
            [StatKeys.blockCount]: [],
            [StatKeys.totalTx]: [],
        };
        function relayURI() {
            const host = "web-stats-relay-dot-celo-org-website.uc.r.appspot.com";
            const protocol = window.location.protocol === "https:" ? "wss" : "ws";
            return `${protocol}://${host}/stats`;
        }
        ws.current = new WebSocket(relayURI());
        ws.current.onopen = () => {
            ws.current.send("saluton");
        };
        ws.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.action === "init") {
                requestAnimationFrame(() => dispatch(data));
            }
            else {
                queues[data.action].push(data);
            }
        };
        const interval = setInterval(() => {
            Object.keys(StatKeys).forEach((key) => {
                const update = queues[key].shift();
                if (update) {
                    dispatch(update);
                }
            });
        }, 250);
        ws.current.onclose = (data) => console.info("ws closed", data);
        return () => {
            clearInterval(interval);
            ws.current.close();
        };
    }, []);
    return stats;
}
function toNumber(stringValue) {
    if (typeof stringValue === "number") {
        return stringValue;
    }
    if (!stringValue) {
        return 0;
    }
    return Number(stringValue.replace(/,/g, ""));
}
//# sourceMappingURL=useStatsRelay.js.map