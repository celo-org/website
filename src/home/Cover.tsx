/** @jsx jsx */
import {jsx, css, keyframes} from "@emotion/core"
import CoverContent from "src/home/CoverContent"
import { colors } from "src/styles"
import { DESKTOP_BREAKPOINT, HEADER_HEIGHT } from 'src/shared/Styles'
import celoAsStars from "src/home/celo-galaxy.svg"
import examplePhones from "src/home/app-examples@2x.png"
import Stats from "./stats/Stats"
import { flex, WHEN_DESKTOP } from "src/estyles"
import { useScreenSize } from "src/layout/ScreenSize"
import { useState } from "react"
import { NameSpaces, useTranslation } from "src/i18n"

function useImageLoaded(): [boolean, () => void] {
  const [backgroundLoaded, setBackgroundLoaded] = useState(false)
  function setLoadingComplete() {
    setBackgroundLoaded(true)
  }
  return [backgroundLoaded, setLoadingComplete]
}

export default function Cover() {
  const {isDesktop, isTablet} = useScreenSize()
  const {t} = useTranslation(NameSpaces.home)
  return (
    <div css={rootCss}>
      <img src={celoAsStars} alt=""   css={backgroundArea}/>
      <div css={useableArea}>
        <CoverContent />
        {(isDesktop || isTablet) && <picture>
          {/* add web p, 2x, tablet, and mobile sources*/}
          <img alt={t("coverPhonesImage")} src={examplePhones} width={1016} height={524} css={featureImageCss} />
        </picture>}
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
  paddingTop: HEADER_HEIGHT,
  width: "100%",
  maxWidth: "100vw"
})

const starKeyFrames =  keyframes`
  from {
    opacity: 0.1;
    transform: scale(0.9);
  }

  25% {
    opacity: 0.5
  }

  to {
    opacity: 1;
    transform: scale(1);
  }

`

const backgroundArea = css({
  position: "absolute",
  display: "none",
  animationIterationCount: 1,
  animationFillMode: "both",
  animationDelay: "1s",
  animationDuration: "20s",
  animationName: starKeyFrames,
  animationTimingFunction: "ease-in-out",
  opacity: 0.1,
  [WHEN_DESKTOP]: {
    display: "block",
    maxWidth: 1380,
    width: '100%',
    height: 920,
  }
})

const featureImageCss = css({

})

const useableArea = css(flex,{
  alignItems: "center",
  [WHEN_DESKTOP]: {
    maxWidth: 1100,
    minHeight:920,
    paddingBottom: 60,
    zIndex: 20,
  }
})