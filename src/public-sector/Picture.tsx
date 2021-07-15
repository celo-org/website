import { css } from "@emotion/react"
import { WHEN_TABLET_AND_UP } from "src/estyles"
import { TABLET_BREAKPOINT } from "src/shared/Styles"
import React from "react"
import { PictureType } from "src/utils/contentful"

export default function Picture({
  span,
  desktop,
  mobile,
  cssStyle,
  description,
  objectFit,
}: PictureType) {
  const desktopImage = desktop?.fields?.file
  const mobileImage = mobile?.fields?.file
  const mobileHeight = mobileImage?.details?.image?.height
  const mobileWidth = mobileImage?.details?.image?.width
  const mobileRatio = mobileHeight / mobileWidth

  const desktopHeight = desktopImage?.details?.image?.height
  const desktopWidth = desktopImage?.details?.image?.width
  const desktopRatio = desktopHeight / desktopWidth

  const wrapperCss = React.useMemo(
    () =>
      css(ratioCss, cssStyle, {
        gridColumn: `span ${span}`,
        paddingBottom: `${mobileRatio * 100}%`,
        [WHEN_TABLET_AND_UP]: {
          paddingBottom: `${desktopRatio * 100}%`,
        },
      }),
    [mobileRatio, desktopRatio, span, cssStyle]
  )

  return (
    <div css={wrapperCss}>
      <picture>
        <source media={`(min-width: ${TABLET_BREAKPOINT}px`} srcSet={`${desktopImage?.url}`} />
        <img
          css={css(imageCss, {
            objectFit,
          })}
          loading="lazy"
          width={mobileWidth}
          height={mobileHeight}
          alt={description}
          src={`${mobileImage?.url}`}
        />
      </picture>
    </div>
  )
}

const ratioCss = css({
  height: 0,
  overflow: "hidden",
  position: "relative",
})

const imageCss = css({
  position: "absolute",
  width: "100%",
  height: "100%",
})
