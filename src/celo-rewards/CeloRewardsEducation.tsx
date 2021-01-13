import * as React from "react";
import { StyleSheet, View } from "react-native";
import OpenGraph from "src/header/OpenGraph";
import { NameSpaces, Trans, useTranslation } from "src/i18n";
import VerticalSection from "src/layout/VerticalSection";
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
        <VerticalSection
          title={t("howItWorks.title")}
          headerStyle={styles.subtitle}
        >
          <P>
            <Trans t={t} i18nKey={"howItWorks.body"}>
              <InlineAnchor
                target="_blank"
                href={CeloLinks.fundWallet}
                style={styles.link}
              >
                {" "}
              </InlineAnchor>
            </Trans>
          </P>
        </VerticalSection>
        <VerticalSection
          title={t("cUsdVsCelo.title")}
          headerStyle={styles.subtitle}
        >
          <P>
            <Trans t={t} i18nKey={"cUsdVsCelo.body"}>
              <InlineAnchor
                target="_blank"
                href={CeloLinks.aboutCeloGovernance}
                style={styles.link}
              >
                {" "}
              </InlineAnchor>
            </Trans>
          </P>
        </VerticalSection>
        <VerticalSection
          title={t("structure.title")}
          headerStyle={styles.subtitle}
        >
          <P>{t("structure.body")}</P>
        </VerticalSection>
        <AddCusdButton />
        <VerticalSection
          title={t("questions.title")}
          headerStyle={[styles.subtitle, styles.questionHeader]}
          style={styles.questionsContainer}
        >
          <P style={styles.questionsBody}>
            <Trans t={t} i18nKey={"questions.body"}>
              <InlineAnchor
                href={"mailto:support@valoraapp.com"}
                style={styles.link}
              >
                {" "}
              </InlineAnchor>
            </Trans>
          </P>
        </VerticalSection>
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
    textDecorationLine: 'none',
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
