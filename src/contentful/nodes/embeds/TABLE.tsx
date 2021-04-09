import { css, CSSObject } from '@emotion/react'
import * as React from 'react'
import { jost, WHEN_MOBILE } from 'src/estyles'
import { colors } from 'src/styles'

interface Props {
  fields: {
    table: {tableData: string[][]}
    cssStyle: CSSObject
    caption?: string
  }
}

export const TABLE = {
  'tableHtml': ({ fields }: Props) => {
    return (
      <div css={rootCss}>
        <table css={css(tableCss,fields.cssStyle)}>
          {fields.caption && <caption css={captionCss}>{fields.caption}</caption>}
          {fields?.table?.tableData?.map((row, index) => {
            if (index === 0) {
              return <tr key={0}>
              {row.map(cell => <th key={cell}>{cell}</th>)}
            </tr>
            }
            return <tr key={index}>
              {row.map(cell => <td key={cell}>{cell}</td>)}
            </tr>
          })}
        </table>
    </div>
    )
  }
}

const rootCss = css({
  width: "100%",
  display: "flex",
  margin: 0,
  [WHEN_MOBILE]: {overflowX: "auto", maxWidth: "calc(100vw - 24px)"}
})

const tableCss = css(jost,{
  width: "100%",
  fontSize: 16,
  marginTop: 24,
  marginBottom: 24,
  marginLeft: 2,
  marginRight: 2,
  "th,td": {
    backgroundColor:colors.faintGray,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: "left"
  },
  [WHEN_MOBILE]: {
    marginTop: 16,
    marginBottom: 16,
  }
})

const captionCss = css({
  padding: 8,
  captionSide: "bottom",
  fontStyle: "italic"
})