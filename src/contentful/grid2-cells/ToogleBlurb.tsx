import * as React from "react"
import { css } from "@emotion/react"
import { WHEN_MOBILE, WHEN_DESKTOP, flexRow, fonts } from "src/estyles"
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
  const { isMobile } = useScreenSize()
  if (isMobile) {
    return (
      <div css={rootCss}>
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
      <div>
        {props.cards.slice(0, 4).map(({ fields, sys }, index) => {
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
      <div>Hello world</div>
      <div>
        {props.cards.slice(4, 8).map(({ fields, sys }, index) => {
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

const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })

const rootCss = css({
  [WHEN_MOBILE]: {
    display: "block",
    padding: "16px 16px 16px 16px",
  },
})

const rootDesktopGrid = css(darkModeText, {
  [WHEN_DESKTOP]: {
    border: "1px solid white",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
  },
})

type SecondProps = ToggleBlurbContentType & { toggle?: () => any; expanded?: number; index: number }

export function ToggleBlurbContent(props: SecondProps) {
  const { isMobile } = useScreenSize()
  if (isMobile) {
    return (
      <div css={rootContainer}>
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
      <div>{props.title}</div>
      <div>{documentToReactComponents(props.body, { renderNode })}</div>
    </div>
  )
}

const rootContainer = css({
  [WHEN_MOBILE]: {
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
})
const toggleContainerTitle = css({
  [WHEN_MOBILE]: {
    maxWidth: 376,
    justifyContent: "start",
    alignItems: "center",
  },
})
const toggleTitle = css(fonts.h3, {
  [WHEN_MOBILE]: {
    textAlign: "start",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 34,
  },
})

const toggleBody = css({
  [WHEN_MOBILE]: {
    textAlign: "start",
    lineHeight: 1,
    fontSize: 20,
    paddingTop: 20,
  },
})

enum displayToggle {
  grid = "grid",
  none = "none",
}
