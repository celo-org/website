import useSWR from "swr"

async function fetcher(url) {
  const response = await fetch(url)
  return response.json()
}

const URL = "https://raw.githubusercontent.com/celo-org/plumo-ceremony-attestations/19124b15e5f89753f70b60bcb3694bf2f4eaed89/phases.json"

export default function usePhase() {
  const {data, isValidating, } = useSWR<Phases>(URL, fetcher)
  console.info(data)
  return {phases: data, isValidating}
}

type Address = string

type Round = Record<Address, {
  "github": null | string,
  "name": string,
  "keybase": null | string,
  "twitter": null | string,
  "affiliation": string,
  "gist": null| string
}>

interface Phases {
  "phase1": Array<Round>
  "phase2"?: Array<Round>
}