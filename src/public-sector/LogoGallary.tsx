import { css } from "@emotion/react"
import { Asset, Entry } from "contentful"
import { flexRow } from "src/estyles"

interface Logo {
  url: string
  image: Asset
}

interface Props {
  list: Entry<Logo>[]
}

export default function LogoGallary({ list }: Props) {
  return (
    <div css={rootStyle}>
      {list.map(({ sys, fields }) => {
          const width = fields.image.fields.file.details.image.width / 2
          const height = fields.image.fields.file.details.image.height / 2

        return (
          <a
                title={fields.image.fields.description}
                css={itemStyle}
                key={sys.id}
                href={fields.url}
                target={"_blank"}
                rel="nofollow noopener"
              >
                <picture>

                  <source
                    srcSet={`${fields.image.fields.file.url}?fm=webp 2x`}
                    type="image/webp"
                  />
                  <source srcSet={`${fields.image.fields.file.url} 2x`} />

                  <source
                    srcSet={`${fields.image.fields.file.url}?fm=webp&w=${width}`}
                    type="image/webp"
                  />
                  <img
                    loading="lazy"
                    width={width}
                    height={height}
                    alt={fields.image.fields.description}
                    src={`${fields.image.fields.file.url}?w=${width}`}
                  />
                </picture>
              </a>
        )
      })}
    </div>
  )
}

const rootStyle = css(flexRow, {
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  maxWidth: 800,
  marginTop: 32,
})

const itemStyle = css({
  marginLeft: 40,
  marginRight: 40,
  marginTop: 24,
  minWidth: 152,
  marginBottom: 24,
})
