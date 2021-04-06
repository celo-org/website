
import {css} from "@emotion/react"
import { flexRow, fonts } from "src/estyles"
import { colors } from "src/styles"
import Image from "next/image"

interface Props {
  image: string
  link: string
  title: string
}

export default function Thumbnail({image, link, title}: Props) {
  return <a css={rootCss} href={link} >
          <Image css={imageCss} src={image}  height={166} width={296} layout={"responsive"}/>
          <div css={flexRow}>
            <caption css={titleCss}>{title}</caption>
          </div>
  </a>
}

const rootCss  = css({
  display: "block",
  textDecoration: "none"
})

const imageCss = css({
  borderRadius: 16,
  backgroundColor:colors.faintCyan
})

const titleCss = css(fonts.body,{
  fontWeight: 'bold'
})