/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import CoverContent from "src/home/CoverContent"
import { colors } from "src/styles"
import { DESKTOP_BREAKPOINT, HEADER_HEIGHT } from 'src/shared/Styles'
import celoAsStars from "src/home/celo-galaxy.svg"
import examplePhones from "src/home/app-examples@2x.png"
import Stats from "./stats/Stats"
import { flex } from "src/estyles"
import { useScreenSize } from "src/layout/ScreenSize"
import { useState } from "react"
import { NameSpaces } from "src/i18n"

function useImageLoaded(): [boolean, () => void] {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)
  function setLoadingComplete() {
    setBackgroundLoaded(true)
  }
  return [backgroundLoaded, setLoadingComplete]
}

export default function Cover() {
  const {isDesktop} = useScreenSize()
  const {t} = useTranslation(NameSpaces.home)
  const [backgroundLoaded, setLoadingComplete] = useImageLoaded()
  return (
    <div css={rootCss}>
      <img src={celoAsStars} alt="" loading="lazy"  onLoad={setLoadingComplete}  css={css(backgroundArea, backgroundLoaded && backgroundLoadedCss)}/>
      <div css={useableArea}>
        <CoverContent />
        <picture>
          <img alt={t("coverPhonesImage")} src={examplePhones} width={1016} height={524} css={featureImageCss} />
        </picture>
      </div>

      {isDesktop && <Stats /> }
  </div>
  )
}

const rootCss = css(flex,{
  alignSelf: "center",
  alignItems: "center",
  backgroundColor: colors.dark,
  marginTop: HEADER_HEIGHT,
  paddingTop:HEADER_HEIGHT,
  width: "100%"
})

const backgroundArea = css({
  position: "absolute",
  display: "none",
  transitionDuration: "1000ms",
  transitionProperty: "opacity, transform",
  transitionTimingFunction: "ease-in-out",
  opacity: 0,
  transform: "scale(0.9)",
  ["@media (prefers-reduced-motion"]: {
    transform: "scale(1)",
  },
  [`@media (min-width: ${DESKTOP_BREAKPOINT}px)`]: {
    display: "block",
    maxWidth: 1380,
    width: '100%',
    height: 920,
  }
})

const backgroundLoadedCss = css({
  opacity: 1,
  transform: "scale(1)",
})

const featureImageCss = css({

})

const useableArea = css(flex,{
  alignItems: "center",
  maxWidth: 1100,
  minHeight:920,
  paddingBottom: 60,
  zIndex: 20,
})