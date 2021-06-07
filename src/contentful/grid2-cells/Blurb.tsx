import { css } from "@emotion/react"
import { Asset, Entry } from "contentful"
import * as React from "react"
import { ContentfulButton } from "src/utils/contentful"
import { flex, fonts, WHEN_MOBILE, whiteText } from "src/estyles"
import Button, { SIZE } from "src/shared/Button.3"
import { standardStyles } from "src/styles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import renderNode, { renderWhiteParagraph } from "src/contentful/nodes/paragraph"
enum Headings {
  "large" = "large",
  "medium" = "medium",
  "small" = "small",
}

export interface Props {
  icon?: Asset
  title: string
  titleType?: Headings
  body: Document
  link?: Entry<ContentfulButton>
  darkMode?: boolean
}

export default function Blurb(props: Props) {
  return (
    <div css={rootCss}>
      <div css={containerCss}>
        <img src={props.icon?.fields?.file?.url} css={imageCss} width={100} height={100} />
        <h4 css={headingStyle(props.titleType, props.darkMode)}>{props.title}</h4>
        {documentToReactComponents(props.body, {
          renderNode: props.darkMode ? renderWhiteParagraph : renderNode,
        })}
      </div>
      {props.link && (
        <Button
          style={standardStyles.elementalMarginTop}
          href={props.link.fields.href}
          text={props.link.fields.words}
          kind={props.link.fields.kind}
          size={SIZE.normal}
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
  },
})

const imageCss = css({
  width: 100,
  height: 100,
})

const headingCss = css({
  marginTop: 16,
  marginBottom: 12,
})

function headingStyle(type: Headings, darkMode: boolean) {
  switch (type) {
    case "large":
      return css(fonts.h4, headingCss, darkMode && whiteText)
    case "small":
      return css(fonts.h5, headingCss, darkMode && whiteText)
    default:
      return css(fonts.h3, headingCss, darkMode && whiteText)
  }
}
