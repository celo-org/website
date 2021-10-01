import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { H1 } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import SideTitledSection from "src/layout/SideTitledSection"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { fonts, standardStyles, textStyles } from "src/styles"
import { HelpfulLink } from "./HelpfulLink"
import whitePaperImage from "./celo-whitepapers.jpg"
import { useTranslation } from "src/i18n"



function Papers() {
    const { t } = useTranslation(NameSpaces.papers)


    return (
      <>
        <OpenGraph
          title={t("title")}
          path={NameSpaces.papers}
          description={t("metaDescription")}
          image={whitePaperImage}
        />
        <View style={styles.container}>
          <GridRow
            allStyle={standardStyles.centered}
            desktopStyle={standardStyles.blockMarginBottom}
            tabletStyle={standardStyles.blockMarginBottomTablet}
            mobileStyle={standardStyles.blockMarginBottomMobile}
          >
            <Cell span={Spans.three4th} style={standardStyles.centered}>
              <H1 style={textStyles.center}>{t("title")}</H1>
            </Cell>
          </GridRow>
          <SideTitledSection span={Spans.three4th} title={t("protocol")}>
            <Text style={fonts.p}>{t("whitepaperTitle")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/whitepaper"} />
              <HelpfulLink text={"阅读"} href={"/papers/whitepaper/chinese"} />
            </View>
          </SideTitledSection>
          <SideTitledSection span={Spans.three4th} title={""}>
            <Text style={fonts.p}>{t("plumoTitle")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/plumo"} />
            </View>
          </SideTitledSection>
          <SideTitledSection span={Spans.three4th} title={t("economics")}>
            <Text style={fonts.p}>{t("stabilityTitle")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/stability"} />
            </View>
          </SideTitledSection>
          <SideTitledSection span={Spans.three4th} title={""}>
            <Text style={fonts.p}>{t("velocityTitle")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/cbdc-velocity"} />
              <HelpfulLink text={"Lee el informe"} href={"/papers/cbdc-velocity/spanish"} />
            </View>
          </SideTitledSection>
          <SideTitledSection span={Spans.three4th} title={""}>
            <Text style={fonts.p}>{t("futureCurrency")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/future-of-digital-currencies"} />
            </View>
          </SideTitledSection>
          <SideTitledSection span={Spans.three4th} title={t("socialImpact")}>
            <Text style={fonts.p}>{t("futureProof")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/future-proof-aid"} />
              <HelpfulLink text={t("exec")} href={"/papers/future-proof-exec"} />
            </View>
          </SideTitledSection>
          <SideTitledSection span={Spans.three4th} title={""}>
            <Text style={fonts.p}>{t("grameenCovid")}</Text>
            <View style={styles.links}>
              <HelpfulLink text={t("download")} href={"/papers/covid-aid"} />
            </View>
          </SideTitledSection>
        </View>
      </>
    )
}

export default Papers

const styles = StyleSheet.create({
  container: {
    marginTop: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },
  links: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  link: {
    marginRight: 30,
  },
})
