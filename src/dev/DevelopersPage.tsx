import * as React from "react"
import { StyleSheet, View } from "react-native"
import previewImage from "src/dev/dev-og.png"
import DeveloperPhoneCover from "src/dev/DeveloperPhoneCover"
import { Contribute, EngageAsDeveloper } from "src/dev/Engage"
import Features from "src/dev/Features"
import FullStack from "src/dev/FullStack"
import { H2, H3 } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces, useTranslation } from "src/i18n"
import menuItems from "src/shared/menu-items"
import { standardStyles } from "src/styles"

export default function Developers() {
    const { t } = useTranslation(NameSpaces.dev)
    return (
      <View style={styles.container}>
        <OpenGraph
          image={previewImage}
          path={menuItems.BUILD.link}
          title={"Celo Developers | Celo SDK"}
          description={
            "Innovative tools to build native mobile dApps. Celo is a proof-of-stake based blockchain with smart contracts that allows for an ecosystem of powerful applications."
          }
        />
        <DeveloperPhoneCover />
        <FullStack />
        <Features />
        <EngageAsDeveloper>
          <H3 style={standardStyles.elementalMarginBottom}>{t("engage.developers.verb")}</H3>
          <H2 style={standardStyles.elementalMarginBottom}>{t("getInvolved")}</H2>
        </EngageAsDeveloper>
        <Contribute />
      </View>
    )
  }

const styles = StyleSheet.create({
  container: { scrollPadding: 20 },
})
