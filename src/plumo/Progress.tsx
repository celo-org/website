import * as React from "react"
import { css, keyframes } from "@emotion/react"
import { colors } from "src/colors"
import { WHEN_MOBILE } from "src/estyles"

interface Props {
  count: number
  max: number
  loading: boolean
}

export function Progress({ count = 0, max = 100, loading }: Props) {
  const percent = ((max - count) / max) * 100
  return (
    <div
      css={rootCss}
      role="progressbar"
      aria-valuenow={count}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div css={css(progressCSS, loading ? loadingCss : { transform: `translateX(-${percent}%)` })}>
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

const loadingFrames = keyframes`
  from {
    transform: scaleX(0);
  }

  50% {
    transform: scaleX(0.75);
  }

  75% {
    transform: scaleX(0.25);
  }

  to {
    scaleX(1);
  }
`

const loadingCss = css({
  transform: "translateX(0%)",
  transformOrigin: "center",
  animationIterationCount: "infinite",
  animationTimingFunction: "ease-in-out",
  animationDirection: "alternate",
  animationFillMode: "both",
  animationDuration: "6.2s",
  animationName: loadingFrames,
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
