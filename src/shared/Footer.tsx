import * as React from "react"
import Lazy from "react-lazyload"
import { Image, StyleSheet, Text, View } from "react-native"
import EmailForm from "src/forms/EmailForm"
import { NameSpaces, Trans, useTranslation } from "src/i18n"
import Discord from "src/icons/Discord"
import Discourse from "src/icons/Discourse"
import Instagram from "src/icons/Instagram"
import MediumLogo from "src/icons/MediumLogo"
import Octocat from "src/icons/Octocat"
import DefiPulse from "src/icons/DefiPulse"
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
import FooterColumn from "src/shared/FooterColumn"
import InlineAnchor from "src/shared/InlineAnchor"
import menu, { CeloLinks, hashNav, MAIN_MENU } from "src/shared/menu-items"
import { colors, fonts, standardStyles, textStyles } from "src/styles"

const MENU = [
  menu.HOME,
  ...MAIN_MENU,
  {
    name: "annualReport",
    link: "https://drive.google.com/file/d/1V00HirrpwSaUsapZoWVglRexBvrFuud7/view",
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
const SOCIAL_MENU = [
  {
    name: "Blog",
    link: CeloLinks.mediumPublication,
    icon: <MediumLogo height={ICON_SIZE} color={colors.dark} wrapWithLink={false} />,
  },
  {
    name: "GitHub",
    link: CeloLinks.gitHub,
    icon: <Octocat size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Twitter",
    link: CeloLinks.twitter,
    icon: <TweetLogo height={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Forum",
    link: CeloLinks.discourse,
    icon: <Discourse size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Chat",
    link: CeloLinks.discord,
    icon: <Discord size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "YouTube",
    link: CeloLinks.youtube,
    icon: <YouTube size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Instagram",
    link: CeloLinks.instagram,
    icon: <Instagram size={ICON_SIZE} />,
  },
  {
    name: "Defi Pulse",
    link: CeloLinks.defiPulse,
    icon: <DefiPulse size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "LinkedIn",
    link: CeloLinks.linkedIn,
    icon: <LinkedIn size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Twitch",
    link: CeloLinks.twitch,
    icon: <Twitch size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Reddit",
    link: CeloLinks.reddit,
    icon: <Reddit size={ICON_SIZE} color={colors.dark} />,
  },
  {
    name: "Telegram",
    link: CeloLinks.telegram,
    icon: <Telegram size={ICON_SIZE} color={colors.dark} />,
  },
]

interface Props {
  hideForm?: boolean
}

export default function Footer({ hideForm }: Props) {
  const { t } = useTranslation(NameSpaces.common)
  const { isMobile, isTablet } = useScreenSize()
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
          allStyle={standardStyles.centered}
          desktopStyle={standardStyles.blockMarginTop}
          tabletStyle={standardStyles.blockMarginTopTablet}
          mobileStyle={standardStyles.blockMarginTopMobile}
        >
          <Cell
            span={Spans.half}
            tabletSpan={Spans.twoThird}
            style={[standardStyles.centered, styles.form]}
          >
            <Image resizeMode="contain" source={{ uri: sendCoinIcon }} style={styles.emailLogo} />
            <Text
              style={[
                fonts.p,
                textStyles.center,
                standardStyles.halfElement,
                standardStyles.elementalMarginTop,
              ]}
            >
              {t("receiveUpdates")}
            </Text>
            <EmailForm submitText={t("signUp")} route={"/contacts"} isDarkMode={false} />
          </Cell>
        </GridRow>
      )}
      <GridRow
        desktopStyle={standardStyles.blockMarginTop}
        tabletStyle={[standardStyles.blockMarginTopTablet, styles.column]}
        mobileStyle={standardStyles.blockMarginTopMobile}
      >
        <Cell span={Spans.third} tabletSpan={Spans.twoThird}>
          <View style={isMobile ? [standardStyles.centered, styles.ringsMobile] : styles.rings}>
            <RingsGlyph />
          </View>
          <Details />
        </Cell>
        <Cell span={Spans.twoThird} tabletSpan={Spans.full}>
          {isMobile ? (
            <MobileLinks footerMenu={footerMenu} />
          ) : (
            <View style={isTablet ? styles.linksAreaTablet : styles.linksArea}>
              <FooterColumn style={styles.linkColumnStart} heading={"Celo"} links={footerMenu} />
              <FooterColumn heading={t("footer.technology")} links={TECH_MENU} />
              <FooterColumn heading={t("footer.resources")} links={RESOURCE_MENU} />
              <FooterColumn
                style={styles.linkColumnEnd}
                heading={t("footer.social")}
                links={SOCIAL_MENU}
              />
            </View>
          )}
        </Cell>
      </GridRow>
      <GridRow
        desktopStyle={standardStyles.blockMargin}
        tabletStyle={standardStyles.blockMarginTablet}
        mobileStyle={standardStyles.blockMarginMobile}
      >
        <Cell span={Spans.full} style={isMobile ? standardStyles.centered : styles.toes}>
          <Lazy unmountIfInvisible={true}>
            <ChangeStory />
          </Lazy>
          <Text style={[fonts.legal, styles.copyright, isMobile && textStyles.center]}>
            {t("footer.copyright", { year })}
          </Text>
        </Cell>
      </GridRow>
    </>
  )
}

interface ModuleLinksProps {
  footerMenu: typeof MENU
}

function MobileLinks({ footerMenu }: ModuleLinksProps) {
  const { t } = useTranslation(NameSpaces.common)

  return (
    <>
      <View style={standardStyles.row}>
        <FooterColumn heading={"Celo"} links={footerMenu} />
        <FooterColumn
          heading={t("footer.social")}
          links={SOCIAL_MENU}
          style={styles.endMobileColumn}
        />
      </View>
      <View style={standardStyles.row}>
        <FooterColumn heading={t("footer.resources")} links={RESOURCE_MENU} />
        <FooterColumn
          heading={t("footer.technology")}
          links={TECH_MENU}
          style={styles.endMobileColumn}
        />
      </View>
    </>
  )
}

const Details = React.memo(function _Details() {
  const { t } = useTranslation(NameSpaces.common)
  const { isMobile } = useScreenSize()
  const fontStyling = [
    fonts.legal,
    styles.detailsText,
    !isMobile ? textStyles.left : textStyles.center,
  ]
  return (
    <View style={[styles.details, isMobile && standardStyles.centered]}>
      <Text style={fontStyling}>{t("disclaimer")}</Text>
      <Text style={fontStyling}>
        <Trans ns={NameSpaces.common} i18nKey={"footerReadMoreTerms"}>
          <InlineAnchor href={menu.TERMS.link}>Terms of Service</InlineAnchor>
        </Trans>
      </Text>
    </View>
  )
})

const styles = StyleSheet.create({
  column: {
    flexDirection: "column",
  },
  linksArea: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  linksAreaTablet: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  details: {
    paddingBottom: 20,
  },
  detailsText: {
    marginBottom: 20,
    maxWidth: 350,
  },
  ringsMobile: { marginBottom: 30 },
  rings: { marginBottom: 20, transform: [{ translateY: -10 }] },
  form: {
    maxWidth: 550,
  },
  emailLogo: { width: 50, height: 50, marginVertical: 10 },
  toes: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkColumnStart: {
    paddingStart: 0,
  },
  linkColumnEnd: {
    paddingEnd: 0,
  },
  endMobileColumn: {
    marginLeft: 20,
  },
  copyright: {
    zIndex: 10, // ensure copyright is above the sliding div from ChangeStory animation
  },
})
