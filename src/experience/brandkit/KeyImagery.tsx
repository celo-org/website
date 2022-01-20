import { css } from "@emotion/react"
import { NextPage } from "next"
import * as React from "react"
import { View } from "react-native"
import AssetProps from "src/../fullstack/AssetProps"
import Page, { IMAGERY_PATH } from "src/experience/brandkit/common/Page"
import CCLicense from "src/experience/common/CCLicense"
import { brandStyles } from "src/experience/common/constants"
import PageHeadline from "src/experience/common/PageHeadline"
import { H2 } from "src/fonts/Fonts"
import { NameSpaces, useTranslation } from "src/i18n"
import { ScreenSizes, useScreenSize } from "src/layout/ScreenSize"
import { hashNav } from "src/shared/menu-items"
import { standardStyles } from "src/styles"
import ShowcaseKeyImagery from "../common/ShowcaseKeyImagery"
import { AssetTypes } from "./tracking"
// import getWidthAndHeight from "server/airtable"

const { brandImagery } = hashNav

interface Props {
  illos: AssetProps[]
}

const KeyImageryWrapped: NextPage<Props> = React.memo(function KeyImagery({ illos }: Props) {
  const { t } = useTranslation(NameSpaces.brand)
  return (
    <Page
      title={t("keyImagery.title")}
      metaDescription={t("keyImagery.headline")}
      path={IMAGERY_PATH}
      sections={[
        {
          id: brandImagery.overview,
          children: <Overview />,
        },
        {
          id: brandImagery.illustrations,
          children: <Illustrations data={illos} />,
        },
      ]}
    />
  )
})

export default KeyImageryWrapped

function Overview() {
  const { t } = useTranslation(NameSpaces.brand)
  return (
    <View>
      <PageHeadline title={t("keyImagery.title")} headline={t("keyImagery.headline")} />
      <CCLicense textI18nKey="keyImagery.license" />
    </View>
  )
}

function useIlloSize() {
  const { screen } = useScreenSize()
  switch (screen) {
    case ScreenSizes.DESKTOP:
      return 380
    case ScreenSizes.MOBILE:
      return 345
    case ScreenSizes.TABLET:
      return 222
  }
}

interface IlloProps {
  data: AssetProps[]
}

const Illustrations = React.memo(function _Illustrations({ data }: IlloProps) {
  console.log("this is data", data)
  const size = useIlloSize()
  const { t } = useTranslation(NameSpaces.brand)
  return (
    <View style={standardStyles.blockMarginTopTablet}>
      <H2 style={[brandStyles.gap, standardStyles.elementalMarginBottom]}>
        {t("keyImagery.illoTitle")}
      </H2>
      <div css={container}>
        {data &&
          data.map((illo) => (
            <ShowcaseKeyImagery
              key={illo.id}
              description={illo.description}
              name={illo.name}
              preview={illo.preview}
              uri={illo.uri}
              loading={false}
              size={size}
              width={illo.width}
              height={illo.height}
              assetType={AssetTypes.illustration}
            />
          ))}
      </div>
    </View>
  )
})

const container = css({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "row",
  columnGap: 30,
})
