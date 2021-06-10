import React from "react"
import useSWR from "swr"

async function fetcher(url: string) {
  const response = await fetch(url)
  return response.json()
}

interface Response {
  result: RawData
  status: string
}
// TODO get url for round
const URL = "https://plumo-setup-phase-2.azurefd.net/ceremony"

export default function useCurrentRound() {
  const { data } = useSWR<Response>(URL, fetcher)
  const status = data?.status
  const result = data?.result
  return React.useMemo(() => processData(status, result), [status, result])
}

interface Contribution {
  metadata: Record<string, string>
  contributorId: string | null
  contributedLocation: string
  verified: boolean
  verifiedData: {
    data: any
    signature: string
  }
  verifiedLocation: string
  verifierid: string
}

interface Chunk {
  chunkId: string
  lockHolder: null
  contributions: Contribution[]
}

interface Attestation {
  id: string
  signature: string
  address: string
}

interface RawData {
  attestations: Attestation[]

  chunks: Chunk[]
  contributorIds: string[]
  maxLocks: number
  parameters: {
    provingSystem: "groth16"
    curvKind: "bw6"
    chunkSize: number
    batchSize: number
    power: number
  }
  round: number
  shutdownSignal: boolean
  verifierIds: string[]
  version: number
}

interface ProcessedData {
  loading: boolean
  round: number
  chunkCount: number
  participantIds: string[]
  progressCompleted: Record<string, number>
  progress: Record<string, number>
}

function processData(status: string, result?: RawData): ProcessedData {
  const processeed: ProcessedData = {
    loading: true,
    round: 0,
    chunkCount: 0,
    participantIds: [],
    progressCompleted: {},
    progress: {},
  }
  if (status !== "ok") {
    return processeed
  }

  processeed.round = result.round
  processeed.chunkCount = result.chunks.length
  processeed.participantIds = result.contributorIds
  processeed.participantIds.forEach((participantId) => {
    processeed.progress[participantId] = result.chunks.reduce((accumulator, currentValue) => {
      return (
        accumulator +
        currentValue.contributions.reduce((accumulator, currentValue) => {
          if (currentValue.contributorId == participantId && currentValue.verified) {
            return accumulator + 1
          } else {
            return accumulator + 0
          }
        }, 0)
      )
    }, 0)
    processeed.progressCompleted[participantId] = result.chunks.reduce(
      (accumulator, currentValue) => {
        return (
          accumulator +
          currentValue.contributions.reduce((accumulator, currentValue) => {
            if (currentValue.contributorId == participantId) {
              return accumulator + 1
            } else {
              return accumulator + 0
            }
          }, 0)
        )
      },
      0
    )
  })

  processeed.loading = false

  return processeed
}
