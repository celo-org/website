import Button, { BTN } from "../../shared/Button.4"
import * as React from "react"
import { CeloLinks } from "../../shared/menu-items"
import { css, SerializedStyles } from "@emotion/react"
import { flex, WHEN_MOBILE } from "../../estyles"
import { colors } from "../../colors"
import Discord from "../../icons/Discord"
import MediumLogo from "../../icons/MediumLogo"
import { TweetLogo } from "../../icons/TwitterLogo"
import Octocat from "../../icons/Octocat"

interface Props {
  containerCss?: SerializedStyles
  iconCss?: SerializedStyles
}

const ICON_SIZE = 40

function socials() {
  const iconColor = colors.black
  return [
    {
      name: "Chat",
      link: CeloLinks.discord,
      icon: <Discord size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Blog",
      link: CeloLinks.mediumPublication,
      icon: <MediumLogo height={ICON_SIZE} color={iconColor} wrapWithLink={false} />,
    },
    {
      name: "Twitter",
      link: CeloLinks.twitter,
      icon: <TweetLogo height={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "GitHub",
      link: CeloLinks.gitHub,
      icon: <Octocat size={ICON_SIZE} color={iconColor} />,
    },
  ]
}

export default function SocialLinks(props: Props) {
  return (
    <div css={css(socialsCss, props.containerCss)}>
      {socials().map((social) => (
        <div key={social.name} css={css(socialIconCss, props.iconCss)}>
          <Button
            target="_blank"
            kind={BTN.INLINE}
            text={social.icon as unknown as string}
            href={social.link}
          />
        </div>
      ))}
    </div>
  )
}

const socialsCss = css(flex, {
  flexDirection: "row",
  "& > div:nth-child(-n+3)": {
    borderRight: "none",
  },
})

const socialIconCss = css({
  border: `1px solid ${colors.transparentGray}`,
  [WHEN_MOBILE]: {
    padding: 16,
  },
})
