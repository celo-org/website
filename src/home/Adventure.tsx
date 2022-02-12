import * as React from "react"
import { Cell, Spans } from "src/layout/Grid2"
import Button, { BTN, SIZE } from "src/shared/Button.4"
import Image from "next/image"
import { css, SerializedStyles } from "@emotion/react"
import { WHEN_MOBILE, fonts, standardStyles } from "src/estyles"
interface Props {
  source: string | StaticImageData
  title: string
  text: string
  link?: {
    text: string
    href: string
  }
  imageCss?: SerializedStyles
}

export function Adventure({ title, text, source, link, imageCss }: Props) {
  return (
    <Cell span={Spans.one} css={rootCss}>
      <div>
        <Image
          src={typeof source === "string" ? source : source.src}
          css={[imgCss, imageCss]}
          width={100}
          height={100}
        />
        <h3 css={headingCss}>{title}</h3>
        <p css={fonts.body}>{text}</p>
      </div>
      {link && (
        <Button
          cssStyle={standardStyles.elementalMarginTop}
          href={link.href}
          text={link.text}
          target="_blank"
          kind={BTN.NAKED}
          size={SIZE.normal}
        />
      )}
    </Cell>
  )
}

const imgCss = css({ width: 100, height: 100 })

const rootCss = css({
  justifyContent: "space-between",
  [WHEN_MOBILE]: standardStyles.elementalMarginBottom,
})

const headingCss = css(fonts.h3, standardStyles.elementalMargin)
