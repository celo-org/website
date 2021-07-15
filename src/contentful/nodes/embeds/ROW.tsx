import { css, CSSObject } from "@emotion/react"
import { flexRow, WHEN_MOBILE } from "src/estyles"
import { Entry } from "contentful"
import { GalleryItem } from "src/utils/contentful"
import {Props as ButtonShape} from "src/contentful/nodes/embeds/BUTTON"
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
              />
            )

          case "logoGalleryItem":
            const item = fields as Item
            const imageFields = item?.image?.fields
            const rendered = (
              <img
                key={sys.id}
                alt={imageFields?.description}
                src={imageFields?.file?.url}
                width={imageFields?.file?.details?.image?.width}
                height={imageFields?.file?.details?.image?.height}
              />
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

const rootStyle = css(flexRow,  {
  flexWrap: "wrap"
})
