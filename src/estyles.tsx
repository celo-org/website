import { css } from "@emotion/core"
import { typeFaces } from "./styles"

export const flex = css({
  display: "flex",
  flexDirection: "column"
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