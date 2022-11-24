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

interface Props {
  gridFields: GridRowContentType
}

const ICON_SIZE = 40

function socials() {
  const iconColor = colors.black
  return [
    {
      name: "Chat",
      link: CeloLinks.discord,
      icon: <Discord size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Blog",
      link: CeloLinks.mediumPublication,
      icon: <MediumLogo height={ICON_SIZE} color={iconColor} wrapWithLink={false} />,
    },
    {
      name: "Twitter",
      link: CeloLinks.twitter,
      icon: <TweetLogo height={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "GitHub",
      link: CeloLinks.gitHub,
      icon: <Octocat size={ICON_SIZE} color={iconColor} />,
    },
  ]
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
        <div css={socialsCss}>
          {socials().map((social) => (
            <div key={social.name} css={socialIconCss}>
              <Button
                target="_blank"
                kind={BTN.INLINE}
                text={social.icon as unknown as string}
                href={social.link}
              />
            </div>
          ))}
        </div>
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

const socialsCss = css(flex, {
  flexDirection: "row",
  paddingBottom: 158,
  "& > div:nth-child(-n+3)": {
    borderRight: "none",
  },
})

const socialIconCss = css({
  padding: 33,
  border: `1px solid ${colors.outlineGray}`,
  [WHEN_MOBILE]: {
    padding: 16,
  },
})
