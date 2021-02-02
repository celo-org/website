

/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import CoverContent from "src/home/CoverContent"
import { colors } from "src/styles"
import { DESKTOP_BREAKPOINT, HEADER_HEIGHT } from 'src/shared/Styles'
import celoAsStars from "src/home/celo-galaxy.svg"
import examplePhones from "src/home/app-examples@2x.png"
export default function Cover() {


  return (
    <div css={rootCss}>
      <div css={useableArea}>
        <CoverContent />
        <picture>
          <img src={examplePhones} width={1016} height={524} />
        </picture>
      </div>
  </div>
  )
}

const flex = css ({
  display: "flex",
  flexDirection: "column"
})

const rootCss = css(flex,{
  alignSelf: "center",
  alignItems: "center",
  backgroundColor: colors.dark,
  marginTop: HEADER_HEIGHT,
  paddingTop:HEADER_HEIGHT,
  paddingBottom: 60,
  width: "100%"
})

const useableArea = css(flex,{
  alignItems: "center",
  maxWidth: 1100,
  [`@media (min-width: ${DESKTOP_BREAKPOINT}px)`]: {
    backgroundImage: `url(${celoAsStars})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    width: '100%',
    height: 920,
  }
})