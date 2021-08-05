import { css } from "@emotion/react"
import * as React from "react"
import FullStack from "src/dev/FullStack"
import { flex } from "src/estyles"
import { Props } from "src/home/Home"
import { NameSpaces, useTranslation } from "src/i18n"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"

export default function Developers(props: Props) {
  const { t } = useTranslation(NameSpaces.dev)
  const items = props.sections.map(pageSwitch)
  return (
    <>
      <div css={rootCss}>{items}</div>
      <div css={rootCss}>{items.splice(3, 0, <FullStack />)}</div>
    </>

  )
}

const rootCss = css(flex, {})


