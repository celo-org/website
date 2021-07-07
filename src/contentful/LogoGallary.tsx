import { css, CSSObject } from "@emotion/react"
import { Asset, Entry } from "contentful"
import { flex, flexRow, WHEN_MOBILE } from "src/estyles"

interface Logo {
  url: string
  image: Asset
}

interface Props {
  list: Entry<Logo>[]
  cssStyle?: CSSObject
}

export default function LogoGallary({ list, cssStyle }: Props) {
  return (
    <div css={rootStyle}>
      {list.map(({ sys, fields }) => {
        const width = fields.image.fields.file.details.image.width / 2
        const height = fields.image.fields.file.details.image.height / 2
        return (
          <a
            title={fields.image.fields.description}
            css={css(cssStyle ? cssStyle : itemStyle)}
            key={sys.id}
            href={fields.url}
            target={"_blank"}
            rel="nofollow noopener"
          >
            <picture>
              <source srcSet={`${fields.image.fields.file.url}?fm=webp 2x`} type="image/webp" />
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
  justifyContent: "space-around",
  alignItems: "center",
  marginTop: 32,
})

const itemStyle = css(flex, {
  alignItems: "center",
  minWidth: 140,
  marginLeft: 32,
  marginRight: 32,
  marginTop: 24,
  marginBottom: 24,
  [WHEN_MOBILE]: {
    minWidth: 100,
    maxWidth: 140,
    marginLeft: 16,
    marginRight: 16,
  },
})
