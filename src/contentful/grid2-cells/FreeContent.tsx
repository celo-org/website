import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { flex } from "src/estyles"
import { renderNode } from "src/contentful/nodes/nodes"
import { BLOCKS, INLINES, Block, Document } from "@contentful/rich-text-types"
import { BUTTON } from "src/contentful/nodes/embeds/BUTTON"
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY"

const EMBEDDABLE = {
  ...BUTTON,
  ...GALLARY,
}

function embedded(node: Block) {
  const contentType = node.data?.target?.sys?.contentType?.sys?.id
  const renderer = EMBEDDABLE[contentType]

  if (renderer) {
    return renderer(node.data.target)
  } else {
    console.info(contentType)
    return null
  }
}

const OPTIONS = {
  renderNode: {
    ...renderNode,
    [BLOCKS.EMBEDDED_ENTRY]: embedded,
    [INLINES.EMBEDDED_ENTRY]: embedded,
  },
}

interface Props {
  colSpan: number
  body: Document
  cssStyle: any
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

const rootCss = css(flex, {
  maxWidth: "calc(100vw - 16px)",
  a: {
    marginTop: 16,
  },
  "h2:first-of-type": {
    marginTop: 8,
  },
})

const darkModeText = css({ "h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
