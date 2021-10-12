import * as React from "react"
import { StyleSheet, View } from "react-native"
import AppStores from "src/download/AppStores"
import Cover from "src/download/Cover"
import CoverActions from "src/download/CoverActions"
import OpenGraph from "src/header/OpenGraph"
import { CeloLinks } from "src/shared/menu-items"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { colors } from "src/colors"
import openGraph from "src/download/ogimage-wallet.png"

export default class MobileApp extends React.PureComponent {
  render() {
    return (
      <>
        <View style={styles.cover}>
          <OpenGraph
            title={"Celo Test Wallet"}
            path={CeloLinks.walletApp}
            description={""}
            image={openGraph}
          />
          <Cover />
          <CoverActions />
        </View>
        <AppStores />
      </>
    )
  }
}

const styles = StyleSheet.create({
  cover: {
    marginTop: HEADER_HEIGHT,
    backgroundColor: colors.dark,
    zIndex: 10,
  },
})
