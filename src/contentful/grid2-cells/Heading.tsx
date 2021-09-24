import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS } from "@contentful/rich-text-types"

import { HeadingContentType } from "src/utils/contentful"
import { flex, fonts, whiteText } from "src/estyles"

interface Props {
  span: number
  darkMode: boolean
}

export function Heading(props: Props & HeadingContentType) {
  const propSubtitleCss =  props.subTitleCss
  function SubTitle(_, children: React.ReactNode) {
    return (
      <h3 css={css(subtitleCss, propSubtitleCss, props.darkMode && whiteText)}>{children}</h3>
    )
  }

  const subtitleOptions = {
    renderNode: {
      [BLOCKS.PARAGRAPH]: SubTitle,
    },
  }

  const imageFile = props.image?.fields?.file
  return (
    <div css={css(rootCss, props.cssStyle, { gridColumn: `span ${props.span}` })}>
      {imageFile && (
        props.title === "Public Sector on Celo" ?
          <img
          src={imageFile.url}
          width={imageFile.details.image.width / 2}
          height={imageFile.details.image.height / 2}
        />
       :
        <img
          src={imageFile.url}
          width={imageFile.details.image.width}
          height={imageFile.details.image.height}
        />
        
      )}
      {
        <h2
          css={css(
            props.displayTitleH1 ? fonts.h1 : fonts.h2,
            titleCSS,
            props.titleCss,
            props.darkMode && whiteText
          )}
        >
          {props.title}
        </h2>
      }
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

const titleCSS = css({
  textAlign: "center",
  marginBottom: 24,
})
