import { request, gql } from 'graphql-request'
import cache from "server/cache"
interface Stats {
  avgBlockSeconds: number
  blockCount: number
}

export default  async function stats(): Promise<Stats> {
  const {blockCount} =  await cache("stats/latest-block", fetchBlockscoutData, {seconds: 1})
  return {
    avgBlockSeconds: Math.round(calcAverageBlockTime(blockCount, Date.now())),
    blockCount,
  }
}

const CELO_GENESIS_TIME = "2020-04-22T16:00:05.000000Z"

// gives average block time given a block number and the value of Date.now or new Date().getTime()
export function calcAverageBlockTime(currentBlockNumber: number, currentTime: number): number {
  const genesis = new Date(CELO_GENESIS_TIME).getTime()
  const lifetime = (currentTime - genesis) / 1000

  return lifetime / currentBlockNumber
}

interface Query  {
  latestBlock: number
  celoParameters: {
    lockedCELO: string // string representation of really big integer
  }
}

const blocscoutQuery = gql`
  {
    latestBlock
  }
`

async function fetchBlockscoutData() {
  const data = await request<Query>('https://explorer.celo.org/graphiql', blocscoutQuery)
  return {
    blockCount: data.latestBlock,
  }
}