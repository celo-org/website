import { css, CSSObject } from "@emotion/react"
import { flexRow, WHEN_MOBILE, jost } from "src/estyles"
import { Entry } from "contentful"
import { GalleryItem } from "src/utils/contentful"
import { Props as ButtonShape } from "src/contentful/nodes/embeds/BUTTON"
import Button from "src/shared/Button.3"

type Item = GalleryItem
interface Props {
  items: Entry<Item | ButtonShape>[]
  cssStyle?: CSSObject
  mobileCss?: CSSObject
}

export const ROW = {
  row: ({ fields }: Entry<Props>) => (
    <div
      css={css(rootStyle, fields.cssStyle, fields.mobileCss && { [WHEN_MOBILE]: fields.mobileCss })}
    >
      {fields.items.map(({ fields, sys }) => {
        switch (sys.contentType.sys.id) {
          case "button":
            const button = fields as ButtonShape

            return (
              <Button
                text={button.words}
                href={button.href || button.assetLink?.fields?.file?.url}
                kind={button.kind}
                size={button.size}
                align={button.align}
                target={
                  button.assetLink?.fields?.file?.url ||
                  (button.href?.startsWith("http") && "_blank")
                }
              />
            )

          case "logoGalleryItem":
            const item = fields as Item
            const imageFields = item?.image?.fields
            const rendered = (
              <div key={sys.id} css={logoContainer}>
                <img
                  alt={imageFields?.description}
                  src={imageFields?.file?.url}
                  width={imageFields?.file?.details?.image?.width}
                  height={imageFields?.file?.details?.image?.height}
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
