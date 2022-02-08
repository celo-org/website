import { css, CSSObject } from "@emotion/react"
import { flexRow, WHEN_MOBILE, jost } from "src/estyles"
import { Entry } from "contentful"
import { GalleryItem } from "src/utils/contentful"
import { ContentfulButton } from "src/utils/contentful"
import Button from "src/shared/Button.3"
import { displayedImageSize } from "../displayRetinaImage"

type Item = GalleryItem
interface Props {
  items: Entry<Item | ContentfulButton>[]
  cssStyle?: CSSObject
  mobileCss?: CSSObject
  retina?: 1 | 2
}

export const ROW = {
  row: ({ fields }: Entry<Props>) => (
    <div
      css={css(rootStyle, fields.cssStyle, fields.mobileCss && { [WHEN_MOBILE]: fields.mobileCss })}
    >
      {fields.items.map((entry) => {
        switch (entry.sys.contentType.sys.id) {
          case "button":
            const button = entry.fields as ContentfulButton

            return (
              <Button
                text={button.words}
                href={button.href || button.assetLink?.fields?.file?.url}
                kind={button.kind}
                size={button.size}
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
            const rendered = (
              <div key={entry.sys.id} css={logoContainer}>
                <img
                  alt={imageFields?.description}
                  src={imageFields?.file?.url}
                  width={size.width}
                  height={size.height}
                />
                {item.title ? <p css={logoTitle}>{item.title}</p> : null}
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
  ),
}

const rootStyle = css(flexRow, {
  flexWrap: "wrap",
})

const logoContainer = css(flexRow, {
  alignItems: "center",
})

const logoTitle = css(jost, {
  fontSize: 16,
  fontWeight: 500,
  marginRight: 24,
})
