import * as React from "react"
import { colors } from "src/styles"

interface Props {
  selected: boolean
  colorWhenSelected?: colors
}

export default function RadioIcon({ selected, colorWhenSelected }: Props) {
  const color = selected ? colorWhenSelected || colors.gold : colors.gray
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="11.5" stroke={color} />
      {selected && <circle cx="12" cy="12" r="7" fill={color} />}
    </svg>
  )
}
