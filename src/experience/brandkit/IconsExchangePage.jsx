import frontMatter from "front-matter";
import * as React from "react";
import { StyleSheet, View } from "react-native";
import Page, { ICONS_PATH } from "src/experience/brandkit/common/Page";
import data from "src/experience/brandkit/content/exchange-icons.md";
import { AssetTypes, EXCHANGE_ICONS_PKG_TRACKING, trackDownload, } from "src/experience/brandkit/tracking";
import CCLicense from "src/experience/common/CCLicense";
import { brandStyles, GAP } from "src/experience/common/constants";
import IconShowcase from "src/experience/common/Showcase";
import Markdown from "src/experience/Markdown";
import { NameSpaces, useTranslation } from "src/i18n";
import Button, { BTN } from "src/shared/Button.3";
import { hashNav } from "src/shared/menu-items";
import { standardStyles } from "src/styles";
const icons = [
    {
        name: "CELO Exchange Icon",
        description: "Full Color\n",
        preview: "/images/marketplace-icons/icon-celo-CELO-color-f.svg",
        uri: "/assets/marketplace-icons/CELO-Full-Color.zip",
    },
    {
        name: "cUSD Exchange Icon",
        description: "Full Color\n",
        preview: "/images/marketplace-icons/icon-celo-dollar-color.svg",
        uri: "/assets/marketplace-icons/icon-cusd-color-v2.zip",
    },
    {
        name: "cEUR Exchange Icon",
        description: "Full Color\n",
        preview: "/images/marketplace-icons/icon-cEUR-color.svg",
        uri: "/assets/marketplace-icons/icon-cEUR-color.zip",
    },
    null,
    {
        name: "CELO Exchange Icon",
        description: "Monochrome\n",
        preview: "/images/marketplace-icons/icon-celo-CELO-mono-f.svg",
        uri: "/assets/marketplace-icons/icon-CELO-monochrome.zip",
        variant: "circle-white",
    },
    {
        name: "cUSD Exchange Icon",
        description: "Monochrome\n",
        preview: "/images/marketplace-icons/icon-cUSD-mono.svg",
        uri: "/assets/marketplace-icons/icon-cusd-mono-v2.zip",
        variant: "circle-white",
    },
    {
        name: "cEUR Exchange Icon",
        description: "Monochrome\n",
        preview: "/images/marketplace-icons/icon-celo-euro-mono.svg",
        uri: "/assets/marketplace-icons/icons-celo-euro-monochrome.zip",
        variant: "circle-white",
    },
    null,
    {
        name: "CELO Exchange Icon",
        description: "Reverse Monochrome\n",
        preview: "/images/marketplace-icons/icon-celo-CELO-reverse-f.svg",
        uri: "/assets/marketplace-icons/icon-CELO-reverse-monochrome.zip",
        variant: "circle-black",
    },
    {
        name: "cUSD Exchange Icon",
        description: "Reverse Monochrome\n",
        preview: "/images/marketplace-icons/icon-celo-dollar-reverse.svg",
        uri: "/assets/marketplace-icons/icon-cusd-reverse-v2.zip",
        variant: "circle-black",
    },
    {
        name: "cEUR Exchange Icon",
        description: "Reverse Monochrome\n",
        preview: "/images/marketplace-icons/icon-celo-euro-reverse.svg",
        uri: "/assets/marketplace-icons/icons-celo-euro-reverse.zip",
        variant: "circle-black",
    },
];
const info = frontMatter(data);
const IconExchangePage = React.memo(() => {
    return (<Page title={info.attributes.title} metaDescription={info.attributes.description} path={ICONS_PATH} sections={[{ id: hashNav.brandIcons.overview, children: <Overview /> }]}/>);
});
export default IconExchangePage;
function Overview() {
    const { t } = useTranslation(NameSpaces.brand);
    const onPressDownload = React.useCallback(async () => {
        await trackDownload(EXCHANGE_ICONS_PKG_TRACKING);
    }, []);
    return (<View style={styles.container}>
      <View style={brandStyles.gap}>
        <Markdown source={info.body}/>
        <Button kind={BTN.PRIMARY} text={t("logo.overviewBtn")} style={standardStyles.elementalMarginTop} onPress={onPressDownload} href="/assets/marketplace-icons/CeloMarketplaceIcons.zip"/>
      </View>
      <CCLicense textI18nKey="exchangeIcons.license"/>

      <View style={styles.root}>
        <View style={brandStyles.tiling}>
          {icons.map((icon, i) => icon === null ? (<View key={i} style={styles.break}/>) : (<View key={i}>
                <IconShowcase key={i} ratio={1} variant={(icon.variant || "circle")} description={icon.description} name={icon.name} preview={icon.preview} uri={icon.uri} loading={false} assetType={AssetTypes.icon} size={160}/>
              </View>))}
        </View>
      </View>
    </View>);
}
const styles = StyleSheet.create({
    container: { paddingHorizontal: GAP },
    root: { minHeight: "75vh" },
    break: {
        width: "100%",
        display: "block",
    },
});
//# sourceMappingURL=IconsExchangePage.jsx.map