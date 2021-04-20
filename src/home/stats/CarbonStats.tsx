import { useAsync } from 'react-async-hook'
import { NameSpaces, useTranslation } from 'src/i18n'
import { Datum } from './Stats'

async function fetchCarbs() {
    const res = await fetch('/api/carbon')
    return res.json()
}

export default function CarbonStats(){
    const {t} = useTranslation(NameSpaces.home)
    const carbonOffset = useAsync(fetchCarbs, [])
    if(!carbonOffset?.result){
        return null
    }

       return <Datum value={`${carbonOffset?.result}`} title={t("carbonTonsOffset")} id="carbon" link={'https://www.wren.co/profile/celo'} />
}
