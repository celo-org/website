import * as React from "react"
import { Cell, GridRow, Spans } from "src/layout/Grid2"
import { fonts, standardStyles } from "src/estyles"

interface SectionProps {
  title: string
  text?: string | React.ReactNode
  children?: React.ReactNode
  span?: Spans
  nativeID?: string
}

function SideTitledSection({ title, text, children, span, nativeID }: SectionProps) {
  return (
    <GridRow columns={4} css={standardStyles.elementalMargin} id={nativeID}>
      <Cell span={Spans.one}>
        <h3 css={fonts.h3}>{title}</h3>
      </Cell>
      <Cell span={span || Spans.two}>
        <p css={fonts.body}>{text}</p>
        {children}
      </Cell>
    </GridRow>
  )
}

export default React.memo(SideTitledSection)
