import { css } from "@emotion/react"
import { Asset } from "contentful"
import { Document } from "@contentful/rich-text-types"
import { WHEN_MOBILE } from "src/estyles"
import { useScreenSize } from "src/layout/ScreenSize"

export interface Props {
  title: string
  icon?: Asset
  body: Document
}

export default function ToogleBlurb(props: Props) {
  const { isMobile } = useScreenSize()
  return <div css={rootCss}>{}</div>
}

const rootCss = css({
  [WHEN_MOBILE]: {
    alignItems: "center",
    alignContent: "center",
  },
})
