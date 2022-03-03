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
  return (
    <div css={rootCss}>
      <div css={css(props.darkMode && darkModeText)}>
        {props.cards.map(({ fields, sys }) => {
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
        <div css={toggleContainerTitle}>
          <h1 css={toggleTitle}>{props.title}</h1>
        </div>
        <button onClick={toggle} css={buttonCss}>
          <Chevron color={colors.white} direction={expanded ? Direction.up : Direction.down} />
        </button>
      </div>
      <div
        style={{
          display: expanded ? "grid" : "none",
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
    maxWidth: 200,
    justifyContent: "start",
    alignItems: "center",
  },
})
const toggleTitle = css(fonts.h5, {
  [WHEN_MOBILE]: {
    textAlign: "start",
    width: "100%",
    paddingLeft: 15,
    paddingRight: 34,
  },
})
const toggleBody = css({
  [WHEN_MOBILE]: {
    textAlign: "center",
    lineHeight: 1,
    fontSize: 20,
    paddingTop: 34,
  },
})
const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
