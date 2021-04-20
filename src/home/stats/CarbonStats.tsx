import { useAsync } from 'react-async-hook'
import {memo} from 'react'
// import { DatumProps } from './Stats'
import isSpecial from './Stats'
import {css, keyframes} from "@emotion/react"
import {valueCss, specialCss, labelCss} from './Stats'





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

const Datum = memo<DatumProps>(function _Datum({value, title, id}: DatumProps) {
    const special: any = isSpecial(value)

    return (
        <>
        <span key={`${id}-${special}`} css={css(valueCss, special && specialCss)} aria-labelledby={id} >{value}</span>
      <span css={labelCss} id={id}>{title}</span>
        </>
    )
}