import { SerializedStyles } from "@emotion/react"
import * as React from "react"
import Button, { BTN } from "src/shared/Button.4"

interface Props {
  children: string
  href: string
  target?: string
  onPress?: () => void
  cssStyle?: SerializedStyles
}

export default function InlineAnchor({ children, href, target, onPress, cssStyle }: Props) {
  return (
    <Button
      text={children}
      onPress={onPress}
      target={target}
      href={href}
      kind={BTN.INLINE}
      cssStyle={cssStyle}
    />
  )
}
