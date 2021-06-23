import Cache from "node-cache"

export const MINUTE = 60
export const HOUR = MINUTE * 60

const LIVE_MODE = process.env.ENV === "production"

// when in dev or preview mode only go for 5 seconds
const STANDARD_TTL = LIVE_MODE ? HOUR * 24 : 5

const CACHE = new Cache({ stdTTL: STANDARD_TTL, checkperiod: 120 })

type Cachable = any
interface Cached {
  value: Cachable
  updatedAt: number
}

export async function fetchCached<T>(
  key: string,
  locale: string,
  maxStale: number,
  fetcher: () => Promise<T>
): Promise<T> {
  const localizedKey = `${locale}:${key}`
  return get<T>(localizedKey, fetcher, maxStale) || set<T>(localizedKey, fetcher)
}

function get<T>(key: string, fetcher: () => Promise<T>, maxStale: number) {
  const data = CACHE.get<Cached>(key)
  if (!data) {
    console.info("missed", key)
  } else if (shouldRevalidate(data, maxStale)) {
    console.info("revalidating", key)
    setTimeout(() => set(key, fetcher), 1)
  }
  return data?.value
}

function shouldRevalidate(data: Cachable, maxStale: number): boolean {
  if (!data.updatedAt) {
    return true
  }
  const currentTime = Date.now()
  // maxStale is in seconds but time is in miliseconds
  return currentTime - data.updatedAt > maxStale * 1000
}

const IN_TRANSIT: Record<string, Promise<Cachable>> = {}

// sets the result of promise fetcher in cache under key
// if currently waiting for a promise at key will not start another fetch
async function set<T extends Cachable>(key: string, fetcher: () => Promise<T>): Promise<T> {
  // return the already used promise
  if (IN_TRANSIT[key]) {
    return IN_TRANSIT[key] as Promise<T>
  } else {
    const unique = `fetch-${key}-${Math.random()}`
    // set the pending promise
    console.time(unique)
    IN_TRANSIT[key] = fetcher()
    const data = await IN_TRANSIT[key]
    console.timeEnd(unique)

    // dont save bad
    if (
      data === null ||
      data === undefined ||
      data.error ||
      data.type === "Error" ||
      data.sys?.type === "Error" ||
      (typeof data.status === "number" && data.status > 299)
    ) {
      console.info("bad-data-nocache", data)
      IN_TRANSIT[key] = null
      return data
    }

    const updatedAt = Date.now()
    const dataWithTimeStamp: Cached = { updatedAt, value: data }

    CACHE.set(key, dataWithTimeStamp)

    // wait a moment to delete
    setTimeout(() => {
      IN_TRANSIT[key] = null
    }, 100)

    return data as T
  }
}
