import { css } from "@emotion/react"
import { WHEN_MOBILE } from "src/estyles"
import { ToggleBlurbType, ToggleBlurbContentType } from "src/utils/contentful"

export default function ToogleBlurb(props: ToggleBlurbType) {
  return (
    <div css={rootCss}>
      {props.cards.map(({ fields, sys }) => {
        ;<ToggleBlurbContent
          key={sys.id}
          title={fields.title}
          heading={fields.heading}
          body={fields.body}
          image={fields.image}
        />
      })}
    </div>
  )
}

export function ToggleBlurbContent(props: ToggleBlurbContentType) {
  debugger
  return (
    <div>
      <h4>{props.title}</h4>
    </div>
  )
}

const rootCss = css({
  [WHEN_MOBILE]: {
    alignItems: "center",
    alignContent: "center",
  },
})
