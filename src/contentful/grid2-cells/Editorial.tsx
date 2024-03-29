import { EditorialType } from "src/utils/contentful"
import { css } from "@emotion/react"
import { colors } from "src/colors"
import { flexRow, WHEN_DESKTOP } from "src/estyles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Button, { SIZE } from "src/shared/Button.4"
import renderNode from "../nodes/enodes"
type Props = EditorialType & { darkMode?: boolean }

export default function Editorial(props: Props) {
  return (
    <article css={rootCss}>
      <div css={css(innerCSS, props.darkMode && darkModeText)}>
        {documentToReactComponents(props.title, { renderNode })}
        <Button
          href={props.button.fields.href || props.button.fields.assetLink?.fields?.file?.url}
          text={props.button.fields.words}
          kind={props.button.fields.kind}
          size={SIZE.normal}
          target={
            props.button.fields.assetLink?.fields?.file?.url ||
            (props.button.fields.href?.startsWith("http") && "_blank")
          }
        />
      </div>
      <picture>
        <source srcSet={`${props.image?.fields?.file?.url} 2x`} />
        <img
          css={imageCss}
          loading="lazy"
          alt={props.image?.fields?.description}
          src={props.image?.fields?.file?.url}
          width={128}
          height={128}
        />
      </picture>
    </article>
  )
}

const rootCss = css(flexRow, {
  padding: "16px 16px 16px 16px",
  borderTop: `1px solid ${colors.gray}`,
  justifyContent: "space-between",
})

const innerCSS = css({
  marginRight: 24,
  flex: 1,
  p: {
    marginTop: 0,
  },
})

const imageCss = css({
  objectFit: "cover",
  width: 96,
  height: 96,
  [WHEN_DESKTOP]: {
    width: 128,
    height: 128,
  },
})

const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } })
