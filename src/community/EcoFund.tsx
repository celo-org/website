import * as React from "react"
import { Image, ImageStyle, StyleSheet, Text, TextStyle, View } from "react-native"
import ah from "src/community/ah-logo.png"
import polychain from "src/community/polychain-logo.png"
import { H2 } from "src/fonts/Fonts"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { ScreenProps, ScreenSizes, withScreenSize } from "src/layout/ScreenSize"
import Rings from "src/logos/RingsGlyph"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import menuItems, { hashNav } from "src/shared/menu-items"
import Navigation, { NavigationTheme } from "src/shared/Navigation"
import { fonts, standardStyles, textStyles } from "src/styles"
import { colors } from "src/colors"
import { Tables } from "../../fullstack/EcoFundFields"
import HubspotForm from "src/contentful/grid2-cells/HubspotForm"

interface State {
  table: Tables
}

class EcoFund extends React.PureComponent<I18nProps & ScreenProps, State> {
  state = {
    table: Tables.Applicants,
  }

  selectApplication = () => {
    this.setState({ table: Tables.Applicants })
  }
  selectRecommendation = () => {
    this.setState({ table: Tables.Recommendations })
  }

  render() {
    const { t, screen } = this.props
    return (
      <GridRow
        nativeID={hashNav.connect.fund}
        desktopStyle={[standardStyles.sectionMarginTop]}
        tabletStyle={[standardStyles.sectionMarginTopTablet]}
        mobileStyle={[standardStyles.sectionMarginTopMobile]}
      >
        <Cell span={Spans.half} style={screen !== ScreenSizes.MOBILE && styles.insideEdge}>
          <H2>{t("ecoFund.title")}</H2>
          <Text style={[fonts.p, textStyles.italic]}>{t("ecoFund.poweredBy")}</Text>
          <Text style={[fonts.p, standardStyles.elementalMargin]}>{t("ecoFund.description")}</Text>
          <View style={[standardStyles.row, standardStyles.elementalMargin, standardStyles.wrap]}>
            <View style={styles.partners}>
              <Text style={[fonts.h6, styles.partnerText as TextStyle]}>
                {t("ecoFund.generalPartner")}
              </Text>
              <Image
                resizeMode="contain"
                accessibilityLabel="Polychain"
                source={{ uri: polychain.src }}
                style={styles.polyChain as ImageStyle}
              />
            </View>
            <View style={styles.partners}>
              <Text style={[fonts.h6, styles.partnerText as TextStyle]}>
                {t("ecoFund.limitedPartners")}
              </Text>
              <View style={[standardStyles.row, styles.limitedPartners]}>
                <Rings color={colors.dark} height={40} />
                <Image
                  resizeMode="contain"
                  accessibilityLabel="a16z"
                  source={ah}
                  style={styles.a16z as ImageStyle}
                />
              </View>
            </View>
          </View>
          <Button
            style={styles.button as TextStyle}
            text={t("ecoFund.link")}
            kind={BTN.NAKED}
            size={SIZE.normal}
            href={menuItems.BUILD.link}
          />
        </Cell>
        <Cell span={Spans.half}>
          <View
            style={[
              standardStyles.row,
              standardStyles.centered,
              screen === ScreenSizes.MOBILE
                ? standardStyles.blockMarginTop
                : standardStyles.elementalMarginBottom,
            ]}
          >
            <Navigation
              theme={NavigationTheme.LIGHT}
              onPress={this.selectApplication}
              text={t("ecoFund.applyForFunding")}
              selected={this.state.table === Tables.Applicants}
            />
            <Navigation
              theme={NavigationTheme.LIGHT}
              onPress={this.selectRecommendation}
              text={t("ecoFund.recommendProject")}
              selected={this.state.table === Tables.Recommendations}
            />
          </View>
          <View style={standardStyles.elementalMarginTop}>
            <View style={styles.formContainer}>
              <HubspotForm
                hubspotFormId={
                  this.state.table === Tables.Recommendations
                    ? "107d2cce-2aba-4bf5-b7f2-001b1ccb3998"
                    : "63be4de6-9311-444b-b3ab-f1b50b46e10d"
                }
              />
            </View>
          </View>
        </Cell>
      </GridRow>
    )
  }
}

export default withScreenSize(withNamespaces(NameSpaces.community)(EcoFund))

const styles = StyleSheet.create({
  limitedPartners: {
    alignItems: "center",
  },
  polyChain: {
    marginRight: 40,
    marginBottom: 3,
    width: 190,
    height: 35,
  },
  a16z: {
    width: 128,
    height: 35,
    marginHorizontal: 30,
  },
  hidden: {
    // @ts-ignore
    visibility: "hidden",
  },
  shorterForm: {
    position: "absolute",
  },
  button: {
    marginVertical: 15,
  },
  partners: {
    justifyContent: "space-between",
  },
  partnerText: {
    marginTop: 20,
    marginBottom: 10,
  },
  insideEdge: {
    paddingRight: 30,
  },
  formContainer: {
    width: "100%",
  },
})
