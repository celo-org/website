/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import * as React from 'react'
import { flex, WHEN_DESKTOP, WHEN_TABLET } from "src/estyles"

interface GridProps {
  id?: string
  className?: string
  children: React.ReactNode
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
  return (
      <div id={props.id} css={rootCss} className={props.className}>
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
    [WHEN_TABLET] : {
      alignSelf: 'center',
      flexDirection: 'row',
      paddingRight: gap,
      paddingLeft: gap,
      width: '100%',
      maxWidth: 958 + gap
    },
    [WHEN_DESKTOP] : {
      alignSelf: 'center',
      flexDirection: 'row',
      width: '100%',
      maxWidth: 1080 + gap,
    }
})

interface CellProps {
  children: React.ReactNode
  span: Spans
  tabletSpan?: Spans
  mobileSpan?: Spans
  className?: string
}

const cellStyle = {
  base: { padding: gap / 2, flexGrow: 0, flexShrink: 0 },
  fourth: { width: '25%' },
  third: { width: '33.333%' },
  twoThird: { width: '66.666%' },
  half: { width: '50%' },
  three4th: { width: '75%' },
  full: { flexBasis: '100%', width: '100%' },
  mobile: { width: '100%' },
}


export function Cell(props: CellProps) {
  const cellCss = React.useMemo(() => css(cellStyle.base, cellStyle.mobile, cellStyle[props.mobileSpan],
    {
      [WHEN_TABLET]: {
          ...cellStyle[props.span],
          ...cellStyle[props.tabletSpan]
      },
      [WHEN_DESKTOP]: {
        ...cellStyle[props.span]
      }
    }
  ), [props.mobileSpan, props.span, props.tabletSpan])

  return (
      <div css={cellCss} className={props.className}>
        {props.children}
      </div>
  )
}

