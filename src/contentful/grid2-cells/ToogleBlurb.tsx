import * as React from "react"
import { css } from "@emotion/react"
import { WHEN_MOBILE } from "src/estyles"
// import { Entry } from "contentful"
import { ToggleBlurbType, ToggleBlurbContentType } from "src/utils/contentful"
import { renderNode } from "src/contentful/nodes/nodes"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
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
            />
          )
        })}
      </div>
    </div>
  )
}

export function ToggleBlurbContent(props: ToggleBlurbContentType) {
  debugger
  const [showMe, setShowMe] = React.useState(false)
  const toggle = () => setShowMe((value) => !value)
  return (
    <>
      <img
        loading="lazy"
        alt={props.image?.fields?.description}
        src={props.image?.fields.file.url}
      />
      <h1>{props.title}</h1>
      <button onClick={toggle}>{showMe ? <h1>open</h1> : <h1>close</h1>}</button>
      <div
        style={{
          display: showMe ? "block" : "none",
        }}
      >
        {documentToReactComponents(props.body, { renderNode })}
      </div>
    </>
  )
}

const rootCss = css({
  border: "3px solid green",
  display: "none",
  [WHEN_MOBILE]: {
    display: "block",
  },
})
const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
