import {css} from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { flex } from "src/estyles"
import { renderNode } from 'src/experience/contentful/nodes'
const OPTIONS = {
  renderNode,
}

export function FreeContent({ colSpan, body, cssStyle, backgroundColor }) {
  return <div css={css(rootCss,{ gridColumn: `span ${colSpan}`, backgroundColor })}>
    <div css={css(flex,cssStyle)}>{documentToReactComponents(body, OPTIONS)}</div>
  </div>
}

const rootCss = css(flex,{})