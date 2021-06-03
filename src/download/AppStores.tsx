import * as React from "react"
import { View } from "react-native"
import { H1 } from "src/fonts/Fonts"
import { Adventure } from "src/home/Adventure"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { CeloLinks } from "src/shared/menu-items"
import { standardStyles, textStyles } from "src/styles"

export default withNamespaces(NameSpaces.download)(
  React.memo(function AppStores({ t }: I18nProps) {
    return (
      <View>
        <GridRow
          desktopStyle={standardStyles.sectionMargin}
          tabletStyle={standardStyles.sectionMarginTablet}
          mobileStyle={standardStyles.sectionMarginMobile}
          allStyle={standardStyles.centered}
        >
          <Cell span={Spans.half}>
            <H1 style={[textStyles.center, standardStyles.elementalMargin]} ariaLevel={"2"}>
              {t("needRealWallet")}
            </H1>
          </Cell>
        </GridRow>
        <GridRow allStyle={standardStyles.centered}>
          <Adventure
            source={require("src/icons/valora-icon.png")}
            title="Valora"
            text="For iOS and Android"
            link={{ text: "Get Valora", href: CeloLinks.valora }}
          />
          <Adventure
            source={require("src/icons/06-Celo-Coins-light.png")}
            title="Celo Web Wallet"
            text="For web browsers"
            link={{ text: "Go to Celo Web Wallet", href: CeloLinks.celoWebWallet }}
          />
        </GridRow>
      </View>
    )
  })
)
