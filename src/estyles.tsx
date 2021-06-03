import { css } from "@emotion/react"
import { typeFaces, fontInfo, colors } from "./styles"
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from "src/shared/Styles"

export const flex = css({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
})

export const gridRow = css({
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  columnGap: 24,
  rowGap: 24,
})

export const flexRow = css({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row",
})

export const jost = css({
  fontFamily: typeFaces.futura,
})

export const garamond = css({
  fontFamily: typeFaces.garamond,
})

export const whiteText = css({
  color: "white",
})

export const sectionTitle = css(jost, {
  marginTop: 8,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "16px",
  letterSpacing: 3,
  textTransform: "uppercase",
})

const body = css(fontInfo.p as any, { lineHeight: `${fontInfo.p.lineHeight}px` })

const headingReset = css({
  fontWeight: "normal",
  margin: 0,
  marginBlockStart: 0,
  marginBlockEnd: 0,
})

export const fonts = {
  body,
  h1: css(fontInfo.h1 as any, headingReset, { lineHeight: `${fontInfo.h1.lineHeight}px` }),
  h1Mobile: css(fontInfo.h1Mobile as any, headingReset, {
    lineHeight: `${fontInfo.h1Mobile.lineHeight}px`,
  }),
  h2: css(headingReset, fontInfo.h2 as any, { lineHeight: `${fontInfo.h2.lineHeight}px` }),
  h3: css(headingReset, fontInfo.h3 as any, { lineHeight: `${fontInfo.h3.lineHeight}px` }),
  h4: css(headingReset, fontInfo.h4 as any, { lineHeight: `${fontInfo.h4.lineHeight}px` }),
  h5: css(headingReset, fontInfo.h5 as any, { lineHeight: `${fontInfo.h5.lineHeight}px` }),
  h6: css(headingReset, fontInfo.h6 as any, { lineHeight: `${fontInfo.h6.lineHeight}px` }),
  navigation: css(fontInfo.navigation as any, {
    lineHeight: `${fontInfo.navigation.lineHeight}px`,
  }),
}

export const textStyles = {
  center: css({
    textAlign: "center",
  }),
  left: css({
    textAlign: "left",
  }),
  lean: css({ fontWeight: 300 }),
  medium: css({
    fontWeight: 500,
  }),
  heavy: css({
    fontWeight: "bold",
  }),
  italic: css({
    fontStyle: "italic",
  }),
}

export const WHEN_DESKTOP = `@media (min-width: ${DESKTOP_BREAKPOINT}px)`

export const WHEN_TABLET_AND_UP = `@media (min-width: ${TABLET_BREAKPOINT}px)`

export const WHEN_TABLET = `@media (min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT}px)`

export const WHEN_MOBILE = `@media (max-width: ${TABLET_BREAKPOINT}px)`

export const WHEN_SMALL_MOBILE = `@media (max-width: 330px)`

export const WHEN_LONG_PHONE = `@media (max-width: 400px) and (min-height: 790px)`

export const labelStyle = css(jost, flex, {
  color: colors.secondary,
  fontWeight: 500,
  fontSize: 16,
  lineHeight: "18px",
  marginTop: 8,
  marginBottom: 16,
})

export const inputStyle = css(flex, fonts.body, {
  alignSelf: "center",
  paddingLeft: 12,
  paddingRight: 12,
  paddingTop: 12,
  paddingBottom: 16,
  borderRadius: 3,
  borderWidth: 1,
  borderStyle: "solid",
  borderColor: "rgba(61, 61, 61, 0.2)",
  width: "100%",
  margin: 4,
  marginBottom: 8,
  outlineWidth: 0,
  "&:focus": {
    borderColor: colors.primary,
  },
})

export const inputDarkStyle = css(inputStyle, {
  backgroundColor: colors.dark,
  borderColor: colors.secondary,
  color: colors.white,
  "&:focus": {
    borderColor: colors.white,
  },
})

export const errorStyle = css({
  color: colors.error,
})
