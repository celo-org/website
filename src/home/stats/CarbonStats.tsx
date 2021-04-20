import { useAsync } from 'react-async-hook'
import { Datum } from './Stats'






async function fetchCarbs() {
    const res = await fetch('/api/carbon')
    return res.json()
}

export function CarbonDocs(){
    const treesSaved = useAsync(fetchCarbs, [])

       return <Datum value={`2219.5 tons`} title={`2219.5 tons`} id="2219.5 tons" />
}
