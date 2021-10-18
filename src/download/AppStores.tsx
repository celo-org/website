import * as React from "react"
import { Adventure } from "src/home/Adventure"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/Grid2"
import { CeloLinks } from "src/shared/menu-items"
import {
  fonts,
  standardStyles,
  textStyles,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
} from "src/estyles"
import ValoraLogo from "src/icons/valora-icon.png"
import Walletlogo from "src/icons/06-Celo-Coins-light.png"
import Terminallogo from "./terminal-logo.png"
import { css } from "@emotion/react"

export default withNamespaces(NameSpaces.download)(
  React.memo(function AppStores({ t }: I18nProps) {
    return (
      <>
        <GridRow columns={1} css={mainStyle}>
          <Cell span={Spans.one} css={standardStyles.centered}>
            <h2 css={titleCss}>{t("needRealWallet")}</h2>
          </Cell>
        </GridRow>
        <GridRow columns={3} css={standardStyles.centered}>
          <Adventure
            source={ValoraLogo}
            title="Valora"
            text="For iOS and Android"
            link={{ text: "Get Valora", href: CeloLinks.valora }}
          />
          <Adventure
            source={Walletlogo}
            title="Celo Web Wallet"
            text="For web browsers"
            link={{ text: "Go to Celo Web Wallet", href: CeloLinks.celoWebWallet }}
          />
          <Adventure
            source={Terminallogo}
            title="Celo Terminal"
            text="For mac, windows, and linux"
            link={{ text: "Get to Celo Terminal", href: CeloLinks.celoWebWallet }}
          />
        </GridRow>
      </>
    )
  })
)

const titleCss = css(fonts.h1, textStyles.center, standardStyles.elementalMargin, {
  maxWidth: 600,
})

const mainStyle = css(standardStyles.centered, {
  [WHEN_MOBILE]: standardStyles.sectionMarginMobile,
  [WHEN_TABLET]: standardStyles.sectionMarginTablet,
  [WHEN_DESKTOP]: standardStyles.sectionMargin,
})
