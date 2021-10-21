import * as React from "react"
import { GAP } from "src/experience/common/constants"
import { standardStyles } from "src/estyles"
import Check from "src/experience/brandkit/images/Check.png"
import X from "src/experience/brandkit/images/X.png"
import { css } from "@emotion/react"
export enum Value {
  Good,
  Bad,
}

interface Props {
  is: Value
  children: React.ReactNode
}

export default function Judgement({ is, children }: Props) {
  return (
    <div css={boxCss}>
      <img css={judgementalCss} width={24} height={24} src={is === Value.Bad ? X.src : Check.src} />
      {children}
    </div>
  )
}

const boxCss = css(standardStyles.elementalMarginTop, {
  paddingTop: GAP,
  paddingBottom: GAP,
  flex: 1,
})
const judgementalCss = css({
  margin: "5px 0px",
})
