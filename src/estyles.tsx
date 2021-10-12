import { css } from "@emotion/react"
import { typeFaces, fontInfo } from "./styles"
import { colors } from "./colors"
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
  legal: css(headingReset, fontInfo.legal as any, { lineHeight: `${fontInfo.legal.lineHeight}px` }),
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

export const WHEN_LONG_PHONE = `@media (max-width: 400px) and (min-height: 790px)`

export const WHEN_SMALL_MOBILE = `@media (max-width: 330px)`

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

export const whiteText = css({
  color: colors.white,
  [WHEN_MOBILE]: {
    color: colors.white,
  },
})

const margins = {
  large: 100,
  medium: 60,
  small: 20,
}

const tabletMargins = {
  large: 75,
  medium: 40,
  small: 20,
}

const mobileMargins = {
  large: 50,
  medium: 30,
  small: 20,
}

export const darkBackground = css({ backgroundColor: colors.dark })

export const standardStyles = {
  centered: css({
    justifyContent: "center",
    alignItems: "center",
  }),
  sectionMargin: css({
    marginTop: margins.large,
    marginBottom: margins.large,
  }),
  sectionMarginBottom: css({
    marginBottom: margins.large,
  }),
  sectionMarginTop: css({
    marginTop: margins.large,
  }),
  sectionMarginMobile: css({
    marginTop: mobileMargins.large,
    marginBottom: mobileMargins.large,
  }),
  sectionMarginBottomMobile: css({
    marginBottom: mobileMargins.large,
  }),
  sectionMarginTopMobile: css({
    marginTop: mobileMargins.large,
  }),
  sectionMarginTablet: css({
    marginTop: tabletMargins.large,
    marginBottom: tabletMargins.large,
  }),
  sectionMarginBottomTablet: css({
    marginBottom: tabletMargins.large,
  }),
  sectionMarginTopTablet: css({
    marginTop: tabletMargins.large,
  }),
  blockMargin: css({
    marginTop: margins.medium,
    marginBottom: margins.medium,
  }),
  blockMarginTop: css({
    marginTop: margins.medium,
  }),
  blockMarginBottom: css({
    marginBottom: margins.medium,
  }),
  blockMarginMobile: css({
    marginTop: mobileMargins.medium,
    marginBottom: mobileMargins.medium,
  }),
  blockMarginTopMobile: css({
    marginTop: mobileMargins.medium,
  }),
  blockMarginBottomMobile: css({
    marginBottom: mobileMargins.medium,
  }),
  blockMarginTablet: css({
    marginTop: tabletMargins.medium,
    marginBottom: tabletMargins.medium,
  }),
  blockMarginTopTablet: css({
    marginTop: tabletMargins.medium,
  }),
  blockMarginBottomTablet: css({
    marginBottom: tabletMargins.medium,
  }),
  halfElement: css({
    marginTop: margins.small / 2,
    marginBottom: margins.small / 2,
  }),
  elementalMargin: css({
    marginTop: margins.small,
    marginBottom: margins.small,
  }),
  elementalMarginTop: css({
    marginTop: margins.small,
  }),
  elementalMarginBottom: css({
    marginBottom: margins.small,
  }),
}
