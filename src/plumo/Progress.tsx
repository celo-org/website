import * as React from "react"
import { css } from "@emotion/react"
import { colors } from "src/styles"
import { WHEN_MOBILE } from "src/estyles"

interface Props {
  count: number
}

export function Progress({ count }: Props) {
  const max = 100
  return (
    <div
      css={rootCss}
      role="progressbar"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div css={css(progressCSS, { transform: `translateX(-${max - count}%)` })}>
        <div css={insideCss} />
      </div>
    </div>
  )
}

const commonCss = css({
  height: 3,
  borderRadius: 8,
})

const rootCss = css(commonCss, {
  overflow: "hidden",
  marginTop: 4,
  marginBottom: 4,
  width: "98%",
  backgroundColor: colors.secondary,
  [WHEN_MOBILE]: {
    display: "none",
  },
})

const progressCSS = css({
  width: "100%",
  transitionProperty: "transform",
  transitionDuration: "2s",
  transform: "translateX(-100%)",
  transformOrigin: "left",
})

const insideCss = css(commonCss, {
  borderRadius: "12px",
  backgroundColor: colors.primary,
  width: "100%",
})
