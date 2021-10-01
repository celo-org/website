import * as React from "react"
import { StyleSheet } from "react-native"
import CoverAction from "src/dev/CoverAction"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { ScreenProps, ScreenSizes, withScreenSize } from "src/layout/ScreenSize"
import { CeloLinks } from "src/shared/menu-items"
import { standardStyles } from "src/styles"
// import exchangeImg from "src/download/exchange.png"
// import faucetImage from "src/dev/Faucet.png"
// import paymentImg from "src/download/payments.png"
import coin from "src/download/Coins_Blush.svg"
import code from "src/download/Code_Blush.svg"
import ox from "src/download/Ox_Blush.svg"

type Props = I18nProps & ScreenProps

export default withNamespaces(NameSpaces.download)(
  withScreenSize<Props>(function CoverActions({ t, screen }: Props) {
    return (
      <GridRow
        desktopStyle={standardStyles.sectionMarginBottom}
        tabletStyle={standardStyles.sectionMarginBottomTablet}
        mobileStyle={standardStyles.sectionMarginMobile}
      >
        <Cell
          span={Spans.full}
          style={screen === ScreenSizes.MOBILE ? styles.mainMobile : styles.main}
        >
          <CoverAction
            graphic={code}
            isMobile={screen === ScreenSizes.MOBILE}
            title={t("coverAction.faucet.title")}
            text={t("coverAction.faucet.text")}
            style={styles.actionStyle}
            link={{ text: t("coverAction.faucet.link"), href: CeloLinks.faucet }}
          />

          <CoverAction
            graphic={ox}
            isMobile={screen === ScreenSizes.MOBILE}
            title={t("coverAction.payments.title")}
            text={t("coverAction.payments.text")}
          />
          <CoverAction
            graphic={coin}
            isMobile={screen === ScreenSizes.MOBILE}
            title={t("coverAction.exchange.title")}
            text={t("coverAction.exchange.text")}
          />
        </Cell>
      </GridRow>
    )
  })
)

const styles = StyleSheet.create({
  main: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    maxWidth: "100%",
  },
  mainMobile: { justifyContent: "space-around", flexDirection: "column", maxWidth: "100%" },
  actionStyle: {
    justifyContent: "flex-start",
  },
})
