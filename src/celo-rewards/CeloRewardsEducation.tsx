import * as React from "react";
import { StyleSheet, View } from "react-native";
import OpenGraph from "src/header/OpenGraph";
import { NameSpaces, Trans, useTranslation } from "src/i18n";
import InlineAnchor from "src/shared/InlineAnchor";
import menuItems, { CeloLinks } from "src/shared/menu-items";
import { colors } from "src/styles";
import AddCusdButton from "./AddCusdButton";
import TitleAndDescription, { P } from "./TitleAndDescription";

export interface Props {
  title: string;
}

function CeloRewardsEducation({}) {
  const { t } = useTranslation(NameSpaces.celoRewards);

  return (
    <>
      <OpenGraph
        title={t("title")}
        path={menuItems.CELO_REWARDS_EDUCATION.link}
        description={t("description")}
      />
      <View style={styles.container}>
        <TitleAndDescription
          title={t("title")}
          description={t("description")}
        />
        <TitleAndDescription
          title={t("howItWorks.title")}
          titleStyle={styles.subtitle}
          description={
            <Trans t={t} i18nKey={"howItWorks.body"}>
              <InlineAnchor
                target="_blank"
                href={CeloLinks.fundWallet}
                style={styles.link}
              >
                {" "}
              </InlineAnchor>
            </Trans>
          }
        />
        <TitleAndDescription
          title={t("cUsdVsCelo.title")}
          titleStyle={styles.subtitle}
          description={
            <Trans t={t} i18nKey={"cUsdVsCelo.body"}>
              <InlineAnchor
                target="_blank"
                href={CeloLinks.aboutCeloGovernance}
                style={styles.link}
              >
                {" "}
              </InlineAnchor>
            </Trans>
          }
        />

        <TitleAndDescription
          title={t("structure.title")}
          titleStyle={styles.subtitle}
          description={t("structure.body")}
        />
        <AddCusdButton />
        <TitleAndDescription
          title={t("questions.title")}
          style={styles.questionsContainer}
          titleStyle={[styles.subtitle, styles.questionHeader]}
          descriptionStyle={styles.questionsBody}
          description={
            <Trans t={t} i18nKey={"questions.body"}>
              <InlineAnchor
                href={"mailto:support@valoraapp.com"}
                style={styles.link}
              >
                {" "}
              </InlineAnchor>
            </Trans>
          }
        />
      </View>
    </>
  );
}

export default CeloRewardsEducation;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  link: {
    color: colors.greenUI,
    textDecorationLine: "none",
  },
  subtitle: {
    fontSize: 22,
    lineHeight: 26,
    fontWeight: "500",
  },
  questionsContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  questionHeader: {
    marginBottom: 4,
  },
  questionsBody: {
    textAlign: "center",
    marginBottom: 40,
  },
});
