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
import { PlaylistContentType } from 'src/utils/contentful'
import { useYoutube } from "./useYoutubePlaylist"

export default function PlayList(props: PlaylistContentType) {
  const items = useYoutube(props.listId)
  const {t} = useTranslation(NameSpaces.common)
  return <>
    <Head title={props.title} description={props.description} />
    <Slider>
      {props.media?.map(({fields}) => {
        return <Thumbnail title={fields.title} link={fields.link} image={`https:${fields.image.fields.file.url}`} />
      })}
      {items?.map(item => {
        return <Thumbnail title={item.title} link={item.link} image={item.image} />
      })}
    </Slider>
    <div css={expanderContractorCss}>
      <button css={buttonCss}>
        {t('showAll')}
        <Chevron color={colors.dark} direction={Direction.down} />
      </button>
    </div>
  </>
}

const gap = 24

const rootCss = css({
  display: "grid",
  gridColumn: "span 3",
  columnGap: gap,
  rowGap: 36,
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

const Head = React.memo(function _Head({title, description}: {title: string, description: Document}) {
  return <div css={headCss}>
    <h3 css={fonts.h3}>{title}</h3>
    {documentToReactComponents(description, { renderNode })}
  </div>
})

function useSideways(childCount: number) {

  const lastPause = React.useRef(0)
  const previousPosition = React.useRef(0)
  const childWidth = React.useRef(1)
  const elementRef = React.useRef<HTMLDivElement>(null);

  // this wont work quiet right if window size change cause childen size to change. but how often will that happen on a mobile device?
  React.useLayoutEffect(() => {
    // || 0 so that when no children are rendered it doesnt get upset
    childWidth.current =  (elementRef.current.firstElementChild?.offsetWidth || 0) + gap as number
  }, [childCount])
  const maxDistance = (childWidth.current * (childCount -1.5))

  const {x: delta, state} = useSwipe(elementRef, {});

  let currentPosition = delta + lastPause.current

  // dont allow dragging when we are already past the start
  if (currentPosition > BOUNDARY) {
    currentPosition = BOUNDARY
  } else if (currentPosition < -maxDistance) {
    currentPosition = -maxDistance
  }
  console.log(currentPosition, -maxDistance)

  if (state === 'done') {
    lastPause.current = Math.max(Math.round(previousPosition.current / childWidth.current) * Math.abs(childWidth.current), -maxDistance)
    currentPosition = lastPause.current
  }

  // when moving base off dela from last fixed postion
  // when stop moving set new last fixed postion

  previousPosition.current = isNaN(currentPosition) ? 0 : currentPosition
  return {position: previousPosition.current, swipeRef: elementRef, state}
}

function Slider({children}) {
  const childCount = React.Children.count(children)
  const {swipeRef, position, state} = useSideways(childCount)

  return <div
    ref={swipeRef}
    css={css(sliderCSS, {
      [WHEN_MOBILE]: {
        width: `${childCount}00vw`,
        transitionDuration: state === 'done' ? "300ms" : "1ms",
        transform: `translateX(${position}px)`
      }})}>
      {children}
  </div>
}


const sliderCSS = css(rootCss, {
  [WHEN_MOBILE]: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    transitionProperty: "transform",
  }
})