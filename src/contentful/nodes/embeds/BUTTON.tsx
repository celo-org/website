import { Asset } from "contentful"
import * as React from "react"
import Button, { BTN } from "src/shared/Button.3"

interface Props {
  fields: {
    words: string
    href: string
    kind: BTN.NAV | BTN.DARKNAV
    assetLink?: Asset
  }
}

export const BUTTON = {
  button: ({ fields }: Props) => (
    <Button
      text={fields.words}
      href={fields.href || fields.assetLink?.fields?.file?.url}
      kind={fields.kind}
    />
  ),
}
