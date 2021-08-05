import { css } from "@emotion/react"
import * as React from "react"
import FullStack from "src/dev/FullStack"
import { flex } from "src/estyles"
import { Props } from "src/home/Home"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"

export default function Developers(props: Props) {
  const items = props.sections.map(pageSwitch)
  items.splice(3, 0, <FullStack />)
  return (
    <>
      <div css={rootCss}>{items}</div>
    </>

  )
}

const rootCss = css(flex, {})


