import * as React from "react"
import Lazy from "react-lazyload"
import { StyleSheet } from "react-native"
import { css } from "@emotion/react"
import EmailForm from "src/forms/EmailForm"
import { NameSpaces, Trans, useTranslation } from "src/i18n"
import Discord from "src/icons/Discord"
import Discourse from "src/icons/Discourse"
import Instagram from "src/icons/Instagram"
import MediumLogo from "src/icons/MediumLogo"
import Octocat from "src/icons/Octocat"
import sendCoinIcon from "src/icons/send-green-coin-lg-bg.png"
import LinkedIn from "src/icons/LinkedIn"
import Twitch from "src/icons/Twitch"
import Reddit from "src/icons/Reddit"
import Telegram from "src/icons/Telegram"
import { TweetLogo } from "src/icons/TwitterLogo"
import YouTube from "src/icons/YouTube"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { useScreenSize } from "src/layout/ScreenSize"
import RingsGlyph from "src/logos/RingsGlyph"
import ChangeStory from "src/shared/ChangeStory"
import FooterColumn, { LinkType } from "src/shared/FooterColumn"
import menu, { CeloLinks, hashNav, MAIN_MENU } from "src/shared/menu-items"
import { colors, standardStyles } from "src/styles"
import { flex, flexRow, fonts, WHEN_MOBILE, WHEN_TABLET, whiteText } from "src/estyles"

const MENU = [
  menu.HOME,
  ...MAIN_MENU,
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
  menu.CODE_OF_CONDUCT,
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
          allStyle={[standardStyles.centered, darkMode && standardStyles.darkBackground]}
          desktopStyle={standardStyles.blockMarginTop}
          tabletStyle={standardStyles.blockMarginTopTablet}
          mobileStyle={standardStyles.blockMarginTopMobile}
        >
          <Cell
            span={Spans.half}
            tabletSpan={Spans.twoThird}
            style={[standardStyles.centered, styles.form]}
          >
            <img src={sendCoinIcon} css={emailLogoCss} width={50} height={50} />
            <p css={recieveUpdatesCss}>{t("receiveUpdates")}</p>
            <EmailForm submitText={t("signUp")} route={"contacts"} isDarkMode={false} />
          </Cell>
        </GridRow>
      )}
      <GridRow
        desktopStyle={standardStyles.blockMarginTop}
        tabletStyle={[standardStyles.blockMarginTopTablet, styles.column]}
        mobileStyle={standardStyles.blockMarginTopMobile}
        allStyle={darkMode && standardStyles.darkBackground}
      >
        <Cell span={Spans.third} tabletSpan={Spans.twoThird}>
          <div css={ringsCSS}>
            <RingsGlyph darkMode={darkMode} />
          </div>
          <Details darkMode={darkMode} />
        </Cell>
        <Cell span={Spans.twoThird} tabletSpan={Spans.full}>
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
        desktopStyle={standardStyles.blockMargin}
        tabletStyle={standardStyles.blockMarginTablet}
        mobileStyle={standardStyles.blockMarginMobile}
        allStyle={darkMode && standardStyles.darkBackground}
      >
        <Cell span={Spans.full} style={isMobile ? standardStyles.centered : styles.toes}>
          <Lazy unmountIfInvisible={true}>
            <ChangeStory darkMode={darkMode} />
          </Lazy>
          <small css={css(copyrightStyle, darkMode && whiteText)}>
            {t("footer.copyright", { year })}
          </small>
        </Cell>
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
  const fontStyling = css(
    fonts.legal,
    detailsTextCss,
    darkMode && whiteText,
  )
  return (
    <div css={detailsCss}>
      <p css={fontStyling}>{t("disclaimer")}</p>
      <p css={fontStyling}>
        <Trans ns={NameSpaces.common} i18nKey={"footerReadMoreTerms"}>
          <a css={hrefCss} href={menu.TERMS.link}>Terms of Service</a>
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
  color: "inherit"
})

const recieveUpdatesCss = css(
  fonts.body,
  {
    textAlign: "center",
    marginTop: 20,
    marginBottom: 10
  }
)

const detailsTextCss = css({
  marginBottom: 20,
  maxWidth: 350,
  textAlign: "left",
  [WHEN_MOBILE]: {
    textAlign: "center",
  },
})

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  form: {
    maxWidth: 550,
  },
  toes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
  transform: "translateY(-10px)",
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
