import * as React from "react"
import { css, keyframes } from "@emotion/react"
import globe from "src/shared/world-spin.gif"
import { colors } from "src/colors"
import {
  WHEN_MOBILE,
  textStyles,
  whiteText,
  flexRow,
  flex,
  darkBackground,
  fonts,
} from "src/estyles"

const CHANGE_STORY = [
  "Change the Story", // en
  "Cambia la historia", // es
  "改变故事", // cn
  "Muda a história", // pt
  "새로운 이야기를 쓰다", // ko
]

export default function ChangeStory({ darkMode }: { darkMode: boolean }) {
  const [count, setCount] = React.useState(0)

  const next = () => {
    setCount((current) => {
      return current + 1 < CHANGE_STORY.length ? current + 1 : 0
    })
  }

  React.useEffect(() => {
    const timer = setTimeout(next, DURATION)
    return () => clearTimeout(timer)
  }, [count])

  return (
    <div css={containerCss}>
      <img src={globe.src} css={globeCss} height={globe.height} width={globe.width} />
      <span css={css(separatorCss, darkMode && whiteText)}>|</span>
      <Wipe text={CHANGE_STORY[count]} darkMode={darkMode} />
    </div>
  )
}

interface WipeProps {
  text: string
  darkMode?: boolean
}

const Wipe = React.memo(function _Wipe({ text, darkMode }: WipeProps) {
  return (
    <div css={wipeRootCss}>
      <div key={`hide-${text}`} css={css(maskCss, darkMode && darkBackground, hideCss)} />
      <span key={text} css={css(fonts.legal, darkMode && whiteText, textStyles.italic, textFadeIn)}>
        "{text}"
      </span>
      <div key={`reveal-${text}`} css={css(maskCss, darkMode && darkBackground, revealCss)} />
    </div>
  )
})

const wipeRootCss = css(flex, {
  position: "relative",
})

const DURATION = 4000
const TRANSITION_TIME = 250

const globeCss = css({
  width: 20,
  height: 20,
  zIndex: 10,
  [WHEN_MOBILE]: {
    marginBottom: 8,
  },
})

const separatorCss = css({
  marginLeft: 10,
  marginRight: 10,
  zIndex: 10,
  [WHEN_MOBILE]: {
    display: "none",
  },
})

const containerCss = css(flexRow, {
  marginBottom: 20,
  overflow: "hidden",
  [WHEN_MOBILE]: {
    justifyContent: "center",
    alignItems: "center",
  },
})

const maskCss = css(flex, {
  backgroundColor: colors.white,
  position: "absolute",
  height: "100%",
  width: "101%",
  animationDuration: `${TRANSITION_TIME}ms`,
  animationIterationCount: 1,
  animationTimingFunction: "linear",
  animationFillMode: "both",
})

const hideKeyFrames = keyframes`
  from {
    transform: translateX(-100%)
  }
  to {
    transform: translateX(0%)
  }
`

const revealKeyframes = keyframes`
  from {
    transform: translateX(0%)
  }

  to {
    transform: translateX(100%)
  }
`

const hideCss = css({
  animationDelay: `${DURATION - TRANSITION_TIME * 2}ms`,
  animationName: hideKeyFrames,
})

const revealCss = css({
  animationName: revealKeyframes,
})

const textKeyFrames = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`

const textFadeIn = css({
  animationFillMode: "both",
  animationIterationCount: 1,
  animationDuration: "750ms",
  animationName: textKeyFrames,
  [WHEN_MOBILE]: {
    textAlign: "center",
  },
})
