import useSWR from "swr"

async function fetcher() {
  const response = await fetch("/api/stats")
  return response.json()
}

interface Stats {
  avgBlockSeconds: number
  blockCount: number
}

export default function Blocks() {
  const { data, error } = useSWR<Stats>("/api/stats", fetcher, {
    refreshInterval: 5000,
  })
  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>
  return (
    <div>
      <span>{data.avgBlockSeconds} seconds</span>
      <br />
      <span>{data.blockCount} total blocks</span>
    </div>
  )
}
