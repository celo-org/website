import * as React from 'react'
import { fonts, whiteText } from "src/estyles"
import { BLOCKS } from '@contentful/rich-text-types'
import { css } from '@emotion/react'

export default {
  [BLOCKS.PARAGRAPH]: (_, children: string) => {
    return <p css={fonts.body}>{children}</p>
  }
}

export const renderWhiteParagraph = {
  [BLOCKS.PARAGRAPH]: (_, children: string) => {
    return <p css={whiteBody}>{children}</p>
  }
}

const whiteBody = css(fonts.body, whiteText)