import * as React from 'react'
import { Content, Tile } from 'src/experience/common/Tile'
import { css } from '@emotion/react'

export const GRID = {
  "grid": ({ fields }) => {
    const numberAcross = fields.by
    const ratio = fields.tileRatio
    return (
      <div css={gridCss}>
        {fields.content.map((content: Content) => (
          <Tile
            key={content.sys.id}
            content={content}
            numberAcross={numberAcross}
            ratio={ratio} />
        ))}
      </div>
    )
  }
}

 const gridCss = css({
  flexWrap: 'wrap',
  flexDirection: 'row',
  marginHorizontal: -10
})