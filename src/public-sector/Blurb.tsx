import {css} from '@emotion/react'
import { Asset, Entry, } from 'contentful'
import * as React from 'react'
import {ContentfulButton} from "src/utils/contentful"
import {flex, fonts} from "src/estyles"
import Button, { SIZE } from 'src/shared/Button.3'
import { standardStyles } from 'src/styles'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { BLOCKS } from '@contentful/rich-text-types'

enum Headings {
  "large" = 'large',
  "medium" = 'medium',
  "small" = 'small',
}

export interface Props {
  icon?: Asset
  title:string
  titleType?: Headings
  body: Document
  link?: Entry<ContentfulButton>
}

export default function Blurb(props: Props) {
  return <div css={rootCss}>
    <div css={containerCss}>
      <img src={props.icon?.fields?.file?.url} css={imageCss} width={100} height={100} />
      <h4 css={headingStyle(props.titleType)}>{props.title}</h4>
      {documentToReactComponents(props.body, {renderNode})}
    </div>
    {props.link && (
        <Button style={standardStyles.elementalMarginTop} href={props.link.fields.href} text={props.link.fields.words}  kind={props.link.fields.kind}  size={SIZE.normal}/>
      )}
  </div>
}

const rootCss = css (flex,{
  flex: 1,
  justifyContent: "space-between",
  marginBottom: 36
})

const containerCss = css(flex, {
  flex: 1
})

const imageCss =css({
  width: 100,
  height: 100
})

const headingCss = css({
  marginTop: 16,
  marginBottom: 12,
})

function headingStyle(type: Headings) {
  switch (type)  {
    case "large":
      return css(fonts.h4, headingCss)
    case "small":
      return css(fonts.h5, headingCss)
    default:
      return css(fonts.h3, headingCss)
  }
}


const renderNode = {
  [BLOCKS.PARAGRAPH]: (_, children: string) => {
    return <p css={bodyCss}>{children}</p>
  },
}
const bodyCss = css(fonts.body, {
  "&:first-of-type": {
    marginTop: 0
  },
  "&:last-of-type": {
    marginBottom: 0
  }
})