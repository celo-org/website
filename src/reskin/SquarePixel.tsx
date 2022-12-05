import * as React from "react"
import { colors } from "../colors"
import { css, CSSObject } from "@emotion/react"
import { WHEN_MOBILE } from "src/estyles"

interface Props {
  options: CSSObject
  width?: number
  height?: number
  backgroundColor?: backgroundColor
  mobileOnly?: boolean
}

type backgroundColor = {
  desktop?: colors
  mobile?: colors
}
export const PIXEL_SIZE = 86

export function SquarePixel(props: Props) {
  const squarePixelCss = backgroundPixelCSS(
    props.options,
    props.backgroundColor,
    props.width,
    props.height
  )
  return (
    <div css={css(!props.mobileOnly && squarePixelCss, { [WHEN_MOBILE]: squarePixelCss })}></div>
  )
}

const backgroundPixelCSS = (
  options,
  backgroundColor: backgroundColor = { desktop: colors.baseTan },
  width?,
  height?
) => {
  return css({
    width: width >= 0 ? width : PIXEL_SIZE,
    height: height >= 0 ? height : PIXEL_SIZE,
    backgroundColor: backgroundColor.desktop ? backgroundColor.desktop : colors.baseTan,
    border: "none",
    position: "absolute",
    transitionProperty: "all",
    transitionDuration: "400ms",
    [WHEN_MOBILE]: {
      backgroundColor: backgroundColor?.mobile ? backgroundColor.mobile : backgroundColor.desktop,
    },
    ...options,
  })
}
