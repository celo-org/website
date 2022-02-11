import { css } from "@emotion/react"
import * as React from "react"
import Button, { BTN, SIZE } from "src/shared/Button.4"

interface Props {
  text: string
  href: string
}

export function HelpfulLink({ text, href }: Props) {
  return (
    <Button
      kind={BTN.NAKED}
      cssStyle={linkCSS}
      text={text}
      href={href}
      size={SIZE.normal}
      target="_blank"
    />
  )
}

const linkCSS = css({
  marginTop: 10,
  marginRight: 30,
})
