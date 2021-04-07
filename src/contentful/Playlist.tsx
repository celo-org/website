import Thumbnail from "./Thumbnail"
import { Document } from '@contentful/rich-text-types'
import { flexRow, fonts, WHEN_MOBILE } from "src/estyles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { css } from "@emotion/react"
import { NameSpaces, useTranslation } from "src/i18n"
import renderNode from "src/contentful/nodes/paragraph"
import Chevron, { Direction } from 'src/icons/chevron'
import { colors } from "src/styles"
import * as React from "react"
import useSwipe from '@odnh/use-swipe';


interface Props {
  title: string
  description: Document
  listId: string
}



export default function PlayList(props: Props) {

  const {t} = useTranslation(NameSpaces.common)
  return <>
    <div css={headCss}>
      <h3 css={fonts.h3}>{props.title}</h3>
      {documentToReactComponents(props.description, {renderNode})}
    </div>
    <Slider>
      <Thumbnail title={"Systems"} link="/" image={"/images/marketplace-icons/icon-celo-CELO-color-f.svg"} />
      <Thumbnail title={"Instiutions"} link="/" image={"/images/marketplace-icons/icon-celo-CELO-color-f.svg"} />
      <Thumbnail title={"Goverance"} link="/" image={"/images/marketplace-icons/icon-celo-CELO-color-f.svg"} />
    </Slider>
    <div css={expanderContractorCss}>
      <button css={buttonCss}>
        {t('showAll')}
        <Chevron color={colors.dark} direction={Direction.down} />
      </button>
    </div>
  </>
}

const rootCss = css({
  display: "grid",
  gridColumn: "span 3",
  columnGap: 24,
  gridTemplateColumns: "1fr 1fr 1fr",
})

const buttonCss = css(fonts.navigation, {
  background: "none",
  border: "none",
  display: "inline-flex",
  alignItems: "center",
  svg: {
    marginLeft: 8
  }
})

const headCss = css({
  gridColumn: "span 3",
  maxWidth: 480,
  width: "calc(100vw - 24px)"
})

const expanderContractorCss = css(flexRow,{
  maxWidth: "100vw",
  gridColumn: "span 3",
  justifyContent: "center",
  marginTop: 40,
  [WHEN_MOBILE]: {
    display: "none"
  }
})

const BOUNDARY = 15

function useSideways(childCount: number) {

  const lastPause = React.useRef(0)
  const previousPosition = React.useRef(0)
  const childWidth = React.useRef(1)
  const elementRef = React.useRef<HTMLDivElement>(null);
  // this wont work quiet right if window size changes. but how often will that happen on a mobile device?
  React.useLayoutEffect(() => {
    childWidth.current = elementRef.current.firstElementChild.offsetWidth as number
  }, [])
  const maxDistance = (childWidth.current * (childCount -1) + BOUNDARY)

  const {x: delta, state} = useSwipe(elementRef, {});

  let currentPosition = delta + lastPause.current

  // dont allow dragging when we are already past the start
  if (currentPosition > BOUNDARY) {
    currentPosition = BOUNDARY
  } else if (currentPosition < -maxDistance) {
    currentPosition = -maxDistance
  }

  if (state === 'done') {
    lastPause.current = Math.max(Math.round(previousPosition.current / childWidth.current) * Math.abs(childWidth.current), -maxDistance)
    currentPosition = lastPause.current
  }

  // when moving base off dela from last fixed postion
  // when stop moving set new last fixed postion

  previousPosition.current = currentPosition
  return {position: currentPosition, swipeRef: elementRef, state}
}

function Slider({children}) {
  const {swipeRef, position, state} = useSideways(React.Children.count(children))

  return <div
    ref={swipeRef}
    css={css(sliderCSS, {
      [WHEN_MOBILE]: {
        transitionDuration: state === 'done' ? "300ms" : "1ms",
        transform: `translateX(${position}px)`
      }})}>
      {children}
  </div>
}


const sliderCSS = css(rootCss, {
  [WHEN_MOBILE]: {
    display: "flex",
    flexDirection: "row",
    width: "300vw",
    overflow: "hidden",
    transitionProperty: "transform",
  }
})