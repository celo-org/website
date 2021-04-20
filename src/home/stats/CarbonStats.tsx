import { useAsync } from 'react-async-hook'
import {memo} from 'react'






async function fetchCarbs() {
    const res = await fetch('/api/carbon')
    return res.json()
}

export default function CarbonDocs(){
    const treesSaved = useAsync(fetchCarbs, [])

    if(!treesSaved.result){
        return (
            <div>

            </div>
        )
    }

    if(treesSaved.result){
        return (
            <div>

            </div>
        )

    }

}

interface DatumProps {
    value: string | undefined
    title: string
    id: string
}

const Datum = memo<DatumProps>(function _Datum({value, title, id}: DatumProps)) {
    
}