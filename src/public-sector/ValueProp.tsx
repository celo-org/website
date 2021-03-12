import {css} from '@emotion/react'
import { Asset, Entry } from 'contentful'
import * as React from 'react'
import {ContentfulButton} from "src/utils/contentful"
import {fonts} from "src/estyles"
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
  console.log(props)
  return <>
    <div>
      <img src={props.icon?.fields?.file?.url} css={imageCss} width={100} height={100} />
      <h4 css={headingStyle(props.titleType)}>{props.title}</h4>
      <span css={fonts.body}>{props.description}</span>
    </div>
    {props.link && (
        <Button style={standardStyles.elementalMarginTop} href={props.link.fields.href} text={props.link.fields.words}  kind={props.link.fields.kind}  size={SIZE.normal}/>
      )}
  </>
}

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
      return css(fonts.h3, headingCss)
      case "medium":
        return css(fonts.h3, headingCss)
  }
}
