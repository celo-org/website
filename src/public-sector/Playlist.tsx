import Thumbnail from "./Thumbnail"
import { Document } from '@contentful/rich-text-types'
import { fonts } from "src/estyles"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { css } from "@emotion/react"
import { NameSpaces, useTranslation } from "src/i18n"

interface Props {
  title: string
  description: Document
  listId: string
}

export default function PlayList(props: Props) {
  const {t} = useTranslation(NameSpaces.common)
  return <>
    <div css={headCss}>
      <h3 css={fonts.h3}>{props.title}</h3>
      {documentToReactComponents(props.description)}
    </div>
    <Thumbnail title={"Systems"} link="/" image={"/images/marketplace-icons/icon-celo-CELO-color-f.svg"} />
    <Thumbnail title={"Instiutions"} link="/" image={"/images/marketplace-icons/icon-celo-CELO-color-f.svg"} />
    <Thumbnail title={"Goverance"} link="/" image={"/images/marketplace-icons/icon-celo-CELO-color-f.svg"} />
    <div><span>{t('showAll')}</span> </div>
  </>
}



const headCss = css({
  gridColumn: "span 3",
  maxWidth: 480
})