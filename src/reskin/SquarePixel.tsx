import * as React from "react"
import { colors } from "../colors"
import { css, CSSObject } from "@emotion/react"
import { WHEN_MOBILE } from "src/estyles"

interface Props {
  options: CSSObject
  backgroundColor?: backgroundColor
  mobileOnly?: boolean
}

type backgroundColor = {
  desktop?: colors
  mobile?: colors
}
export const PIXEL_SIZE = 86

export function SquarePixel(props: Props) {
  const squarePixelCss = backgroundPixelCSS(props.options, props.backgroundColor)
  return (
    <div css={css(!props.mobileOnly && squarePixelCss, { [WHEN_MOBILE]: squarePixelCss })}></div>
  )
}

const backgroundPixelCSS = (
  options,
  backgroundColor: backgroundColor = { desktop: colors.baseTan }
) => {
  return css({
    width: PIXEL_SIZE,
    height: PIXEL_SIZE,
    backgroundColor: backgroundColor.desktop ? backgroundColor.desktop : colors.baseTan,
    border: `1px solid ${backgroundColor.desktop ? backgroundColor.desktop : colors.baseTan}`,
    position: "absolute",
    ...options,
    [WHEN_MOBILE]: {
      backgroundColor: backgroundColor?.mobile ? backgroundColor.mobile : backgroundColor.desktop,
    },
  })
}
