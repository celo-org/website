import {css} from '@emotion/react'
import { Asset, Entry } from 'contentful'
import * as React from 'react'
import {ContentfulButton} from "src/utils/contentful"
import {flex, fonts} from "src/estyles"
import Button, { SIZE } from 'src/shared/Button.3'
import { standardStyles } from 'src/styles'

enum Headings {
  "large" = 'large',
  "medium" = 'medium',
  "small" = 'small',
}

export interface Props {
  icon?: Asset
  title:string
  titleType?: Headings
  description: string
  link?: Entry<ContentfulButton>
}

export default function ValueProp(props: Props) {
  return <div css={rootCss}>
    <div css={containerCss}>
      <img src={props.icon?.fields?.file?.url} css={imageCss} width={100} height={100} />
      <h4 css={headingStyle(props.titleType)}>{props.title}</h4>
      <span css={fonts.body}>{props.description}</span>
    </div>
    {props.link && (
        <Button style={standardStyles.elementalMarginTop} href={props.link.fields.href} text={props.link.fields.words}  kind={props.link.fields.kind}  size={SIZE.normal}/>
      )}
  </div>
}

const rootCss = css (flex,{
  flex: 1,
  justifyContent: "space-between",
  backgroundColor: "pink",
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
  marginBottom  : 12  ,
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
