import * as React from "react"
import { css } from "@emotion/react"
import { fonts, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET, WHEN_TABLET_AND_UP } from "src/estyles"
import { colors } from "src/styles"
import { Document } from "@contentful/rich-text-types"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"

interface Props {
  title: string
  subtitle: Document
}

export default function CoverContent(props: Props) {
  return (
    <div css={rootCss}>
      <div css={blurCss} />
      <h1 css={heading}>{props.title}</h1>
      <span css={subheading}>{documentToReactComponents(props.subtitle)}</span>
    </div>
  )
}

const centered = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const blurCss = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: 33,
  zIndex: -1,
  backgroundColor: colors.dark,
  filter: "blur(48px)",
  [WHEN_DESKTOP]: {
    display: "none",
  },
})

const rootCss = css(centered, {
  maxWidth: 660,
  width: "90vw",
  marginBottom: 0,
  padding: 24,
  position: "relative",
  [WHEN_TABLET]: {
    maxWidth: 580,
  },
  [WHEN_MOBILE]: {
    maxWidth: 310,
    paddingTop: 24,
    paddingBottom: 24,
  },
  [WHEN_DESKTOP]: {
    paddingTop: 60,
  },
})

const heading = css(fonts.h1, {
  color: colors.white,
  textAlign: "center",
  [WHEN_MOBILE]: css(fonts.h1Mobile, { color: colors.white }),
})

const subheading = css(fonts.body, {
  color: colors.lightGray,
  textAlign: "center",
  [WHEN_TABLET_AND_UP]: {
    maxWidth: 500,
  },
  p: {
    marginTop: 16,
    marginBottom:0 ,
  },
})
