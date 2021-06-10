import * as React from "react"
import { StyleSheet } from "react-native"
import Button, { BTN, SIZE } from "src/shared/Button.3"

interface Props {
  text: string
  href: string
}

export function HelpfulLink({ text, href }: Props) {
  return (
    <Button
      kind={BTN.NAKED}
      style={styles.link}
      text={text}
      href={href}
      size={SIZE.normal}
      target="_blank"
    />
  )
}

const styles = StyleSheet.create({
  link: {
    marginTop: 10,
    marginRight: 30,
  },
})
