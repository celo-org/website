import { request, gql } from "graphql-request"
import { cleanData } from "src/utils/validators"
import { fetchCached } from "src/../server/cache"

export enum BlockScout {
  baklava = "https://baklava-blockscout.celo-testnet.org/graphiql",
  mainnet = "https://explorer.celo.org/graphiql",
}

const query = gql`
  {
    latestBlock
    celoValidatorGroups {
      account {
        address
        lockedGold
        name
        usd
        claims(first: 10) {
          edges {
            node {
              address
              element
              type
              verified
            }
          }
        }
      }
      affiliates(first: 20) {
        edges {
          node {
            account {
              claims(first: 10) {
                edges {
                  node {
                    address
                    element
                    type
                    verified
                  }
                }
              }
            }
            address
            lastElected
            lastOnline
            lockedGold
            name
            score
            usd
            attestationsFulfilled
            attestationsRequested
          }
        }
      }
      accumulatedRewards
      accumulatedActive
      commission
      votes
      receivableVotes
      numMembers
      rewardsRatio
    }
  }
`

async function validators(network: BlockScout) {
  const response = await request(network, query)
  return cleanData(response)
}

export default function cachedValidators(network: BlockScout) {
  const revalidateSeconds = 45
  return fetchCached(`validators-list`, network, revalidateSeconds, () => validators(network))
}
