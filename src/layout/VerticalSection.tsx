import * as React from 'react'
import { ViewStyle } from 'react-native'
import { H3 } from 'src/fonts/Fonts'
import { Cell, GridRow, Spans } from 'src/layout/GridRow'

interface VerticalProps {
  title: string
  children?: React.ReactNode
  span?: Spans
  style?: ViewStyle
  headerStyle?: any
  nativeID?: string
}

function VerticalSection({ title, children, span = Spans.full, style, headerStyle, nativeID }: VerticalProps) {
  return (
    <>
      <GridRow nativeID={nativeID && `firstRow/${nativeID}`}>
        <Cell style={style} span={span}>
          <H3 style={[style, headerStyle]}>{title}</H3>
        </Cell>
      </GridRow>
      <GridRow nativeID={nativeID && `secondRow/${nativeID}`}>
        <Cell span={span} style={style}>{children}</Cell>
      </GridRow>
    </>
  )
}

export default React.memo(VerticalSection)
