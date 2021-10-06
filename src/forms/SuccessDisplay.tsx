import * as React from "react"
import MessageDisplay from "src/forms/MessageDisplay"
import Checkmark from "src/icons/Checkmark"
import { colors } from "src/styles"
import { css } from "@emotion/react"
import { flexRow } from "src/estyles"

interface Props {
  isShowing: boolean
  message: string
  className?: string
}

export default React.memo(({ message, className, isShowing }: Props) => {
  return (
    <MessageDisplay isShowing={isShowing} css={successCss} className={className}>
      <>
        <Checkmark color={colors.primary} size={16} />
        <span css={messageCss}>{message}</span>
      </>
    </MessageDisplay>
  )
})

const successCss = css(flexRow, {
  color: colors.primary,
  fontWeight: 500,
  alignItems: "center",
})

const messageCss = css({
  marginLeft: 10,
})
