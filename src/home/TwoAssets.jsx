import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { H2, H4 } from "src/fonts/Fonts";
import { NameSpaces, useTranslation } from "src/i18n";
import ExchangeCELO from "src/icons/ExchangeIconCELO";
import BigStables from "src/home/stables.svg";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import { ScreenSizes, useScreenSize } from "src/layout/ScreenSize";
import RingsGlyph from "src/logos/RingsGlyph";
import Button, { BTN, SIZE } from "src/shared/Button.3";
import menuItems from "src/shared/menu-items";
import { fonts, standardStyles, textStyles } from "src/styles";
const ICON_SIZE = 60;
export function TwoAssets() {
    const { t } = useTranslation(NameSpaces.home);
    return (<View style={standardStyles.darkBackground}>
      <GridRow desktopStyle={standardStyles.sectionMarginTop} tabletStyle={standardStyles.sectionMarginTopTablet} mobileStyle={standardStyles.sectionMarginTopMobile} allStyle={standardStyles.centered}>
        <Cell span={Spans.half} style={standardStyles.centered}>
          <RingsGlyph darkMode={true} height={40}/>
          <H2 style={[
            textStyles.invert,
            textStyles.center,
            standardStyles.elementalMargin,
            styles.title,
        ]}>
            {t("twoMoneyTitle")}
          </H2>
        </Cell>
      </GridRow>
      <GridRow desktopStyle={standardStyles.blockMarginBottom} tabletStyle={standardStyles.blockMarginBottomTablet} mobileStyle={standardStyles.blockMarginBottomMobile}>
        <AssetToken ticker="cUSD & cEUR" info={t("stableCoins")} icon={<img src={BigStables.src} width={132} height={ICON_SIZE} style={{ marginBottom: 20 }}/>}>
          <Button kind={BTN.NAKED} text={t("stabilityPaper")} href={menuItems.PAPERS.link} size={SIZE.normal}/>
          <Button target={"_blank"} kind={BTN.NAKED} style={{ marginVertical: 16 }} text={t("celoDollars")} href={"https://medium.com/celoorg/celo-dollars-powerful-new-digital-money-in-circulation-b4147eda2d10"} size={SIZE.normal}/>
          <Button target={"_blank"} kind={BTN.NAKED} text={t("celoEuros")} href={"https://medium.com/celoorg/deutsche-telekom-joins-celo-ecosystem-as-the-first-mobile-carrier-amid-launch-of-ceur-stablecoin-2b79aae38540"} size={SIZE.normal}/>
        </AssetToken>
        <AssetToken ticker="CELO" info={t("CELOinfo")} icon={<View style={styles.image}>
              <ExchangeCELO size={ICON_SIZE}/>
            </View>}>
          <Button target={"_blank"} kind={BTN.NAKED} text={t("viewReserve")} href={"https://celoreserve.org"} size={SIZE.normal}/>
          <Button kind={BTN.NAKED} text={t("learnGovernance")} href={"https://medium.com/celoorg/celo-gold-holders-make-your-voice-heard-through-on-chain-governance-96cb5a1e8b90"} size={SIZE.normal}/>
        </AssetToken>
      </GridRow>
    </View>);
}
function getMargin(screen) {
    switch (screen) {
        case ScreenSizes.DESKTOP:
            return standardStyles.blockMarginTop;
        case ScreenSizes.TABLET:
            return standardStyles.blockMarginTopTablet;
        default:
            return standardStyles.blockMarginTopMobile;
    }
}
function AssetToken({ ticker, info, icon, children }) {
    const { screen } = useScreenSize();
    const containerStyle = [getMargin(screen), styles.container];
    return (<Cell span={Spans.half} style={containerStyle}>
      <View style={styles.root}>
        <View>
          {icon}
          <H4 style={textStyles.readingOnDark}>{ticker}</H4>
          <Text style={[
            fonts.p,
            textStyles.readingOnDark,
            standardStyles.halfElement,
            standardStyles.elementalMarginBottom,
        ]}>
            {info}
          </Text>
        </View>
        <View style={styles.governanceLinks}>{children}</View>
      </View>
    </Cell>);
}
const styles = StyleSheet.create({
    container: {
        alignItems: "center",
    },
    governanceLinks: {
        minHeight: 50,
        justifyContent: "space-between",
    },
    root: {
        maxWidth: 330,
        flex: 1,
        justifyContent: "space-between",
    },
    title: {
        maxWidth: 380,
    },
    image: {
        overflow: "hidden",
        width: ICON_SIZE,
        height: ICON_SIZE,
        marginBottom: 20,
        borderRadius: ICON_SIZE,
    },
});
//# sourceMappingURL=TwoAssets.jsx.map