import { css } from "@emotion/react"
import { Asset, Entry } from "contentful"
import * as React from "react"
import { ContentfulButton } from "src/utils/contentful"
import { flex, fonts, WHEN_MOBILE, whiteText } from "src/estyles"
import Button, { SIZE } from "src/shared/Button.4"
import { standardStyles } from "src/estyles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document, BLOCKS, Block } from "@contentful/rich-text-types"
import renderNode, { renderWhiteParagraph } from "src/contentful/nodes/paragraph"
import { ROW } from "src/contentful/nodes/embeds/ROW"
import Image from "next/image"
import { displayedImageSize } from "../nodes/displayRetinaImage"
import { useScreenSize } from "src/layout/ScreenSize"

enum Headings {
  "large" = "large",
  "medium" = "medium",
  "small" = "small",
  "plain" = "plain",
}

enum AlignProperty {
  "center" = "center",
  "left" = "left",
  "right" = "right",
}
export interface Props {
  icon?: Asset
  title: string
  titleType?: Headings
  alignProperty?: AlignProperty
  body: Document
  link?: Entry<ContentfulButton>
  darkMode?: boolean
  isNaturalSize: boolean
  newIcon: boolean
  retina?: 1 | 2
}

function embedded(node: Block) {
  const contentType = node.data?.target?.sys?.contentType?.sys?.id
  const renderer = ROW[contentType]

  if (renderer) {
    return renderer(node.data.target)
  } else {
    return null
  }
}

const embeddable = { [BLOCKS.EMBEDDED_ENTRY]: embedded }

const renderWhiteParagraphWithRow = { ...renderWhiteParagraph, ...embeddable }

const renderParagraphWithRow = { ...renderNode, ...embeddable }
export default function Blurb(props: Props) {
  console.log(props.alignProperty, "this is alignProperty")
  const image = props.icon?.fields?.file
  const imageURL = image?.url
  const displayedSize = displayedImageSize(props.icon, props.retina)
  const width = props.isNaturalSize ? displayedSize.width : props.newIcon ? 48 : 100
  const height = props.isNaturalSize ? displayedSize.height : props.newIcon ? 48 : 100
  const { isMobile } = useScreenSize()

  return (
    <div css={rootCss}>
      <div css={containerCss && alignPropStyle(props.alignProperty)}>
        {imageURL && (
          <div css={imageMargin}>
            <Image
              unoptimized={true}
              layout={props.isNaturalSize ? "intrinsic" : "fixed"}
              src={`https:${imageURL}`}
              width={width}
              height={height}
              alt=""
              css={props.isNaturalSize ? {} : fixedSizeCss}
            />
          </div>
        )}
        {props.title && <h4 css={headingStyle(props.titleType, props.darkMode)}>{props.title}</h4>}
        {documentToReactComponents(props.body, {
          renderNode: props.darkMode ? renderWhiteParagraphWithRow : renderParagraphWithRow,
        })}
      </div>
      {props.link && (
        <Button
          key={props.link.sys.id}
          cssStyle={standardStyles.elementalMarginTop}
          href={props.link.fields.href || props.link.fields.assetLink?.fields?.file?.url}
          text={props.link.fields.words}
          kind={props.link.fields.kind}
          size={
            isMobile && props.link.fields.mobileSize ? props.link.fields.mobileSize : SIZE.normal
          }
          iconLeft={
            props.link.fields.iconLeft ? (
              <img src={props.link.fields.iconLeft.fields.file.url} />
            ) : null
          }
          target={
            props.link.fields.assetLink?.fields?.file?.url ||
            (props.link.fields.href?.startsWith("http") && "_blank")
          }
        />
      )}
    </div>
  )
}

const rootCss = css(flex, {
  flex: 1,
  justifyContent: "space-between",
  marginBottom: 36,
  [WHEN_MOBILE]: {
    alignItems: "center",
    alignContent: "center",
  },
})

const containerCss = css(flex, {
  flex: 1,
  "p:first-of-type": {
    marginTop: 0,
  },
  "p:last-of-type": {
    marginBottom: 0,
  },
  [WHEN_MOBILE]: {
    alignItems: "center",
    alignContent: "center",
    textAlign: "center",
    maxWidth: 288,
    li: {
      listStyle: "none",
    },
    ul: {
      marginBlockStart: 0,
      marginBlockEnd: 0,
      marginInlineStart: 0,
      marginInlinEend: 0,
      paddingInlineStart: 0,
    },
  },
})

const fixedSizeCss = css({
  width: 100,
  height: 100,
})

const headingCss = css({
  marginTop: 16,
  marginBottom: 12,
})

const imageMargin = css({
  marginBottom: 40,
  marginTop: 40,
})

function headingStyle(type: Headings, darkMode: boolean) {
  switch (type) {
    case "large":
      return css(fonts.h4, headingCss, darkMode && whiteText)
    case "small":
      return css(fonts.h5, headingCss, darkMode && whiteText)
    case "plain":
      return css(fonts.body, { fontWeight: "normal" }, headingCss, darkMode && whiteText)
    default:
      return css(fonts.h3, headingCss, darkMode && whiteText)
  }
}
function alignPropStyle(type: AlignProperty) {
  switch (type) {
    case "center":
      return css({
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
      })
    case "left":
      return css({ alignItems: "start", alignContent: "start", textAlign: "start" })
    case "right":
      return css({ alignItems: "end", alignContent: "end", textAlign: "end" })
    default:
      return css({ alignItems: "start" })
  }
}
