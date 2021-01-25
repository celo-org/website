import * as React from "react";
import { StyleSheet, View } from "react-native";
import OpenGraph from "src/header/OpenGraph";
import { NameSpaces, useTranslation } from "src/i18n";
import menuItems from "src/shared/menu-items";
import { HEADER_HEIGHT } from "src/shared/Styles";
import { colors, typeFaces } from "src/styles";
import TitleAndDescription from "./TitleAndDescription";

function CeloRewardsTerms({}) {
  const { t } = useTranslation(NameSpaces.celoRewards);

  return (
    <>
      <OpenGraph
        title={t("title")}
        path={menuItems.CELO_REWARDS_TERMS.link}
        description={t("description")}
      />
      <View style={styles.container}>
        <TitleAndDescription
          title={t("terms.title")}
          description={t("terms.body")}
        />
      </View>
    </>
  );
}

export default CeloRewardsTerms;

const styles = StyleSheet.create({
  container: {
    marginTop: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },
  learnMore: {
    display: "flex",
    justifyContent: "center",
    fontFamily: typeFaces.futura,
    fontSize: 17,
    fontWeight: "500",
    marginBottom: 20,
    color: colors.greenUI,
  },
});
