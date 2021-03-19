import { css } from "@emotion/react"
import { typeFaces, fontInfo, colors } from "./styles"
import {DESKTOP_BREAKPOINT, TABLET_BREAKPOINT} from "src/shared/Styles"

export const flex = css({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column"
})

export const flexRow = css({
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "row"
})

export const jost = css({
  fontFamily: typeFaces.futura
})

export const garamond = css({
  fontFamily: typeFaces.garamond
})

export const sectionTitle = css(jost,{
  marginTop: 8,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "16px",
  letterSpacing: 3,
  textTransform: 'uppercase'
})

const body = css(fontInfo.p as any, {lineHeight: `${fontInfo.p.lineHeight}px`})

const headingReset = css({
  fontWeight: 'normal',
  margin: 0,
  marginBlockStart: 0,
  marginBlockEnd: 0,
})

export const fonts = {
  body,
  h1: css(fontInfo.h1 as any, headingReset, {lineHeight: `${fontInfo.h1.lineHeight}px`}),
  h1Mobile: css(fontInfo.h1Mobile as any, headingReset, {lineHeight: `${fontInfo.h1Mobile.lineHeight}px`}),
  h2: css(headingReset, fontInfo.h2 as any,  {lineHeight: `${fontInfo.h2.lineHeight}px`}),
  h3: css(headingReset, fontInfo.h3 as any,  {lineHeight: `${fontInfo.h3.lineHeight}px`}),
  h4: css(headingReset, fontInfo.h4 as any,  {lineHeight: `${fontInfo.h4.lineHeight}px`}),
  h5: css(headingReset, fontInfo.h5 as any,  {lineHeight: `${fontInfo.h5.lineHeight}px`}),
  h6: css(headingReset, fontInfo.h6 as any,  {lineHeight: `${fontInfo.h6.lineHeight}px`}),
}

export const WHEN_DESKTOP = `@media (min-width: ${DESKTOP_BREAKPOINT}px)`

export const WHEN_TABLET_AND_UP = `@media (min-width: ${TABLET_BREAKPOINT}px)`

export const WHEN_TABLET = `@media (min-width: ${TABLET_BREAKPOINT}px) and (max-width: ${DESKTOP_BREAKPOINT}px)`


export const WHEN_MOBILE = `@media (max-width: ${TABLET_BREAKPOINT}px)`

export const WHEN_LONG_PHONE = `@media (max-width: 400px) and (min-height: 790px)`

export const whiteText = css({
  color: colors.white
})