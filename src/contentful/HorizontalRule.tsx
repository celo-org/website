import { css } from "@emotion/react"
import { WHEN_DESKTOP, WHEN_TABLET } from "src/estyles"
import { colors } from "src/styles"

export default function HR() {
  return <hr css={rootCss} />
}
const gap = 24.0

const rootCss = css({
  width: "100%",
  border: 0,
  height: 2,
  alignSelf: "center",
  backgroundColor: colors.lightGray,
  marginLeft: gap / 2,
  marginRight: gap / 2,
  [WHEN_DESKTOP]: {
    maxWidth: 1080 + gap,
  },
  [WHEN_TABLET]: {
    marginRight: gap,
    marginLeft: gap,
    maxWidth: 958 + gap,
  },
})
