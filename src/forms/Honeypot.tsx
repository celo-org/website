import * as React from "react"
import { useState } from "react"
import { css } from "@emotion/react"

export function HoneyPot() {
  const [value, setValue] = useState("")
  return (
    <input
      type="text"
      name={"account email"}
      value={value}
      onChange={(e) => {
        setValue(e.target.value)
      }}
      css={honeyContainer}
    />
  )
}

const honeyContainer = css({
  transform: "scale(0,0)",
  position: "fixed",
})
