import * as React from 'react'
import { TextStyle } from 'react-native'
import Button, { BTN } from 'src/shared/Button.3'

interface Props {
  children: string
  href: string
  target?: string
  onPress?: () => void
  style?: TextStyle
}

export default function InlineAnchor({ children, href, target, onPress, style }: Props) {
  return <Button text={children} onPress={onPress} target={target} href={href} kind={BTN.INLINE} style={style} />
}
