import { css, keyframes } from "@emotion/react"
import { flex, flexRow, fonts, WHEN_MOBILE, WHEN_TABLET_AND_UP, whiteText } from "src/estyles"
import { Document } from "@contentful/rich-text-types"
import { Entry } from "contentful"
import { ContentfulButton } from "src/utils/contentful"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import renderers from "src/contentful/nodes/enodes"
import { useEffect } from "react"
import Button, { SIZE } from "src/shared/Button.3"
import Stats from "./stats/Stats"
import { colors } from "src/colors"
import { useState } from "react"
import useInterval from "src/hooks/useInternval"

export interface Props {
  title?: string
  subTitle: Document
  links: Entry<ContentfulButton>[]
  darkMode: boolean
  marquee: string[]
}

export default function Cover(props: Props) {
  return (
    <div css={wrapperCss}>
      <div css={rootCss}>
        <div css={contentCss}>
          {props.title && (
            <Title title={props.title} marquee={props.marquee} darkMode={props.darkMode} />
          )}
          {props.subTitle && (
            <span css={css(subTextCss, props.darkMode ? subtitleDarkMode : centerText)}>
              {documentToReactComponents(props.subTitle, { renderNode: renderers })}
            </span>
          )}

          <div css={linkAreaCss}>
            {props.links?.map((link) => (
              <Button
                align={"center"}
                key={link.sys.id}
                size={SIZE.normal}
                kind={link.fields.kind}
                text={link.fields.words}
                href={link.fields.href}
              />
            ))}
          </div>
        </div>
      </div>
      <div css={statContentCss}>
        <Stats />
      </div>
    </div>
  )
}

const DURATION = 3000

function Title(props: Pick<Props, "title" | "darkMode" | "marquee">) {
  const [showAnimation, setShowAnimation] = useState(false)
  const shouldAnimate = (props.marquee?.length || 0) > 1
  // Wait until after client-side hydration to show to avoid useLayoutIssues with SSR
  useEffect(() => {
    setShowAnimation(shouldAnimate)
  }, [shouldAnimate])
  const firstWord = props.marquee ? props.marquee[0] : ""
  return (
    <h1 css={css(rH1, centerText, props.darkMode && whiteText)}>
      <strong>{props.title}</strong> <br />
      {showAnimation ? (
        <Marquee marquee={props.marquee} />
      ) : (
        <span key={firstWord.replace(" ", "-")} css={nonAnimatedWord}>
          {" "}
          {firstWord}
        </span>
      )}
    </h1>
  )
}

function Marquee({ marquee }: { marquee: string[] }) {
  const [index, setIndex] = useState(0)
  useInterval(() => {
    setIndex(marquee.length - 1 === index ? 0 : index + 1)
  }, DURATION)
  return (
    <span key={marquee[index]} css={animatedWordsCss}>
      {marquee[index]}
    </span>
  )
}

const animationKeyframes = keyframes`
  0% {
    letter-spacing: -0.5em;
    filter: blur(6px);
    opacity: 0.10;
  }
  15% {
    filter: blur(0px);
    opacity: 1;
    letter-spacing: 0em;
  }
  90% {
    filter: blur(0px);
    opacity: 1;
    letter-spacing: 0em;
  }
  100% {
    letter-spacing: -0.5em;
    filter: blur(6px);
    opacity: 0.10;
  }
`

const nonAnimatedWord = css({
  paddingLeft: 12,
  minWidth: 280,
  display: "inline-block",
  textAlign: "center",
  [WHEN_MOBILE]: {
    minWidth: 0,
  },
})

const animatedWordsCss = css(nonAnimatedWord, {
  animation: animationKeyframes,
  animationTimingFunction: "cubic-bezier(0.250, 0.460, 0.450, 0.940)",
  animationPlayState: "running",
  animationIterationCount: "1",
  animationFillMode: "both",
  animationDuration: `${DURATION}ms`,
})

const subTextCss = css({})

const wrapperCss = css(flex, {
  backgroundColor: colors.dark,
  position: "relative",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundSize: "cover",
  boxShadow: `inset 0px -50px 37px 25px ${colors.dark}`,
  alignItems: "center",
  justifyContent: "space-between",
  [WHEN_MOBILE]: {
    alignContent: "center",
    padding: "48px 6px",
  },
  padding: "80px 12px",
})

const rootCss = css(flex, {
  width: "100%",
  height: "100%",
  overflow: "visible",
  alignItems: "center",
  flex: 1,
  marginBottom: 40,
  [WHEN_MOBILE]: {
    flexDirection: "column",
  },
})

const statContentCss = css({
  justifySelf: "center",
  position: "relative",
  bottom: "12%",
  paddingBottom: 24,
})

const centerText = css({
  textAlign: "center",
})

const subtitleDarkMode = css(whiteText, centerText, {
  "h1, h2, h3, h4, p": whiteText,
})

const contentCss = css(flex, {
  justifySelf: "center",
  justifyContent: "center",
  flex: 1,
  width: "100%",
  padding: 24,
  [WHEN_MOBILE]: {
    padding: 16,
    maxWidth: 450,
    alignSelf: "center",
  },
})

const linkAreaCss = css(flexRow, {
  [WHEN_MOBILE]: {
    marginTop: 12,
    flexDirection: "column",
    "& > div": {
      marginBottom: 24,
    },
  },
  [WHEN_TABLET_AND_UP]: {
    justifyContent: "center",
    marginTop: 24,
    "& > div": {
      margin: "0px 12px",
      justifyContent: "center",
    },
  },
})

const rH1 = css(fonts.h1, {
  [WHEN_MOBILE]: fonts.h1Mobile,
})
