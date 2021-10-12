import * as React from "react"
import { colors } from "src/colors"

export enum Direction {
  down = 0,
  left = 90,
  up = 180,
}

interface Props {
  direction: Direction
  color?: colors
}

export default function Triangle({ direction = Direction.down, color = colors.dark }: Props) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 8" fill="none" transform={`rotate(${direction})`}>
      <title>triangle</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 8L0 0H14L7 8Z" fill={color} />
    </svg>
  )
}
