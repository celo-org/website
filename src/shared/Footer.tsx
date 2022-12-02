import * as React from "react"
import { css } from "@emotion/react"
import { NameSpaces, Trans, useTranslation } from "src/i18n"
import Discord from "src/icons/Discord"
import Discourse from "src/icons/Discourse"
import Instagram from "src/icons/Instagram"
import MediumLogo from "src/icons/MediumLogo"
import Octocat from "src/icons/Octocat"
import LinkedIn from "src/icons/LinkedIn"
import envelope from "src/icons/Envelope.svg"
import Twitch from "src/icons/Twitch"
import Reddit from "src/icons/Reddit"
import Telegram from "src/icons/Telegram"
import { TweetLogo } from "src/icons/TwitterLogo"
import YouTube from "src/icons/YouTube"
import { GridRow, Cell, Spans } from "src/layout/Grid2"
import { useScreenSize } from "src/layout/ScreenSize"
import RingsGlyph from "src/logos/RingsGlyph"
import ChangeStory from "src/shared/ChangeStory"
import FooterColumn, { LinkType } from "src/shared/FooterColumn"
import menu, { CeloLinks, hashNav } from "src/shared/menu-items"
import { colors } from "src/colors"
import {
  flex,
  flexRow,
  fonts,
  WHEN_MOBILE,
  WHEN_TABLET,
  whiteText,
  standardStyles,
  WHEN_DESKTOP,
  textStyles,
  WHEN_TABLET_AND_UP,
  gtAlpina,
  inter,
} from "src/estyles"
import HubspotForm from "src/contentful/grid2-cells/HubspotForm"
import NewLogo from "../logos/NewLogo"
import SocialLinks from "../reskin/components/SocialLinks"
import Button, { BTN } from "./Button.4"
import { PIXEL_SIZE, SquarePixel } from "../reskin/SquarePixel"

const MENU = [menu.DEVELOPERS, menu.FOUNDERS, menu.COMMUNITY, menu.BUILD]
const TECH_MENU = [
  { name: "Docs", link: CeloLinks.docs },
  { name: "Security Audits", link: CeloLinks.audits },
  { name: "Reserve", link: CeloLinks.reserve },
  menu.PUBLIC_SECTOR,
]
const eventsLink = `${menu.COMMUNITY.link}#${hashNav.connect.events}`
const ecoFundLink = `${menu.COMMUNITY.link}#${hashNav.connect.fund}`
const COMPANY_MENU = [
  menu.VISION,
  { name: "Ecosystem", link: "#" },
  menu.JOBS,
  menu.PRESS,
  menu.PAPERS,
  { name: "Events", link: eventsLink },
]
const KITS_MENU = [menu.BRAND, menu.PILOT_KIT, menu.GRANT_KIT]

const FOOTER_OTHER_LINKS = [menu.PRIVACY, menu.TERMS]

