import { css} from "@emotion/react"
import * as React from 'react'
import { flex, WHEN_DESKTOP, WHEN_TABLET } from "src/estyles"

interface GridProps {
  columns: 1 | 2 | 3 | 4
  id?: string
  className?: string
  children: React.ReactNode
  darkMode?: boolean
}

const gap = 24.0

export enum Spans {
  fourth = 'fourth',
  third = 'third',
  twoThird = 'twoThird',
  half = 'half',
  three4th = 'three4th',
  full = 'full',
}

export function GridRow(props: GridProps) {
  const gridTemplateColumns = "1fr ".repeat(props.columns)
  const mainCss = css(rootCss, {
    [WHEN_DESKTOP]: {gridTemplateColumns},
    [WHEN_TABLET]: {gridTemplateColumns}
  })
  return (
      <div id={props.id} css={mainCss} className={props.className}>
        {props.children}
      </div>
  )
}


const rootCss = css(flex,{
    alignSelf: 'center',
    flexDirection: 'column',
    paddingLeft: gap / 2,
    paddingRight: gap / 2,
    width: '100%',
    maxWidth: '100vw',
    flexWrap: "wrap",
    columnGap: `${gap}px`,
    [WHEN_TABLET] : {
      display: "grid",
      gridAutoRows: "auto",
      alignSelf: 'center',
      flexDirection: 'row',
      paddingRight: gap,
      paddingLeft: gap,
      width: '100%',
      maxWidth: 958 + gap
    },
    [WHEN_DESKTOP] : {
      display: "grid",
      gridAutoRows: "auto",
      alignSelf: 'center',
      width: '100%',
      maxWidth: 1080 + gap,
    }
})
