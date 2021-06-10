import * as React from "react"
import { StyleSheet, View } from "react-native"
import OpenGraph from "src/header/OpenGraph"
import celoHero from "src/home/celo-hero.png"
import HomeBackers from "src/home/HomeBackers"
import Involvement from "src/home/Involvement"
import HomeBuild from "src/home/HomeBuild"
import { TwoAssets } from "src/home/TwoAssets"
import { NameSpaces, useTranslation } from "src/i18n"
import Cover from "./Cover"
import Press from "src/press/Press"
import { useScreenSize } from "src/layout/ScreenSize"
export default function Home() {
  const { t } = useTranslation(NameSpaces.home)
  const { isMobile } = useScreenSize()
  return (
    <View style={styles.container}>
      <OpenGraph
        title={t("pageTitle")}
        description={t("pageDescription")}
        path={"/"}
        image={celoHero}
      />
      <Cover />
      {!isMobile && <Press />}
      <HomeBuild />
      <TwoAssets />
      <Involvement />
      <HomeBackers />
    </View>
  )
}

Home.getInitialProps = () => {
  return { namespaces: [NameSpaces.home, NameSpaces.common] }
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    overflow: "hidden",
    maxWidth: "100vw",
  },
})