const ICON_SIZE = 13
function socialMenu(darkMode: boolean) {
  const iconColor = darkMode ? colors.white : colors.dark
  return [
    {
      name: "Blog",
      link: CeloLinks.mediumPublication,
      icon: <MediumLogo height={ICON_SIZE} color={iconColor} wrapWithLink={false} />,
    },
    {
      name: "GitHub",
      link: CeloLinks.gitHub,
      icon: <Octocat size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Twitter",
      link: CeloLinks.twitter,
      icon: <TweetLogo height={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Forum",
      link: CeloLinks.discourse,
      icon: <Discourse size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Chat",
      link: CeloLinks.discord,
      icon: <Discord size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "YouTube",
      link: CeloLinks.youtube,
      icon: <YouTube size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Instagram",
      link: CeloLinks.instagram,
      icon: <Instagram size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "LinkedIn",
      link: CeloLinks.linkedIn,
      icon: <LinkedIn size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Twitch",
      link: CeloLinks.twitch,
      icon: <Twitch size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Reddit",
      link: CeloLinks.reddit,
      icon: <Reddit size={ICON_SIZE} color={iconColor} />,
    },
    {
      name: "Telegram",
      link: CeloLinks.telegram,
      icon: <Telegram size={ICON_SIZE} color={iconColor} />,
    },
  ]
}

interface Props {
  hideForm?: boolean
  darkMode?: boolean
}

export default function Footer({ hideForm, darkMode }: Props) {
  const { t } = useTranslation(NameSpaces.common)
  const { isMobile } = useScreenSize()
  const year = new Date().getFullYear()
  const footerMenu = React.useMemo(
    () =>
      MENU.map((item) => {
        return {
          name: t(`footer.${item.name}`),
          link: item.link,
        }
      }),
    [t]
  )
  return (
    <>
      <GridRow
        columns={3}
        darkMode={darkMode}
        wrapperCss={wrapperCss}
        css={css({
          gap: 0,
          [WHEN_DESKTOP]: css(standardStyles.blockMarginTop),
          [WHEN_TABLET]: css(standardStyles.blockMarginTopTablet),
          [WHEN_MOBILE]: standardStyles.blockMarginTopMobile,
        })}
      >
        <Cell span={Spans.one} cssStyles={css({ gridRowStart: 1 })}>
          <div css={footerLogoCss}>
            <NewLogo width={282} height={64} />
          </div>
        </Cell>
        <Cell span={Spans.one} tabletSpan={Spans.one} cssStyles={css({ gridRowStart: 2 })}>
          <Details darkMode={darkMode} />
          <HubspotForm hubspotFormId="b4dd2ae2-68e9-4662-bfd3-b2860162a5aa" />
        </Cell>
        <Cell span={Spans.two} tabletSpan={Spans.three} cssStyles={footerLinksResponsiveCss}>
          {isMobile ? (
            <MobileLinks footerMenu={footerMenu} darkMode={darkMode} />
          ) : (
            <div css={linksAreaCss}>
              <FooterColumn
                css={linkColumnStartCss}
                heading={"Celo for"}
                links={footerMenu}
                darkMode={darkMode}
              />
              <FooterColumn
                heading={t("footer.technology")}
                links={TECH_MENU}
                darkMode={darkMode}
              />
              <FooterColumn
                heading={t("footer.company")}
                links={COMPANY_MENU}
                darkMode={darkMode}
              />
              <FooterColumn
                darkMode={darkMode}
                css={linkColumnEndCss}
                heading={t("footer.kits")}
                links={KITS_MENU}
              />
            </div>
          )}
        </Cell>
      </GridRow>
      <GridRow
        columns={1}
        darkMode={darkMode}
        wrapperCss={css({ backgroundColor: colors.primaryYellow })}
        css={css({
          [WHEN_DESKTOP]: css(standardStyles.blockMargin),
          [WHEN_TABLET]: css(standardStyles.blockMarginTablet),
          [WHEN_MOBILE]: standardStyles.blockMarginMobile,
        })}
      >
        <div css={toesCss}>
          <SocialLinks containerCss={socialContainerCss} iconCss={socialIconCss} />
          <small css={css(copyrightStyle, darkMode && whiteText)}>
            {t("footer.copyright", { year })}
          </small>
          <div css={footerOtherLinksCss}>
            {FOOTER_OTHER_LINKS.map((item) => (
              <div key={item.link} css={footerOtherLinkContainerCss}>
                <Button
                  target="_blank"
                  kind={BTN.INLINE}
                  text={item.name}
                  href={item.link}
                  cssStyle={css(inter)}
                />
              </div>
            ))}
          </div>
        </div>
      </GridRow>
      <SquarePixel options={{ top: 0, left: 0 }} backgroundColor={{ desktop: colors.white }} />
      <SquarePixel
        options={{ top: 0, left: PIXEL_SIZE * 2 }}
        backgroundColor={{ desktop: colors.white }}
      />
    </>
  )
}

interface MobileLinkProps {
  footerMenu: LinkType[]
  darkMode: boolean
}

function MobileLinks({ footerMenu, darkMode }: MobileLinkProps) {
  const { t } = useTranslation(NameSpaces.common)

  return (
    <div css={mobileLinkCss}>
      <FooterColumn
        darkMode={darkMode}
        heading={"Celo for"}
        links={footerMenu}
        linksCss={css(flexRow, { flexWrap: "wrap" })}
      />
      <FooterColumn
        darkMode={darkMode}
        heading={t("footer.company")}
        links={COMPANY_MENU}
        linksCss={css(flexRow, { flexWrap: "wrap" })}
      />
      <FooterColumn
        darkMode={darkMode}
        heading={t("footer.technology")}
        links={TECH_MENU}
        linksCss={css(flexRow, { flexWrap: "wrap" })}
      />
      <FooterColumn
        darkMode={darkMode}
        heading={t("footer.kits")}
        links={KITS_MENU}
        linksCss={css(flexRow, { flexWrap: "wrap" })}
      />
    </div>
  )
}

interface DetailProps {
  darkMode?: boolean
}

const Details = React.memo(function _Details({ darkMode }: DetailProps) {
  const { t } = useTranslation(NameSpaces.common)
  const fontStyling = css(fonts.legal, detailsTextCss, darkMode && whiteText)
  return (
    <div css={detailsCss}>
      <p css={fontStyling}>{t("footerEmailText")}</p>
    </div>
  )
})

const detailsCss = css(flex, {
  [WHEN_MOBILE]: {
    justifyContent: "center",
    alignItems: "flex-start",
  },
})

const wrapperCss = css({
  backgroundColor: colors.primaryYellow,
  [WHEN_MOBILE]: {
    padding: 33,
  },
})

const hrefCss = css({
  color: "inherit",
})

const receiveUpdatesCss = css(fonts.body, {
  textAlign: "center",
  marginTop: 20,
  marginBottom: 10,
})

const detailsTextCss = css(inter, {
  marginBottom: 20,
  maxWidth: 350,
  textAlign: "left",
})

const toesCss = css(flex, {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  borderBottom: `1px solid ${colors.transparentGray}`,
  [WHEN_MOBILE]: css({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderBottom: "none",
  }),
})

const formStyle = css(flex, standardStyles.centered, {
  maxWidth: 550,
  [WHEN_DESKTOP]: {
    width: "50%",
  },
  [WHEN_TABLET]: { width: "66.66%" },
})

const linkColumnStartCss = css({
  paddingStart: 0,
})

const linkColumnEndCss = css({
  paddingEnd: 0,
})

const endMobileColumnCss = css({
  marginLeft: 20,
})

const copyrightStyle = css(fonts.legal, inter, {
  zIndex: 10, // ensure copyright is above the sliding div from ChangeStory animation
  [WHEN_MOBILE]: {
    marginBottom: 17,
  },
})

const ringsCSS = css(flex, {
  marginBottom: 20,
  [WHEN_MOBILE]: {
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  },
})

const emailLogoCss = css({
  objectFit: "contain",
  margin: 10,
})

const footerLinksResponsiveCss = css({
  gridRowStart: 2,
  [WHEN_TABLET]: {
    gridRowStart: 3,
  },
})

const linksAreaCss = css(flexRow, {
  justifyContent: "space-around",
  [WHEN_TABLET]: {
    justifyContent: "space-between",
  },
})

const footerLogoCss = css(flex, {
  marginTop: 80,
  marginBottom: 48,
})

const socialContainerCss = css({
  [WHEN_MOBILE]: {
    marginBottom: 40,
  },
})

const socialIconCss = css({
  padding: 16,
  [WHEN_TABLET_AND_UP]: {
    borderBottom: "none",
  },
})

const footerOtherLinksCss = css(flex, {
  flexDirection: "row",
})

const footerOtherLinkContainerCss = css(fonts.legal, {
  "&:first-child": {
    marginRight: 20,
  },
  a: {
    textDecorationLine: "none",
  },
})

const mobileLinkCss = css(flex, {
  [WHEN_DESKTOP]: {
    flexDirection: "row",
  },
  [WHEN_MOBILE]: {
    marginBottom: 90,
  },
})
