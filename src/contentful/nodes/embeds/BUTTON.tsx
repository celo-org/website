import * as React from "react"
import Button from "src/shared/Button.3"
import { Entry } from "contentful"
import { ContentfulButton } from "src/utils/contentful"

export const BUTTON = {
  button: ({ fields }: Entry<ContentfulButton>) => {
    return (
      <Button
        text={fields.words}
        href={fields.href || fields.assetLink?.fields?.file?.url}
        kind={fields.kind}
        size={fields.size}
        align={fields.align}
        target={
          fields.assetLink?.fields?.file?.url || (fields.href?.startsWith("http") && "_blank")
        }
        iconLeft={fields.iconLeft ? <img src={fields.iconLeft.fields.file.url} /> : null}
      />
    )
  },
}
