import * as React from "react"
import { css } from "@emotion/react"
import { WHEN_MOBILE, flexRow, fonts } from "src/estyles"
// import { Entry } from "contentful"
import { colors } from "src/colors"
import { ToggleBlurbType, ToggleBlurbContentType } from "src/utils/contentful"
import { renderNode } from "src/contentful/nodes/nodes"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Chevron, { Direction } from "src/icons/chevron"
import { buttonCss } from "./Playlist"

type Props = ToggleBlurbType
export default function ToogleBlurb(props: Props) {
  return (
    <div css={rootCss}>
      <div css={css(props.darkMode && darkModeText)}>
        {props.cards.map(({ fields, sys }) => {
          console.log(fields.cssStyle, "this is cssStyle")
          return (
            <ToggleBlurbContent
              key={sys.id}
              title={fields.title}
              image={fields.image}
              body={fields.body}
              cssStyle={fields.cssStyle}
            />
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

export function ToggleBlurbContent(props: ToggleBlurbContentType) {
  const [expanded, toggleExpansion] = React.useState(false)
  const toggle = () => toggleExpansion((value) => !value)
  return (
    <div css={rootContainer}>
      <div css={toggleHeader}>
        <img
          loading="lazy"
          alt={props.image?.fields?.description}
          src={props.image?.fields.file.url}
        />
        <h1 css={toggleTitle}>{props.title}</h1>
        <button onClick={toggle} css={buttonCss}>
          <Chevron color={colors.white} direction={expanded ? Direction.up : Direction.down} />
        </button>
      </div>
      <div
        style={{
          display: expanded ? "block" : "none",
        }}
        css={toggleBody}
      >
        {documentToReactComponents(props.body, { renderNode })}
      </div>
    </div>
  )
}

const rootContainer = css({
  borderBottom: `1px solid ${colors.grayHeavy}`,
  paddingBottom: 50,
  marginTop: 40,
})

const toggleHeader = css(flexRow, {
  [WHEN_MOBILE]: {
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: "start",
  },
})
const toggleTitle = css(fonts.h5, {
  maxWidth: 197,
  textAlign: "start",
})
const toggleBody = css({
  [WHEN_MOBILE]: {
    maxWidth: 354,
    textAlign: "center",
    lineHeight: 1,
    fontSize: 20,
    marginTop: 34,
  },
})
const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
