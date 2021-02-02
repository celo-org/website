import NodeCache from 'node-cache'

const MINUTE = 60

const TTL = MINUTE * 5

const myCache = new NodeCache({ stdTTL: TTL, checkperiod: 120 })

interface Options  { minutes?: number; seconds?: number, args?: any }

export async function cache<T>(
  key: string,
  func: (param?: any) => Promise<T>,
  options?:Options
): Promise<T> {
  const cachedResult = myCache.get<T>(key)
  if (cachedResult) {
    return cachedResult
  } else {
    const freshResult = options ? await func(options.args) : await func()
    myCache.set(key, freshResult, getTTL(options))
    return freshResult as T
  }
}

function getTTL(options?: Options) {
  if (options?.minutes) {
    options.minutes * MINUTE
  } else if (options?.seconds) {
    return options.seconds
  } else {
    return TTL
  }
}

export default cache
