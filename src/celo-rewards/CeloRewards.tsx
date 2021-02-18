import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import OpenGraph from "src/header/OpenGraph";
import { NameSpaces, useTranslation } from "src/i18n";
import Link from "src/shared/Link";
import menuItems, { pagePaths } from "src/shared/menu-items";
import { colors, typeFaces } from "src/styles";
import AddCusdButton from "./AddCusdButton";
import RewardsKickOff from "./RewardsKickOff";
import TierList from "./TierList";
import TitleAndDescription from "./TitleAndDescription";

function CeloRewards({}) {
  const { t } = useTranslation(NameSpaces.celoRewards);

  return (
    <>
      <OpenGraph
        title={t("title")}
        path={menuItems.CELO_REWARDS.link}
        description={t("description")}
      />
      <View style={styles.container}>
        <TitleAndDescription
          title={t("title")}
          description={
            <>
              {t("description.first")}
              {"\n"}
              <TierList baseTranslation="description" totalTiers={3} />
              {"\n"}
              {t("description.second")}
            </>
          }
        />
        <RewardsKickOff />
        <AddCusdButton />
        <Link href={pagePaths.CELO_REWARDS_TERMS.link} passHref={true}>
          <Text
            accessibilityRole="link"
            style={styles.learnMore}
            testID="learnMore"
          >
            {t("learnMore")}
          </Text>
        </Link>
      </View>
    </>
  );
}

CeloRewards.getInitialProps = async () => ({
  namespacesRequired: [NameSpaces.celoRewards],
});

export default CeloRewards;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
