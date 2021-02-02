import getConfig from 'next/config'
import Head from 'next/head'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import OpenGraph from "src/header/OpenGraph"
import celoHero from 'src/home/celo-hero.png'
import HomeBackers from 'src/home/HomeBackers'
import HomeBenefits from 'src/home/HomeBenefits'
import ImagePanes from 'src/home/ImagePanes'
import Involvement from 'src/home/Involvement'
import { TwoAssets } from "src/home/TwoAssets"
import { I18nProps, NameSpaces, withNamespaces } from 'src/i18n'
import Press from 'src/press/Press'
import FlowerArea from './FlowerArea'
import Blocks from "./stats/Blocks"
import WalletAddresses from "./stats/WalletAddresses"

interface State {
  mobile: boolean
}

const DESCRIPTION =
  'Celo is an open platform that makes financial tools accessible to anyone with a mobile phone'

export class Home extends React.Component<I18nProps, State> {
  static getInitialProps() {
    return { namespacesRequired: [NameSpaces.home, NameSpaces.common] }
  }

  state: State

  render() {
    const { t } = this.props
    return (
      <View style={styles.container}>
        <OpenGraph
          title={t("pageTitle")}
          description={DESCRIPTION}
          path={"/"}
          image={celoHero}
        />
        <WalletAddresses />
        <Blocks />
        <ImagePanes />
        <HomeBenefits />
        <FlowerArea />
        <TwoAssets />
        <Press />
        <Involvement />
        <HomeBackers />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    overflow: 'hidden',
    maxWidth: '100vw',
  },
})

export default withNamespaces(NameSpaces.home)(Home)
