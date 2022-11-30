import { css, CSSObject } from "@emotion/react"
import { flexRow, WHEN_MOBILE, jost } from "src/estyles"
import { Entry } from "contentful"
import { GalleryItem } from "src/utils/contentful"
import { ContentfulButton } from "src/utils/contentful"
import Button from "src/shared/Button.4"
import { displayedImageSize } from "../displayRetinaImage"
import { useScreenSize } from "src/layout/ScreenSize"
import { colors } from "../../../colors"
import { useState } from "react"
import AnimatedCubes from "../../../reskin/AnimatedCubes"

type Item = GalleryItem
interface Props {
  items: Entry<Item | ContentfulButton>[]
  cssStyle?: CSSObject
  mobileCss?: CSSObject
  retina?: 1 | 2
}

export const ROW = {
  row: ({ fields }: Entry<Props>) => {
    const itemsCount = fields.items.length
    if (fields.name === "cico apps") {
      return <AnimatedCubes fields={fields} />
    }
    return (
      <div
        css={css(
          rootStyle,
          fields.cssStyle,
          fields.mobileCss && { [WHEN_MOBILE]: fields.mobileCss }
        )}
      >
        {fields.items.map((entry, index) => {
          switch (entry.sys.contentType.sys.id) {
            case "button":
              const button = entry.fields as ContentfulButton
              const { isMobile } = useScreenSize()
              return (
                <Button
                  text={button.words}
                  href={button.href || button.assetLink?.fields?.file?.url}
                  kind={button.kind}
                  size={isMobile && button.mobileSize ? button.mobileSize : button.size}
                  align={button.align}
                  iconLeft={button.iconLeft ? <img src={button.iconLeft.fields.file.url} /> : null}
                  target={
                    button.assetLink?.fields?.file?.url ||
                    (button.href?.startsWith("http") && "_blank")
                  }
                />
              )

            case "logoGalleryItem":
              const item = entry.fields as Item
              const imageFields = item?.image?.fields
              const size = displayedImageSize(item.image, fields.retina)
              const [rotationAngle, setRotationAngle] = useState("0deg")
              // setTimeout(() => {
              //   setRotationAngle(rotationAngle === '0deg' ? '-90deg' : '0deg')
              // }, 3000)
              const rendered = (
                <div key={entry.sys.id} css={logoContainer}>
                  <div css={css(box, { transform: `rotateY(${rotationAngle})` })}>
                    <div css={css(face, front)}>
                      <img
                        alt={imageFields?.description}
                        src={imageFields?.file?.url}
                        width={size.width}
                        height={size.height}
                      />
                      {item.title ? <p css={logoTitle}>{item.title}</p> : null}
                    </div>
                    <div css={css(face, side)}>
                      <img
                        alt={imageFields?.description}
                        src={imageFields?.file?.url}
                        width={size.width}
                        height={size.height}
                      />
                    </div>
                  </div>
                </div>
              )

              if (item.url) {
                return (
                  <a href={item.url} rel="noreferrer">
                    {rendered}
                  </a>
                )
              }
              return rendered
          }
        })}
      </div>
    )
  },
}

const rootStyle = css(flexRow, {
  flexWrap: "wrap",
})

const logoTitle = css(jost, {
  fontSize: 16,
  fontWeight: 500,
  marginRight: 24,
})

const logoContainer = css({
  perspective: 700,
  alignItems: "center",
  justifyContent: "center",
})

const box = css({
  width: 300,
  height: 300,
  position: "relative",
  transition: "all 0.4s ease-out",
  transformStyle: "preserve-3d",
  transformOrigin: "150px 150px -150px",
})

const face = css(flexRow, {
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  width: "100%",
  height: "100%",
  border: `1px solid ${colors.black}`,
})

const front = css({
  backgroundColor: colors.baseTan,
})

const side = css({
  zIndex: 1,
  left: 150,
  transform: "rotateY(90deg) translateX(150px)",
  backgroundColor: colors.baseTan,
})
