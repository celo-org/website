import { css } from "@emotion/react"
import * as React from "react"
import { flex, WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles"

interface TripplePairingProps {
  first: React.ReactNode
  second: React.ReactNode
  third: React.ReactNode
}

export default function TripplePairing({ first, second, third }: TripplePairingProps) {
  return (
    <div css={rootCss}>
      {[first, second, third].map((pair, index) => {
        return (
          <div css={pairCss} key={index}>
            {pair}
          </div>
        )
      })}
    </div>
  )
}

const rootCss = css(flex, {
  gap: 16,
  [WHEN_TABLET_AND_UP]: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
})

const pairCss = css(flex, {
  flex: 1,
  [WHEN_MOBILE]: {
    flexDirection: "row",
  },
})
