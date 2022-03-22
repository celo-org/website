import * as React from "react"
import { css } from "@emotion/react"
import { WHEN_MOBILE, flexRow, fonts } from "src/estyles"
import { colors } from "src/colors"
import { ToggleBlurbType, ToggleBlurbContentType } from "src/utils/contentful"
import { renderNode } from "src/contentful/nodes/nodes"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Chevron, { Direction } from "src/icons/chevron"
import { buttonCss } from "./Playlist"

type Props = ToggleBlurbType
export default function ToogleBlurb(props: Props) {
  const [expandedIndex, setBlurbIndex] = React.useState(null)
  const toggle = (num: number) => (expandedIndex === num ? setBlurbIndex(null) : setBlurbIndex(num))
  console.log("change")
  return (
    <div css={rootCss}>
      <div css={css(props.darkMode && darkModeText)}>
        {props.cards.map(({ fields, sys }, index) => {
          return (
            <>
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
            </>
          )
        })}
      </div>
    </div>
  )
}

const rootCss = css({
  display: "none",
  [WHEN_MOBILE]: {
    display: "block",
    padding: "16px 16px 16px 16px",
  },
})

type SecondProps = ToggleBlurbContentType & { toggle?: () => any; expanded?: number; index: number }

export function ToggleBlurbContent(props: SecondProps) {
  return (
    <div css={rootContainer}>
      <div css={toggleHeader}>
        <div css={toggleContainerTitle}>
          <h1 css={toggleTitle}>{props.title}</h1>
        </div>
        <button onClick={props.toggle} css={buttonCss}>
          <Chevron
            color={colors.white}
            direction={props.expanded === props.index ? Direction.up : Direction.down}
          />
        </button>
      </div>
      <div
        style={{
          display: props.expanded === props.index ? displayToggle.grid : displayToggle.none,
        }}
        css={css(toggleBody, props.cssStyle)}
      >
        {documentToReactComponents(props.body, { renderNode })}
      </div>
    </div>
  )
}

const rootContainer = css({
  borderBottom: `1px solid ${colors.grayHeavy}`,
  [WHEN_MOBILE]: {
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

const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
