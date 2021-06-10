import * as React from "react"
import { StyleSheet, View } from "react-native"
import AppLogo from "src/download/AppLogo"
import PhoneIllo from "src/download/PhoneIllo"
import { H1, H4 } from "src/fonts/Fonts"
import { NameSpaces, useTranslation } from "src/i18n"
import Android from "src/icons/Android"
import Apple from "src/icons/Apple"
import Web from "src/icons/Web"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { ScreenSizes, useScreenSize } from "src/layout/ScreenSize"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import { CeloLinks } from "src/shared/menu-items"
import { colors, standardStyles, textStyles } from "src/styles"

export default function DownloadCover() {
  const { isMobile, isTablet, screen } = useScreenSize()
  const { t } = useTranslation(NameSpaces.download)
  return (
    <View style={styles.zIndex}>
      <GridRow
        allStyle={standardStyles.centered}
        desktopStyle={standardStyles.sectionMargin}
        tabletStyle={standardStyles.sectionMarginTablet}
        mobileStyle={standardStyles.blockMarginMobile}
      >
        <Cell
          span={Spans.three4th}
          tabletSpan={Spans.full}
          style={[
            styles.container,
            isTablet && { justifyContent: "center" },
            !isMobile ? standardStyles.row : styles.mobileContainer,
          ]}
        >
          <View style={[styles.flex1, styles.content, isMobile && standardStyles.centered]}>
            <AppLogo />
            <H1 style={[textStyles.invert, isMobile ? styles.titleMobile : styles.title]}>
              {t("coverTitle")}
            </H1>
            <H4 style={[textStyles.invert, isMobile && textStyles.center]}>{t("coverSubTitle")}</H4>
            <Button
              onPress={confirm}
              style={styles.button}
              iconLeft={<Android size={18} color={colors.primary} />}
              kind={BTN.NAKED}
              size={SIZE.big}
              text={"Android"}
              target="_blank"
              href={CeloLinks.playStoreDevWallet}
            />
            <Button
              onPress={confirm}
              style={styles.button}
              iconLeft={<Apple size={18} color={colors.primary} />}
              kind={BTN.NAKED}
              size={SIZE.big}
              text={"iOS"}
              target="_blank"
              href={CeloLinks.appStoreDevWallet}
            />
            <Button
              onPress={confirm}
              style={styles.button}
              iconLeft={<Web color={colors.primary} size={18} />}
              kind={BTN.NAKED}
              size={SIZE.big}
              target="_blank"
              text={"Web"}
              href={CeloLinks.alfajoresWebWallet}
            />
          </View>
          <View style={[standardStyles.centered, styles.flex1, phoneStyle(screen)]}>
            <PhoneIllo />
          </View>
        </Cell>
      </GridRow>
    </View>
  )
}

function confirm() {
  alert("I understand this is a testing wallet for developers")
}

function phoneStyle(screen: ScreenSizes) {
  switch (screen) {
    case ScreenSizes.MOBILE:
      return styles.mobilePhone
    case ScreenSizes.TABLET:
      return styles.tabletPhone
    default:
      return styles.phone
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
  },
  container: {
    justifyContent: "space-between",
  },
  mobileContainer: {
    flexDirection: "column-reverse",
    alignItems: "center",
  },
  title: {
    marginTop: 20,
  },
  titleMobile: { marginTop: 20, textAlign: "center" },
  flex1: {
    flex: 1,
  },
  content: {
    justifyContent: "center",
    marginHorizontal: 20,
    maxWidth: 350,
  },
  phone: {
    height: "50vh",
    maxWidth: 275,
  },
  tabletPhone: {
    height: "35vh",
    maxWidth: 240,
  },
  mobilePhone: {
    height: "33vh",
    maxHeight: 300,
    marginBottom: 20,
    maxWidth: "60vw",
  },
  zIndex: {
    zIndex: 20,
  },
})
