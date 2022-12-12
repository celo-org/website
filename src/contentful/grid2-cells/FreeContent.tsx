import { css, CSSObject } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { flex, fonts, WHEN_MOBILE } from "src/estyles"
import renderNode from "src/contentful/nodes/enodes"
import { BLOCKS, INLINES, Block, Document } from "@contentful/rich-text-types"
import { BUTTON } from "src/contentful/nodes/embeds/BUTTON"
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY"
import { ROW } from "../nodes/embeds/ROW"
import { Asset } from "contentful"
import AwesomeFade from "src/shared/AwesomeFade"
import { FaddingOptions } from "src/utils/contentful"
import { colors } from "src/colors"

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
    [BLOCKS.HEADING_4]: (_, children: string) => {
      return <h4 css={h4Css}>{children}</h4>
    },
    [BLOCKS.EMBEDDED_ENTRY]: embedded,
    [INLINES.EMBEDDED_ENTRY]: embedded,
  },
}

const h1ResponsiveCss = css(fonts.h1, {
  color: colors.white,
  [WHEN_MOBILE]: css(fonts.h1Mobile, { color: colors.white }),
})
const h4Css = css(fonts.h4, { color: "rgba(255, 255, 255, 0.6)", fontSize: 20, marginBottom: 40 })
interface Props {
  colSpan: number
  rowSpan?: number
  body: Document
  cssStyle?: CSSObject
  darkMode: boolean
  listStyleImage?: Asset
  fadingEffect?: boolean
  fade?: FaddingOptions
}

export function FreeContent({
  colSpan,
  rowSpan,
  body,
  cssStyle,
  listStyleImage,
  fade,
  fadingEffect,
}: Props) {
  const customBullets = listStyleImage
    ? {
        ul: {
          listStyleImage: `url(${listStyleImage.fields.file.url})`,
        },
      }
    : null

  return (
    <div
      css={css(
        rootCss,
        { gridColumn: `span ${colSpan}` },
        rowSpan && { gridRow: `span ${rowSpan}` }
      )}
    >
      {!fadingEffect ? (
        <div css={css(flex, cssStyle, customBullets)}>
          {documentToReactComponents(body, OPTIONS)}
        </div>
      ) : (
        <AwesomeFade
          delay={fade.delay}
          duration={fade.duration}
          direction={fade.direction}
          distance={fade.distance}
          reverse={false}
          triggerOnce={true}
        >
          <div css={css(flex, cssStyle, customBullets)}>
            {documentToReactComponents(body, OPTIONS)}
          </div>
        </AwesomeFade>
      )}
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
  ul: { paddingInlineStart: 16 },
})
