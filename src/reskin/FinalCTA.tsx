import { GridRowContentType } from "../utils/contentful"
import { cellSwitch } from "../public-sector/cellSwitch"
import { css } from "@emotion/react"
import { flex, WHEN_MOBILE } from "../estyles"
import { colors } from "../colors"
import { CeloLinks } from "../shared/menu-items"
import MediumLogo from "../icons/MediumLogo"
import * as React from "react"
import Discord from "../icons/Discord"
import { TweetLogo } from "../icons/TwitterLogo"
import Octocat from "../icons/Octocat"
import { PIXEL_SIZE, SquarePixel } from "./SquarePixel"
import Button, { BTN } from "../shared/Button.4"
import SocialLinks from "./components/SocialLinks"

interface Props {
  gridFields: GridRowContentType
}

export function FinalCTA(props: Props) {
  const { gridFields } = props

  return (
    <section css={mainCss}>
      <div css={wrapperCss}>
        <div css={contentCss}>
          {gridFields.cells?.map((cell) =>
            cellSwitch(cell, gridFields.darkMode, gridFields.columns)
          )}
        </div>
        <SocialLinks iconCss={css({ padding: 33 })} />
        <SquarePixel options={{ top: 0, right: 0 }} backgroundColor={{ mobile: colors.sand }} />
        <SquarePixel
          options={{ top: 0, right: PIXEL_SIZE * 2 }}
          backgroundColor={{ mobile: colors.sand }}
        />
        <SquarePixel
          options={{ bottom: 0, left: 0 }}
          backgroundColor={{ desktop: colors.primaryYellow }}
        />
      </div>
    </section>
  )
}

const mainCss = css(flex, {
  position: "relative",
  backgroundColor: colors.white,
  justifyContent: "center",
  color: colors.black,
  [WHEN_MOBILE]: {
    flexDirection: "column",
  },
})

const wrapperCss = css(flex, {
  alignItems: "center",
  h2: {
    color: colors.black,
  },
  paddingBottom: 168,
})

const contentCss = css(flex, {
  padding: 150,
  paddingBottom: 32,
  textAlign: "center",
  [WHEN_MOBILE]: {
    alignItems: "flex-start",
    paddingBottom: 24,
  },
})
