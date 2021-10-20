import { css } from "@emotion/react"
import * as React from "react"
import { colors } from "src/colors"

interface Props {
  onPress: () => void
  isOpen: boolean
  color: colors
  className?: string
}

const DISTANCE = 5

export default React.memo(function Hamburger(props: Props) {
  const backgroundColor = props.color
  return (
    <div onClick={props.onPress} css={rootCss} className={props.className}>
      <div
        css={[
          barCss,
          props.isOpen ? slopeUpCss : { backgroundColor, transform: `translateY(${-DISTANCE}px)` },
        ]}
      />
      <div css={[barCss, props.isOpen ? invisibleCss : { backgroundColor }]} />
      <div
        css={[
          barCss,
          props.isOpen ? slopeDownCss : { backgroundColor, transform: `translateY(${DISTANCE}px)` },
        ]}
      />
    </div>
  )
})

const rootCss = css({
  position: "relative",
  width: 18,
  height: 12,
  margin: 20,
  opacity: 1,
  transitionProperty: "opacity",
  transitionDuration: "30ms",
  "&:active": {
    opacity: 0.75,
  },
})
const barCss = css({
  transitionProperty: "transform color",
  transitionDuration: "160ms",
  position: "absolute",
  marginTop: 2,
  marginBottom: 2,
  height: 2,
  width: 18,
  backgroundColor: colors.dark,
})
const slopeUpCss = css({
  transform: "rotate(45deg)",
})
const slopeDownCss = css({
  transform: "rotate(-45deg)",
})
const invisibleCss = css({
  opacity: 0,
})
