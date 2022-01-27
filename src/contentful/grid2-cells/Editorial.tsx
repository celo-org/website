import { EditorialType } from "src/utils/contentful"
import { css } from "@emotion/react"
import { colors } from "src/colors"
import { flexRow, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import Button, { SIZE } from "src/shared/Button.3"
import { standardStyles } from "src/styles"

type Props = EditorialType & { darkMode?: boolean }

export default function Editorial(props: Props) {
  return (
    <article css={rootCss}>
      <div css={css(innerCSS, props.darkMode && darkModeText)}>
        {documentToReactComponents(props.title)}
        <Button
          style={standardStyles.elementalMarginTop}
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
      <img css={imageCss} src={props.image.fields.file.url} width={128} height={128} />
    </article>
  )
}

const rootCss = css(flexRow, {
  padding: "16px 8px 16px 24px",
  borderTop: `1px solid ${colors.gray}`,
  justifyContent: "space-between",
})

const innerCSS = css({
  marginRight: 16,
  flex: 1,
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
