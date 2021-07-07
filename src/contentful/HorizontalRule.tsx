import { css } from "@emotion/react"
import { flex, WHEN_DESKTOP, WHEN_TABLET } from "src/estyles"
import { colors } from "src/styles"

export interface Props {
  darkMode: boolean
}

export default function HR({ darkMode }: Props) {
  return (
    <div css={darkMode ? darkBackground : background}>
      <hr css={darkMode ? darkRoot : rootCss} />
    </div>
  )
}

const gap = 24.0

const background = css(flex)

const darkBackground = css(background, {
  backgroundColor: colors.dark,
})

const rootCss = css({
  marginTop: 0,
  marginBottom: 0,
  width: `calc(100% - ${2  * gap}px)`,
  height: 1,
  alignSelf: "center",
  border: 0,
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

const darkRoot = css(rootCss, {
  backgroundColor: colors.grayHeavy,
})
