import { css, CSSObject } from "@emotion/react"
import { flexRow } from "src/estyles"
import { Entry } from "contentful"
import { GalleryItem } from "src/utils/contentful"

type Item = GalleryItem
interface Props {
  items: Entry<Item>[]
  cssStyle?: CSSObject
}

export const ROW = {
  row: ({ fields }: Entry<Props>) => (
    <div css={css(rootStyle, fields.cssStyle)}>
      {fields.items.map(({ fields: { image, url }, sys }) => {
        const rendered = (
          <img
              key={sys.id}
              alt={image.fields.description}
              src={image.fields.file.url}
              width={image.fields.file.details.image.width}
              height={image.fields.file.details.image.height}
            />
        )

        if (url) {
          return (
            <a href={url} rel="noreferrer">
              {rendered}
            </a>
          )
        }
        return rendered
      })}
    </div>
  ),
}

const rootStyle = css(flexRow,  {
  flexWrap: "wrap"
})
