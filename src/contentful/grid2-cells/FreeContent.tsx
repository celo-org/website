import { css, CSSObject } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { flex, fonts, WHEN_MOBILE } from "src/estyles"
import renderNode from "src/contentful/nodes/enodes"
import { BLOCKS, INLINES, Block, Document } from "@contentful/rich-text-types"
import { BUTTON } from "src/contentful/nodes/embeds/BUTTON"
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY"
import { ROW } from "../nodes/embeds/ROW"
import { Asset } from "contentful"

const EMBEDDABLE = {
  ...BUTTON,
  ...GALLARY,
  ...ROW,
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
    [BLOCKS.HEADING_1]: (_, children: string) => {
      return <h2 css={h1ResponsiveCss}>{children}</h2>
    },
    [BLOCKS.EMBEDDED_ENTRY]: embedded,
    [INLINES.EMBEDDED_ENTRY]: embedded,
  },
}

const h1ResponsiveCss = css(fonts.h1, { [WHEN_MOBILE]: fonts.h1Mobile })
interface Props {
  colSpan: number
  body: Document
  cssStyle?: CSSObject
  darkMode: boolean
  listStyleImage?: Asset
}

export function FreeContent({ colSpan, body, cssStyle, darkMode, listStyleImage }: Props) {
  const customBullets = listStyleImage
    ? {
        ul: {
          listStyleImage: `url(${listStyleImage.fields.file.url})`,
        },
      }
    : null

  return (
    <div css={css(rootCss, { gridColumn: `span ${colSpan}` })}>
      <div css={css(flex, darkMode && darkModeText, cssStyle, customBullets)}>
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

const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
