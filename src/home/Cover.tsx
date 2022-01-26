import { css } from "@emotion/react"
import {
  flex,
  flexRow,
  fonts,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
  WHEN_TABLET_AND_UP,
  whiteText,
} from "src/estyles"
import { Document } from "@contentful/rich-text-types"
import { GridRow } from "src/layout/Grid2"
import { Asset, Entry } from "contentful"
import { ContentfulButton } from "src/utils/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

import Button, { SIZE } from "src/shared/Button.3"
import { useScreenSize } from "src/layout/ScreenSize"
import Stats from "./stats/Stats"

export interface Props {
  title?: string
  subTitle: Document
  links: Entry<ContentfulButton>[]
  imageDesktop: Asset
  imageMobile: Asset
  darkMode: boolean
  marquee: string[]
}

export default function Cover(props: Props) {
  const { isMobile } = useScreenSize()

  return (
    <GridRow columns={2} darkMode={props.darkMode} wrapperCss={wrapperCss} css={rootCss}>
      <div css={contentCss}>
        {props.title && (
          <h1 css={css(rH1, centerMobileCss, props.darkMode && whiteText)}>
            {props.title} <em>{props.marquee[1]}</em>
          </h1>
        )}
        <span css={css(subTextCss, props.darkMode ? subtitleDarkMode : centerMobileCss)}>
          {documentToReactComponents(props.subTitle)}
        </span>

        <div css={linkAreaCss}>
          {props.links?.map((link) => (
            <Button
              align={"center"}
              key={link.sys.id}
              size={isMobile ? SIZE.fullWidth : SIZE.normal}
              kind={link.fields.kind}
              text={link.fields.words}
              href={link.fields.href}
            />
          ))}
        </div>
      </div>
      <Stats />
    </GridRow>
  )
}

const subTextCss = css({
  marginTop: 16,
})

const wrapperCss = css(flex, {
  alignItems: "center",
  justifyContent: "center",
  [WHEN_MOBILE]: {
    alignContent: "center",
    minHeight: "100vh",
  },
  [WHEN_TABLET]: {
    minHeight: "100vh",
    height: "fit-content",
  },
  [WHEN_DESKTOP]: {
    height: "100vh",
    minHeight: "fit-content",
    maxHeight: "80vw",
  },
})

const rootCss = css({
  gridTemplateAreas: `"content illo"`,
  overflow: "visible",
  [WHEN_MOBILE]: {
    alignContent: "center",
    flexDirection: "column-reverse",
  },
})

const centerMobileCss = css({
  [WHEN_MOBILE]: {
    textAlign: "center",
  },
})

const subtitleDarkMode = css(whiteText, centerMobileCss, {
  "h1, h2, h3, h4, p": whiteText,
})

const contentCss = css(flex, {
  justifySelf: "center",
  justifyContent: "center",
  flex: 1,
  gridArea: "content",
  [WHEN_TABLET_AND_UP]: {
    paddingTop: 56,
    paddingBottom: 48,
    minWidth: 320,
  },
  [WHEN_MOBILE]: {
    padding: 16,
    maxWidth: 450,
    alignSelf: "center",
  },
})

const linkAreaCss = css(flexRow, {
  [WHEN_MOBILE]: {
    flexDirection: "column",
    "& > div": {
      marginBottom: 24,
    },
  },
  [WHEN_TABLET_AND_UP]: {
    "& > div": {
      marginRight: 24,
      justifyContent: "center",
    },
  },
})

const illoCss = css({
  display: "flex",
  gridArea: "illo",
  position: "relative",
  [WHEN_MOBILE]: {
    marginTop: 56,
    width: "100vw",
    justifyContent: "center",
    alignItems: "center",
  },
})

const illoContain = css(illoCss, {
  [WHEN_TABLET]: {
    height: 0,
    overflow: "hidden",
  },
})

const imageCss = css({
  overflow: "visible",
  [WHEN_MOBILE]: {
    overflow: "inherit",
  },
})

const imageContain = css({
  [WHEN_TABLET]: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
})

const flushBottomCss = css({
  [WHEN_TABLET_AND_UP]: {
    bottom: 0,
    position: "absolute",
  },
})

const imageFirstCss = css(imageCss, {
  right: 0,
})

const rH1 = css(fonts.h1, {
  [WHEN_MOBILE]: fonts.h1Mobile,
})
