import * as React from 'react'
import { colors } from 'src/styles'
import Svg, { Path } from 'svgs'

interface Props {
    color: colors
    size: number
}

export default React.memo(function Twitch({ color, size }: Props) {
    return (
        <Svg width={size} height={size} viewBox="0 0 15 16" fill="none">
            <Path 
                fill={color}
                d="M1.17999 0.521484L0.20459 3.12262V13.5259H3.77938V15.4777H5.73107L7.68081 13.5259H10.6062L14.5076 9.62594V0.521484H1.17999ZM2.47948 1.82123H13.2076V8.97435L10.9314 11.2506H7.35611L5.40692 13.1997V11.2506H2.47948V1.82123ZM6.05571 8.32493H7.3561V4.42375H6.05571V8.32493ZM9.63129 8.32493H10.9314V4.42375H9.63129V8.32493Z"
            />
        </Svg>
    )
})