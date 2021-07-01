import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import { HeadingContentType } from "src/utils/contentful"
import { flex, fonts } from "src/estyles"

interface Props {
  span: number
  darkMode: boolean
}

export function Heading(props: Props & HeadingContentType) {
  function SubTitle(_, children) {
    return <h3 css={css(subtitleCss, props.subTitleCss)}>{children}</h3>
  }

  const subtitleOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: SubTitle,
    },
  }

  const imageFile = props.image?.fields?.file

  return (
    <div css={css(rootCss, { gridColumn: `span ${props.span}` })}>
      {imageFile && (
        <img
          src={imageFile.url}
          width={imageFile.details.image.width}
          height={imageFile.details.image.height}
        />
      )}
      {<h2 css={css(titleCSS, props.titleCss)}>{props.title}</h2>}
      {documentToReactComponents(props.subTitle, subtitleOptions)}
    </div>
  )
}

const rootCss = css(flex, {
  alignItems: "center",
  marginBottom: 80,
})

const subtitleCss = css(fonts.h4, {
  textAlign: "center",
})

const titleCSS = css(fonts.h1, {
  textAlign: "center",
  marginBottom: 24,
})
