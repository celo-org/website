import * as React from "react";
import { View } from "react-native";
import { H1 } from "src/fonts/Fonts";
import { Adventure } from "src/home/Adventure";
import { NameSpaces, withNamespaces } from "src/i18n";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import { CeloLinks } from "src/shared/menu-items";
import { standardStyles, textStyles } from "src/styles";
import ValoraLogo from "src/icons/valora-icon.png";
import Walletlogo from "src/icons/06-Celo-Coins-light.png";
export default withNamespaces(NameSpaces.download)(React.memo(function AppStores({ t }) {
    return (<View>
        <GridRow desktopStyle={standardStyles.sectionMargin} tabletStyle={standardStyles.sectionMarginTablet} mobileStyle={standardStyles.sectionMarginMobile} allStyle={standardStyles.centered}>
          <Cell span={Spans.half}>
            <H1 style={[textStyles.center, standardStyles.elementalMargin]} ariaLevel={"2"}>
              {t("needRealWallet")}
            </H1>
          </Cell>
        </GridRow>
        <GridRow allStyle={standardStyles.centered}>
          <Adventure source={ValoraLogo} title="Valora" text="For iOS and Android" link={{ text: "Get Valora", href: CeloLinks.valora }}/>
          <Adventure source={Walletlogo} title="Celo Web Wallet" text="For web browsers" link={{ text: "Go to Celo Web Wallet", href: CeloLinks.celoWebWallet }}/>
        </GridRow>
      </View>);
}));
//# sourceMappingURL=AppStores.jsx.map