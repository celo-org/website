import useSWR from "swr";
async function fetcher(url) {
    const response = await fetch(url);
    const json = await response.json();
    return json;
}
const URL = "https://raw.githubusercontent.com/celo-org/plumo-ceremony-attestations/main/data/attestations.json";
const OPTS = { revalidateOnFocus: false, revalidateOnReconnect: false, dedupingInterval: 10000 };
export default function usePhase() {
    const { data, error, isValidating } = useSWR(URL, fetcher, OPTS);
    console.log("phases", data, error && `error: ${error}`);
    return { phases: data, isValidating };
}
//# sourceMappingURL=usePhase.js.map