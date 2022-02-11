import * as React from "react"
import Button from "src/shared/Button.4"
import { Entry } from "contentful"
import { ContentfulButton } from "src/utils/contentful"
import { useScreenSize } from "src/layout/ScreenSize"

export const BUTTON = {
  button: ({ fields }: Entry<ContentfulButton>) => {
    return (
      <ResponsiveButton
        name={fields.name}
        href={fields.href}
        assetLink={fields.assetLink}
        mobileSize={fields.mobileSize}
        size={fields.size}
        words={fields.words}
        kind={fields.kind}
        align={fields.align}
        iconLeft={fields.iconLeft}
      />
    )
  },
}

export function ResponsiveButton({
  href,
  assetLink,
  iconLeft,
  size,
  mobileSize,
  words,
  kind,
  align,
}: ContentfulButton) {
  const { isMobile } = useScreenSize()
  return (
    <Button
      text={words}
      href={href || assetLink?.fields?.file?.url}
      kind={kind}
      size={isMobile && mobileSize ? mobileSize : size}
      align={align}
      target={assetLink?.fields?.file?.url || (href?.startsWith("http") && "_blank")}
      iconLeft={iconLeft ? <img src={iconLeft.fields.file.url} /> : null}
    />
  )
}
