/** @jsx jsx */
import {jsx, css, keyframes} from "@emotion/core"
import CoverContent from "src/home/CoverContent"
import { colors } from "src/styles"
import { DESKTOP_BREAKPOINT, HEADER_HEIGHT, TABLET_BREAKPOINT } from 'src/shared/Styles'
import celoAsStarsMobile from "src/home/celo-sky-mobile.svg"
import celoAsStarsTablet from "src/home/celo-sky-tablet.svg"
import celoAsStarsDesktop from "src/home/celo-sky-desktop.svg"

import examplePhones from "src/home/app-examples@2x.png"
import Stats from "./stats/Stats"
import { flex, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
import { useScreenSize } from "src/layout/ScreenSize"
import { NameSpaces, useTranslation } from "src/i18n"

export default function Cover() {
  const {isDesktop, isTablet} = useScreenSize()
  const {t} = useTranslation(NameSpaces.home)
  return (
    <div css={rootCss}>
      <picture>
        <source media={`(max-width: ${TABLET_BREAKPOINT}px)`} srcSet={celoAsStarsMobile}/>
        <source media={`(max-width: ${DESKTOP_BREAKPOINT}px)`} srcSet={celoAsStarsTablet}/>
        <img  src={celoAsStarsDesktop}
          alt=""
          css={backgroundArea}  />
      </picture>
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
  paddingTop: HEADER_HEIGHT,
  width: "100%",
  maxWidth: "100vw",
  [WHEN_MOBILE]: {
    justifyContent: "center",
    minHeight: "calc(100vh - 24px)",
  },
  [WHEN_TABLET]: {
    width: '100vw',
    minHeight: "100vh",
    // backgroundColor: colors.grayHeavy
  },
  [WHEN_DESKTOP]: {
    paddingTop: 140
  }
})

const starKeyFrames =  keyframes`
  from {
    opacity: 0.1;
    transform: scale(1.01);
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
  animationIterationCount: 1,
  animationFillMode: "both",
  animationDelay: "100ms",
  animationDuration: "10s",
  animationName: starKeyFrames,
  animationTimingFunction: "ease-in-out",
  opacity: 0.1,
  width: '100%',
  height: "100%",
  left: 0,
  right: 0,
  [WHEN_MOBILE]: {
    height: "100vh",
    right: 0,
    top: 50,
  },
  [WHEN_TABLET]: {
    width: '100vw',
    height: "100vh",
    right: 0,
    top: 50,
  },
  [WHEN_DESKTOP]: {
    width: 1262,
    height: 1067,
    top: 100
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