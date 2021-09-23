import * as React from "react"
import { View } from "react-native"
import ArticleData from "src/community/connect/ArticleData"
import Contribute from "src/community/connect/Contribute"
import CoverArea from "src/community/connect/CoverArea"
import preview from "src/community/connect/preview.jpg"
import Tenets from "src/community/connect/Tenets"
import EcoFund from "src/community/EcoFund"
import OpenGraph from "src/header/OpenGraph"
import {  NameSpaces, useTranslation } from "src/i18n"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"
import { hashNav } from "src/shared/menu-items"
import { Props } from "src/home/Home"



export function CommunityPage(props: Props) {
    const { t } = useTranslation(NameSpaces.community)
    const items = props.sections.map(pageSwitch)
    return (
      <>
        <OpenGraph
          path="/community"
          title={t("pageTitle")}
          description={
            "Celo is a financial system that allows more people to participate, and we invite you to join the conversation and our community. Diverse perspectives and inclusive conversations welcomed."
          }
          image={preview}
        />
        <View>
          <CoverArea />
          <Tenets />
          <ArticleData title={t("articles.title")} />
          <Contribute />
          <EcoFund />
          {props.sections ? items : <></>}
          <View nativeID={hashNav.connect.newsletter} />
        </View>
      </>
    )
}

export default CommunityPage
