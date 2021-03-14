import {css} from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { flex } from "src/estyles"
import { renderNode } from 'src/experience/contentful/nodes'
const OPTIONS = {
  renderNode,
}
// TODO cssStyle instead of individual properties?
// TODO document to react components needs to render properly styled h* components
export function FreeContent({ colSpan, body, maxWidth, align }) {
  return <div css={css(rootCss,{ gridColumn: `span ${colSpan}` })}>
    <div css={css(flex,{maxWidth, alignSelf: align, textAlign: align})}>{documentToReactComponents(body, OPTIONS)}</div>
  </div>
}

const rootCss = css(flex,{

})