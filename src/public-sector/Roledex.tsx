import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import {css} from '@emotion/react'
// import { Asset, Entry } from 'contentful'
import * as React from 'react'
import Button, { SIZE } from 'src/shared/Button.3'
import { fonts } from 'src/estyles'
import {RoledexContentType} from "src/utils/contentful"
// import {flex, fonts} from "src/estyles"
// import Button, { SIZE } from 'src/shared/Button.3'


export default function Roledex(props: RoledexContentType) {
  return <><div css={navCss}>
          <span css={fonts.h4}>{props.title}</span>
          <div>
            {props.sheets.map(sheet => (
              <div>{sheet.fields.title}</div>
            ))}
          </div>
  </div>
  <div css={contentAreaCss}>
    {props.sheets.map(sheet => {
      return <div>
          <h3 css={fonts.h3}>{sheet.fields.heading}</h3>
          {documentToReactComponents(sheet.fields.body)}
          <div css={linksAreaCss}>
            {sheet.fields.buttons?.map(({fields}) =>{
              return <Button size={SIZE.normal} kind={fields.kind} text={fields.words} href={fields.assetLink?.fields?.file?.url || fields.href} />
            })}
          </div>
        </div>
    })}
  </div>
  </>
}



const sharedCSS = css({
    marginTop: 48
})

const navCss = css(sharedCSS,{
})

const contentAreaCss = css(sharedCSS,{
  paddingTop: 48,
  gridColumn: "span 2",
  maxWidth: 600
})

const linksAreaCss = css({
  display: "inline-grid",
  rowGap: 16
})