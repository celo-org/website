import * as React from "react"
import Button, { BTN } from "src/shared/Button.4"
import { css, SerializedStyles } from "@emotion/react"
import { WHEN_MOBILE, fonts, whiteText, textStyles, inter } from "src/estyles"
import { colors } from "../colors"

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
  linksCss?: SerializedStyles
}

export default React.memo(function FooterColumn({
  heading,
  links,
  className,
  darkMode,
  linksCss,
}: Props) {
  return (
    <div css={rootStyle} className={className}>
      <h6 css={css(headingStyle, darkMode && whiteText)}>{heading}</h6>
      <div css={linksCss}>
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
    </div>
  )
})

const rootStyle = css({
  paddingRight: 25,
  [WHEN_MOBILE]: {
    marginTop: 35,
    paddingLeft: 10,
    paddingRight: 10,
  },
})

const linkContainerCss = css({
  marginTop: 8,
  marginBottom: 8,
  [WHEN_MOBILE]: {
    marginRight: 8,
  },
})

const headingStyle = css(inter, {
  marginTop: 0,
  fontWeight: 200,
  marginBottom: 20,
})

const linkCss = css(fonts.legal, inter, {
  fontWeight: 700,
  border: `1px solid ${colors.transparentGray}`,
  padding: "10.5px 16px",
  borderRadius: 70,
  textDecorationLine: "none",
  display: "inline-flex",
  alignItems: "center",
})
