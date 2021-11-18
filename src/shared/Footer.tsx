import * as React from "react"
import { css } from "@emotion/react"
import EmailForm from "src/forms/EmailForm"
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
} from "src/estyles"

const MENU = [
  menu.HOME,
  menu.ABOUT_US,
  menu.JOBS,
  menu.BUILD,
  menu.DEVELOPERS,
  menu.ALLIANCE_COLLECTIVE,
  menu.COMMUNITY,
  {
    name: "annualReport",
    link: "/annual-reports/2020",
  },
]
const TECH_MENU = [
  { name: "Docs", link: CeloLinks.docs },
  { name: "Security Audits", link: CeloLinks.audits },
  { name: "Reserve", link: CeloLinks.reserve },
  menu.PAPERS,
  menu.PUBLIC_SECTOR,
]
const eventsLink = `${menu.COMMUNITY.link}#${hashNav.connect.events}`
const ecoFundLink = `${menu.COMMUNITY.link}#${hashNav.connect.fund}`
const RESOURCE_MENU = [
  menu.BRAND_POLICY,
  menu.PRESS,
  { name: "Events", link: eventsLink },
  menu.EVENTS_KIT,
  menu.BRAND,
  menu.MERCHANTS,
  menu.GRANT_KIT,
  menu.PILOT_KIT,
  { name: "Ecosystem Fund", link: ecoFundLink },
]

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
      {!hideForm && (
        <GridRow
          columns={1}
          darkMode={darkMode}
          css={css(standardStyles.centered, {
            [WHEN_DESKTOP]: css(standardStyles.blockMarginTop, flex),
            [WHEN_TABLET]: css(standardStyles.blockMarginTopTablet, flex),
            [WHEN_MOBILE]: standardStyles.blockMarginTopMobile,
          })}
        >
          <div css={formStyle}>
            <img
              src={envelope.src}
              css={emailLogoCss}
              width={50}
              height={60}
              alt={t("footer.emailIconAlt")}
            />
            <p css={receiveUpdatesCss}>{t("receiveUpdates")}</p>
            <EmailForm submitText={t("signUp")} route={"/contacts"} isDarkMode={false} />
          </div>
        </GridRow>
      )}
      <GridRow
        columns={3}
        darkMode={darkMode}
        css={css({
          [WHEN_DESKTOP]: css(standardStyles.blockMarginTop),
          [WHEN_TABLET]: css(standardStyles.blockMarginTopTablet),
          [WHEN_MOBILE]: standardStyles.blockMarginTopMobile,
        })}
      >
        <Cell span={Spans.one} tabletSpan={Spans.three}>
          <div css={ringsCSS}>
            <RingsGlyph darkMode={darkMode} />
          </div>
          <Details darkMode={darkMode} />
        </Cell>
        <Cell span={Spans.two} tabletSpan={Spans.three}>
          {isMobile ? (
            <MobileLinks footerMenu={footerMenu} darkMode={darkMode} />
          ) : (
            <div css={linksAreaCss}>
              <FooterColumn
                css={linkColumnStartCss}
                heading={"Celo"}
                links={footerMenu}
                darkMode={darkMode}
              />
              <FooterColumn
                heading={t("footer.technology")}
                links={TECH_MENU}
                darkMode={darkMode}
              />
              <FooterColumn
                heading={t("footer.resources")}
                links={RESOURCE_MENU}
                darkMode={darkMode}
              />
              <FooterColumn
                darkMode={darkMode}
                css={linkColumnEndCss}
                heading={t("footer.social")}
                links={socialMenu(darkMode)}
              />
            </div>
          )}
        </Cell>
      </GridRow>
      <GridRow
        columns={1}
        darkMode={darkMode}
        css={css({
          [WHEN_DESKTOP]: css(standardStyles.blockMargin),
          [WHEN_TABLET]: css(standardStyles.blockMarginTablet),
          [WHEN_MOBILE]: standardStyles.blockMarginMobile,
        })}
      >
        <div css={toesCss}>
          <ChangeStory darkMode={darkMode} />
          <small css={css(copyrightStyle, darkMode && whiteText)}>
            {t("footer.copyright", { year })}
          </small>
        </div>
      </GridRow>
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
    <>
      <div css={flexRow}>
        <FooterColumn darkMode={darkMode} heading={"Celo"} links={footerMenu} />
        <FooterColumn
          darkMode={darkMode}
          heading={t("footer.social")}
          links={socialMenu(darkMode)}
          css={endMobileColumnCss}
        />
      </div>
      <div css={flexRow}>
        <FooterColumn darkMode={darkMode} heading={t("footer.resources")} links={RESOURCE_MENU} />
        <FooterColumn
          darkMode={darkMode}
          heading={t("footer.technology")}
          links={TECH_MENU}
          css={endMobileColumnCss}
        />
      </div>
    </>
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
      <p css={fontStyling}>{t("disclaimer")}</p>
      <p css={fontStyling}>
        <Trans ns={NameSpaces.common} i18nKey={"footerReadMoreTerms"}>
          <a css={hrefCss} href={menu.TERMS.link}>
            Terms of Service
          </a>
        </Trans>
      </p>
    </div>
  )
})

const detailsCss = css(flex, {
  paddingBottom: 20,
  [WHEN_MOBILE]: {
    justifyContent: "center",
    alignItems: "center",
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

const detailsTextCss = css({
  marginBottom: 20,
  maxWidth: 350,
  textAlign: "left",
  [WHEN_MOBILE]: {
    textAlign: "center",
  },
})

const toesCss = css(flex, {
  flexDirection: "row",
  justifyContent: "space-between",
  [WHEN_MOBILE]: css({
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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

const copyrightStyle = css(fonts.legal, {
  zIndex: 10, // ensure copyright is above the sliding div from ChangeStory animation
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

const linksAreaCss = css(flexRow, {
  justifyContent: "space-around",
  [WHEN_TABLET]: {
    justifyContent: "space-between",
  },
})
