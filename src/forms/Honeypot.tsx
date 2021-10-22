import * as React from "react"
import { css } from "@emotion/react"

export function HoneyPot() {
  return (
    <div css={honeyContainer}>
      <input />
    </div>
  )
}

const honeyContainer = css({
  // transform : "scale(0,0)",
  // position: "fixed"
})
