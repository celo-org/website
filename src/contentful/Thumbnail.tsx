
import {css} from "@emotion/react"
import { flexRow, fonts } from "src/estyles"
import { colors } from "src/styles"
import Image from "next/image"

export interface Props {
  image: string
  link: string
  title: string
  altText: string
}

export default function Thumbnail({image, link, title, altText}: Props) {
  return <div role="figure" css={rootCss} >
          <Image css={imageCss} alt={altText} src={image}  height={166} width={296} layout={"intrinsic"}/>
          <a css={captionArea}  href={link} target="_blank" rel="noopener">
            <figcaption css={titleCss}>{title}</figcaption>
          </a>
  </div>
}

const rootCss  = css({
  display: "block",
  maxWidth: 296
})

const imageCss = css({
  borderRadius: 16,
  backgroundColor:colors.faintCyan
})

const titleCss = css(fonts.body,{
  fontWeight: 'bold'
})

const captionArea = css(flexRow, {
  marginTop: 8,
  textDecoration: "none",
})