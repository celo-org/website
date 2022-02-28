// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import * as React from "react"
import { css } from "@emotion/react"
import { WHEN_MOBILE } from "src/estyles"
import { Entry } from "contentful"
import { ToggleBlurbType, ToggleBlurbContentType } from "src/utils/contentful"
// import { renderNode } from "src/contentful/nodes/nodes"
// import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
type Props = ToggleBlurbType
export default function ToogleBlurb(props: Props) {
  debugger
  return (
    <div css={rootCss}>
      {props.cards.map(({ fields, sys }) => {
        return <ToggleBlurbContent key={sys.id} title={fields.title} />
      })}
    </div>
  )
}

export function ToggleBlurbContent(props: ToggleBlurbContentType) {
  debugger
  const [showMe, setShowMe] = React.useState(false)
  const toggle = () => setShowMe((value) => !value)
  return (
    <>
      <h1>{props.title}</h1>
      <button onClick={toggle}>{showMe ? <h1>open</h1> : <h1>close</h1>}</button>
      <div
        style={{
          display: showMe ? "block" : "none",
        }}
      >
        <p>Testing Testing</p>
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
