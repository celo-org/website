import { Asset } from "contentful"
import * as React from "react"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import { Entry } from "contentful"

export type Props =  {
    words: string
    href: string
    kind: BTN.NAV | BTN.DARKNAV | BTN.PRIMARY
    assetLink?: Asset
    size?: SIZE
    align?: "center" | "flex-start" | "flex-end"
}

export const BUTTON = {
  button: ({ fields }: Entry<Props>) => (
    <Button
      text={fields.words}
      href={fields.href || fields.assetLink?.fields?.file?.url}
      kind={fields.kind}
      size={fields.size}
      align={fields.align}
    />
  ),
}
