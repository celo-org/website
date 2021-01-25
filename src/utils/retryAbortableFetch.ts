import abortableFetch from './abortableFetch'

export default async function retryAbortableFetch(url: string, options: RequestInit = {}, retry = 3, delay = 2000) {
  try {
    const r = await abortableFetch(url, options)
    return r
  } catch (e) {
    if (!retry) {
      throw e
    } 
    --retry
    await new Promise(_ => setTimeout(_, delay))
    return retryAbortableFetch(url, options, retry, delay)
  }
}
