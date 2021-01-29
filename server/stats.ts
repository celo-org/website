import { request, gql } from 'graphql-request'

// number of blocks
// avg block time.
// Number of wallet addresses,
// number of locked CELO
// total transactions

interface Stats {
  aveBlockSeconds: number
  blockCount: number
  addressesCount: number
  transactionsCount: number
  lockedCELO: number
}

export default  async function stats(): Promise<Stats> {
  const {blockCount, lockedCELO} = await fetchBlockscoutData()
  return {
    aveBlockSeconds: calcAverageBlockTime(blockCount, Date.now()),
    blockCount,
    lockedCELO: lockedCELO,
    addressesCount: 0,
    transactionsCount: 0,
  }
}
const WEI_PER_CELO = BigInt("1000000000000000000")

const CELO_GENESIS_TIME = "2020-04-22T16:00:05.000000Z"

// gives average block time given a block number and the value of Date.now or new Date().getTime()
export function calcAverageBlockTime(currentBlockNumber: number, currentTime: number): number {
  const genesis = new Date(CELO_GENESIS_TIME).getTime()
  const lifetime = (currentTime - genesis) /1000

  return lifetime / currentBlockNumber
}

export function hugeNumberToHuman(massiveValue: string) {
  return Number(BigInt(massiveValue) / WEI_PER_CELO)
}

interface Query  {
  latestBlock: number
  celoParameters: {
    lockedCELO: string // string representation of really big integer
  }
}

const blocscoutQuery = gql`
  {
    latestBlock,
    celoParameters {
      lockedCELO: totalLockedGold
    }
  }
`
async function fetchBlockscoutData () {
  const data = await request<Query>('https://explorer.celo.org/graphiql', blocscoutQuery)

  return {
    blockCount: data.latestBlock,
    lockedCELO: hugeNumberToHuman(data.celoParameters.lockedCELO)
  }
}


interface TheCeloAccountData {

}

async function fetchtheCeloData() {
  const response = await fetch("https://thecelo.com/api/v0.1?method=accounts")
  const data = await response.json() as TheCeloAccountData

}

