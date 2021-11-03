import * as React from "react"
// import { css } from "@emotion/react"

interface Props {
  value: string
  onChange: (x?: unknown) => void
}

export function HoneyPot({ value, onChange }: Props) {
  return (
    <input
      type="email"
      name={"accountNumber"}
      value={value}
      onChange={onChange}
      // css={honeyContainer}
    />
  )
}

// const honeyContainer = css({
//   transform: "scale(0,0)",
//   position: "fixed",
// })
