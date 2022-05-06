import * as React from "react"
import { css } from "@emotion/react"
import { WHEN_MOBILE, WHEN_DESKTOP, WHEN_TABLET, flexRow, fonts } from "src/estyles"
import { colors } from "src/colors"
import { ToggleBlurbType, ToggleBlurbContentType } from "src/utils/contentful"
import { renderNode } from "src/contentful/nodes/nodes"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Chevron, { Direction } from "src/icons/chevron"
import { buttonCss } from "./Playlist"
import { useScreenSize } from "src/layout/ScreenSize"

type Props = ToggleBlurbType
export default function ToogleBlurb(props: Props) {
  const [expandedIndex, setBlurbIndex] = React.useState(null)
  const toggle = (num: number) => (expandedIndex === num ? setBlurbIndex(null) : setBlurbIndex(num))
  const { isMobile, isTablet } = useScreenSize()
  const contentImage = props.imageDesktop?.fields?.file

  if (isMobile || isTablet) {
    return (
      <div css={rootCss}>
        {contentImage && (
          <div css={mobileImageContainer}>
            <img
              src={contentImage.url}
              width={contentImage.details.image.width / 4}
              height={contentImage.details.image.height / 4}
              css={css(shadowCss({ x: X, y: Y, blur: BLUR, shadow: SHADOW }))}
            />
          </div>
        )}
        <div css={css(props.darkMode && darkModeText)}>
          {props.cards.map(({ fields, sys }, index) => {
            return (
              <ToggleBlurbContent
                key={sys.id}
                title={fields.title}
                image={fields.image}
                body={fields.body}
                cssStyle={fields.cssStyle}
                toggle={() => toggle(index)}
                expanded={expandedIndex}
                index={index}
              />
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <div css={css(props.darkMode && rootDesktopGrid)}>
      <div css={toggleContainer}>
        {props.cards.slice(0, 4).map(({ fields, sys }, index) => {
          return (
            <ToggleBlurbContent
              key={sys.id}
              title={fields.title}
              image={fields.image}
              body={fields.body}
              cssStyle={fields.cssStyle}
              index={index}
            />
          )
        })}
      </div>
      {contentImage && (
        <div css={desktopImageContainer}>
          <img
            src={contentImage.url}
            width={contentImage.details.image.width / 2}
            height={contentImage.details.image.height / 2}
            css={css(shadowCss({ x: X, y: Y, blur: BLUR, shadow: SHADOW }))}
          />
        </div>
      )}
      <div css={toggleContainer}>
        {props.cards.slice(4, 8).map(({ fields, sys }, index) => {
          return (
            <ToggleBlurbContent
              key={sys.id}
              title={fields.title}
              image={fields.image}
              body={fields.body}
              cssStyle={fields.cssStyle}
              index={index}
            />
          )
        })}
      </div>
    </div>
  )
}

const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })

const rootCss = css({
  [WHEN_MOBILE]: {
    display: "block",
    padding: "16px 0px",
  },
  [WHEN_TABLET]: {
    display: "block",
    padding: "16px 16px 16px 16px",
  },
})

const rootDesktopGrid = css(darkModeText, {
  [WHEN_DESKTOP]: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
})

const mobileImageContainer = css({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 80,
  paddingRight: 80,
})
const desktopImageContainer = css({
  display: "flex",
  justifyContent: "center",
  alignContent: "center",
  paddingTop: 20,
})

const toggleContainer = css({
  padding: "0px 20px",
  margin: "0px 10px",
})

const X = 0
const Y = 0
const BLUR = 12
const SHADOW = "rgba(26, 232, 255, 0.85)"

function shadowCss({ x, y, blur, shadow }) {
  return css({
    filter: `drop-shadow(${x}px ${y}px ${blur}px ${SHADOW}) drop-shadow(0px 0px ${
      blur + 8
    }px ${shadow})`,
    margin: "8px 12px",
    padding: "4px 16px",
    minHeight: 64,
    width: "fit-content",
    minWidth: 80,
    alignItems: "center",
    [WHEN_MOBILE]: {
      filter: `drop-shadow(${X}px ${Y}px ${BLUR + 3}px ${SHADOW}) drop-shadow(0px 0px ${
        BLUR * 0.33
      }px ${SHADOW})`,
      margin: "12px 8px",
    },
  })
}

type SecondProps = ToggleBlurbContentType & { toggle?: () => any; expanded?: number; index: number }

export function ToggleBlurbContent(props: SecondProps) {
  const { isMobile, isTablet } = useScreenSize()
  if (isMobile || isTablet) {
    return (
      <div css={rootContainerMobile}>
        <div css={toggleHeader}>
          <div css={toggleContainerTitle}>
            <h1 css={toggleTitle}>{props.title}</h1>
          </div>
          <button onClick={props.toggle} css={buttonCss}>
            <Chevron
              color={colors.white}
              direction={props.expanded === props.index && isMobile ? Direction.up : Direction.down}
            />
          </button>
        </div>
        <div
          style={{
            display:
              props.expanded === props.index && isMobile ? displayToggle.grid : displayToggle.none,
          }}
          css={css(toggleBody)}
        >
          {documentToReactComponents(props.body, { renderNode })}
        </div>
      </div>
    )
  }
  return (
    <div>
      <div css={desktopTitleCss}>{props.title}</div>
      <div css={desktopBodyCss}>{documentToReactComponents(props.body, { renderNode })}</div>
    </div>
  )
}

const rootContainerMobile = css({
  [WHEN_MOBILE]: {
    borderBottom: `1px solid ${colors.grayHeavy}`,
    paddingBottom: 50,
    marginTop: 40,
  },
  [WHEN_TABLET]: {
    borderBottom: `1px solid ${colors.grayHeavy}`,
    paddingBottom: 50,
    marginTop: 40,
  },
})

const toggleHeader = css(flexRow, {
  [WHEN_MOBILE]: {
    justifyContent: "space-between",
    alignItems: "center",
  },
  [WHEN_TABLET]: {
    justifyContent: "space-between",
    alignItems: "center",
  },
})
const toggleContainerTitle = css({
  [WHEN_TABLET]: {
    maxWidth: 376,
    justifyContent: "start",
    alignItems: "center",
  },
})
const toggleTitle = css(fonts.h3, {
  [WHEN_TABLET]: {
    textAlign: "start",
    width: "100%",
  },
})

const toggleBody = css({
  [WHEN_MOBILE]: {
    textAlign: "start",
    lineHeight: 1,
    fontSize: 20,
    paddingTop: 20,
  },
  [WHEN_TABLET]: {
    textAlign: "start",
    lineHeight: 1,
    fontSize: 20,
    paddingTop: 20,
  },
})

const desktopTitleCss = css({
  fontSize: 28,
  marginBottom: 16,
})

const desktopBodyCss = css({
  marginBottom: 56,
})

enum displayToggle {
  grid = "grid",
  none = "none",
}
