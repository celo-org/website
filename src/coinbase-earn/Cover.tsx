import * as React from "react"
import HeroMobile from "src/coinbase-earn/hero-mobile.png"
import Hero from "src/coinbase-earn/hero.png"
import { useScreenSize } from "src/layout/ScreenSize"
import { WHEN_MOBILE, flex } from "src/estyles"
import { css } from "@emotion/react"

export default function Cover() {
  const { isMobile } = useScreenSize()
  return (
    <div css={rootCss}>
      <img src={isMobile ? HeroMobile.src : Hero.src} css={imageCss} />
    </div>
  )
}

const rootCss = css(flex, {
  width: "100%",
  backgroundColor: "#1652EB",
  height: 450,
  alignItems: "center",
  [WHEN_MOBILE]: {
    height: 360,
    maxHeight: "50vh",
  },
})

const imageCss = {
  maxWidth: 1050,
  minWidth: 600,
  width: "100%",
  height: "100%",
  [WHEN_MOBILE]: {
    width: "100vw",
    height: "100%",
  },
}
