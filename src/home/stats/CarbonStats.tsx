import { useAsync } from 'react-async-hook'



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