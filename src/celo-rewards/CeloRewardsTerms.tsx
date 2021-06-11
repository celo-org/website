import { TFunction } from "next-i18next"
import * as React from "react"
import { Text, StyleSheet, View } from "react-native"
import { Li, Ol, Ul } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces, Trans, useTranslation } from "src/i18n"
import InlineAnchor from "src/shared/InlineAnchor"
import menuItems, { CeloLinks } from "src/shared/menu-items"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { colors, typeFaces } from "src/styles"
import { P } from "./stylingElements"
import TierList from "./TierList"
import TitleAndDescription from "./TitleAndDescription"

enum ComponentType {
  BOLD,
  LINK,
}

interface BoldComponent {
  type: ComponentType.BOLD
}
interface LinkComponent {
  type: ComponentType.LINK
  link: string
}

const bold = (): BoldComponent => ({ type: ComponentType.BOLD })
const link = (uri: string): LinkComponent => ({
  type: ComponentType.LINK,
  link: uri,
})

type TextComponent = BoldComponent | LinkComponent

const decorateText = (t: TFunction, key: string, components: TextComponent[]) => {
  return (
    <Trans i18nKey={NameSpaces.celoRewards} defaults={t(key)}>
      {components.map((component, i) => {
        if (component.type === ComponentType.BOLD) {
          return <Text key={i} style={styles.bold} />
        }
        if (component.type === ComponentType.LINK) {
          return (
            <InlineAnchor target="_blank" href={component.link} style={styles.link} key={i}>
              {" "}
            </InlineAnchor>
          )
        }
      })}
    </Trans>
  )
}

function CeloRewardsTerms() {
  const { t } = useTranslation(NameSpaces.celoRewards)

  return (
    <>
      <OpenGraph
        title={t("title")}
        path={menuItems.CELO_REWARDS_TERMS.link}
        description={t("description.first")}
      />
      <View style={styles.container}>
        <TitleAndDescription title={t("terms.title")} />
        <TitleAndDescription
          title={t("terms.howItWorks.title")}
          description={
            <Ol>
              <Li style={styles.listItem}>
                {decorateText(t, "terms.howItWorks.1", [bold(), link(CeloLinks.fundWallet)])}
              </Li>
              <Li style={styles.listItem}>{decorateText(t, "terms.howItWorks.2", [bold()])}</Li>
              <Li style={styles.listItem}>
                {decorateText(t, "terms.howItWorks.3", [bold()])}
                <br />
                <TierList baseTranslation="terms.tiers" totalTiers={3} includeTitle={false} />
              </Li>
              <Li style={styles.listItem}>{decorateText(t, "terms.howItWorks.4", [bold()])}</Li>
              <Li style={styles.listItem}>{decorateText(t, "terms.howItWorks.5", [bold()])}</Li>
            </Ol>
          }
        />
        <TitleAndDescription
          title={t("terms.moreDetails.title")}
          description={
            <Ul>
              <Li style={styles.listItem}>
                {decorateText(t, "terms.moreDetails.1", [bold(), link(CeloLinks.confirmNumber)])}
              </Li>
              <Li style={styles.listItem}>{t("terms.moreDetails.2")}</Li>
              <Li style={styles.listItem}>
                {t("terms.moreDetails.3")}
                <br />
                <Ul style={styles.nestedList}>
                  <Li style={styles.listItem}>{t("terms.moreDetails.3-1")}</Li>
                </Ul>
              </Li>
              <Li style={styles.listItem}>
                {decorateText(t, "terms.moreDetails.4", [bold()])}
                <br />
                <Ul style={styles.nestedList}>
                  <Li style={styles.listItem}>{t("terms.moreDetails.4-1")}</Li>
                  <Li style={styles.listItem}>{t("terms.moreDetails.4-2")}</Li>
                  <Li style={styles.listItem}>{t("terms.moreDetails.4-3")}</Li>
                  <Li style={styles.listItem}>{t("terms.moreDetails.4-4")}</Li>
                </Ul>
              </Li>
              <Li style={styles.listItem}>
                {decorateText(t, "terms.moreDetails.5", [bold()])}
                <br />
                <Ul style={styles.nestedList}>
                  <Li style={styles.listItem}>{t("terms.moreDetails.5-1")}</Li>
                </Ul>
              </Li>
              <Li style={styles.listItem}>
                {decorateText(t, "terms.moreDetails.6", [bold()])}
                <br />
                <Ul style={styles.nestedList}>
                  <Li style={styles.listItem}>{t("terms.moreDetails.6-1")}</Li>
                </Ul>
              </Li>
            </Ul>
          }
        />
        <TitleAndDescription
          title={t("terms.celoAndCusd.title")}
          description={
            <Ul>
              <Li style={styles.listItem}>{t("terms.celoAndCusd.1")}</Li>
              <Li style={styles.listItem}>{t("terms.celoAndCusd.2")}</Li>
            </Ul>
          }
        />
        <TitleAndDescription
          title={t("terms.rewardsTroubleShoot.title")}
          description={
            <>
              <P>{t("terms.rewardsTroubleShoot.description")}</P>
              <br />
              <Ul>
                <Li style={styles.listItem}>
                  {decorateText(t, "terms.rewardsTroubleShoot.1", [bold()])}
                </Li>
                <Li style={styles.listItem}>
                  {decorateText(t, "terms.rewardsTroubleShoot.2", [bold()])}
                  <br />
                  <Ul style={styles.nestedList}>
                    <Li style={styles.listItem}>{t("terms.rewardsTroubleShoot.2-1")}</Li>
                    <Li style={styles.listItem}>{t("terms.rewardsTroubleShoot.2-2")}</Li>
                    <Li style={styles.listItem}>{t("terms.rewardsTroubleShoot.2-3")}</Li>
                    <Li style={styles.listItem}>{t("terms.rewardsTroubleShoot.2-4")}</Li>
                  </Ul>
                </Li>
                <Li style={styles.listItem}>
                  {decorateText(t, "terms.rewardsTroubleShoot.3", [bold()])}
                </Li>
              </Ul>
            </>
          }
        />
        <TitleAndDescription
          title={t("terms.notices.title")}
          description={decorateText(t, "terms.notices.body", [
            link(CeloLinks.communityFund),
            link(CeloLinks.celoRewardsDiscussion),
          ])}
        />
        <TitleAndDescription
          title={t("terms.liability.title")}
          description={t("terms.liability.body")}
        />
      </View>
    </>
  )
}

export default CeloRewardsTerms

const styles = StyleSheet.create({
  container: {
    marginTop: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },
  listItem: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: typeFaces.futura,
  },
  nestedList: { listStyle: "circle" },
  bold: {
    fontWeight: "500",
  },
  link: {
    color: colors.greenUI,
    textDecorationLine: "none",
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
})
