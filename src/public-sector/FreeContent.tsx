import { css } from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { flex } from "src/estyles"
import { renderNode } from "src/contentful/nodes/nodes"
import { Document } from "@contentful/rich-text-types"
const OPTIONS = {
  renderNode,
}

interface Props {
  colSpan: number
  body: Document
  cssStyle?: any
  backgroundColor: string
  darkMode: boolean
}

export function FreeContent({ colSpan, body, cssStyle, backgroundColor, darkMode }: Props) {
  return (
    <div css={css(rootCss, { gridColumn: `span ${colSpan}`, backgroundColor })}>
      <div css={css(flex, darkMode && darkModeText, cssStyle)}>
        {documentToReactComponents(body, OPTIONS)}
      </div>
    </div>
  )
}

const rootCss = css(flex, {})

const darkModeText = css({ "h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
