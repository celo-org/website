import * as React from 'react'
import { fonts } from "src/estyles"
import { BLOCKS } from '@contentful/rich-text-types'

export default {
  [BLOCKS.PARAGRAPH]: (_, children: string) => {
    return <p css={fonts.body}>{children}</p>
  }
}
