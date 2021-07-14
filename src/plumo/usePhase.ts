import useSWR from "swr"

async function fetcher(url) {
  const response = await fetch(url)
  const json = await response.json()
  return json
}

const URL =
  "https://raw.githubusercontent.com/celo-org/plumo-ceremony-attestations/main/data/attestations.json"

const OPTS = { revalidateOnFocus: false, revalidateOnReconnect: false, dedupingInterval: 10000 }

export default function usePhase() {
  const { data, error, isValidating } = useSWR<Phases>(URL, fetcher, OPTS)
  console.log("phases", data, error && `error: ${error}`)
  return { phases: data, isValidating }
}

type Address = string

type Round = Record<
  Address,
  {
    github: null | string
    name: string
    keybase: null | string
    twitter: null | string
    affiliation: string
    gist: null | string
  }
>

interface Phases {
  phase1: Array<Round>
  phase2?: Array<Round>
}
