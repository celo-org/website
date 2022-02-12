import * as React from "react"
import Button, { BTN } from "src/shared/Button.4"
import { css } from "@emotion/react"
import { WHEN_MOBILE, fonts, whiteText, textStyles } from "src/estyles"

export interface LinkType {
  name: string
  link: string
  icon?: React.ReactNode
}

interface Props {
  heading: string
  links: LinkType[]
  className?: string
  darkMode?: boolean
}

export default React.memo(function FooterColumn({ heading, links, className, darkMode }: Props) {
  return (
    <div css={rootStyle} className={className}>
      <h6 css={css(headingStyle, darkMode && whiteText)}>{heading}</h6>
      {links.map(({ name, link, icon }) => (
        <div css={linkContainerCss} key={link}>
          <Button
            target="_blank"
            iconLeft={icon}
            kind={BTN.INLINE}
            text={name}
            href={link}
            cssStyle={css(linkCss, darkMode && textStyles.invert)}
          />
        </div>
      ))}
    </div>
  )
})

const rootStyle = css({
  paddingLeft: 25,
  paddingRight: 25,
  [WHEN_MOBILE]: {
    marginTop: 35,
    width: "50%",
    paddingLeft: 10,
    paddingRight: 10,
  },
})

const linkContainerCss = css({
  marginTop: 8,
  marginBottom: 8,
})

const headingStyle = css(fonts.h6, {
  marginBottom: 20,
})

const linkCss = css(fonts.legal, {
  textDecorationLine: "none",
  display: "inline-flex",
  alignItems: "center",
})
