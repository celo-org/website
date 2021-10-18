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
import { css } from "@emotion/react"
import { flex } from "src/estyles"
export default class MobileApp extends React.PureComponent {
  render() {
    return (
      <>
        <div css={coverCss}>
          <OpenGraph
            title={"Celo Test Wallet"}
            path={CeloLinks.walletApp}
            description={""}
            image={openGraph}
          />
          <Cover />
          <CoverActions />
        </div>
        <AppStores />
      </>
    )
  }
}

const coverCss = css(flex, {
  marginTop: HEADER_HEIGHT,
  backgroundColor: colors.dark,
  zIndex: 10,
})
