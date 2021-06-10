import * as React from "react"
import { View } from "react-native"
import ArticleData from "src/community/connect/ArticleData"
import CodeOfConduct from "src/community/connect/CodeOfConduct"
import Contribute from "src/community/connect/Contribute"
import CoverArea from "src/community/connect/CoverArea"
import FellowSection from "src/community/connect/FellowSection"
import preview from "src/community/connect/preview.jpg"
import Tenets from "src/community/connect/Tenets"
import EcoFund from "src/community/EcoFund"
import OpenGraph from "src/header/OpenGraph"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { hashNav } from "src/shared/menu-items"

type Props = I18nProps

// only send used translations to the client
const NAME_SPACES = ["common", "community"]

export class CommunityPage extends React.Component<Props> {
  // This is Next.js method that runs serverside. it is only available on page components
  static getInitialProps = () => {
    return {
      namespacesRequired: NAME_SPACES,
    }
  }

  render() {
    const { t } = this.props
    return (
      <>
        <OpenGraph
          path="/community"
          title={t("pageTitle")}
          description={
            "Celo is building a financial system that allows more people to participate, and we invite you to join the conversation and our community. Diverse perspectives and inclusive conversations welcomed."
          }
          image={preview}
        />
        <View>
          <CoverArea />
          <Tenets />

          <CodeOfConduct />

          <ArticleData title={t("articles.title")} />
          <Contribute />
          <EcoFund />
          <FellowSection />
          <View nativeID={hashNav.connect.newsletter} />
        </View>
      </>
    )
  }
}

export default withNamespaces(NameSpaces.community)(CommunityPage)
