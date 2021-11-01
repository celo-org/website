import * as React from "react"
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native"
import AudioIcon from "src/about/AudioIcon"
import Backers from "src/about/Backers"
import { Contributor } from "src/about/Contributor"
import { sacredEconBack, team } from "src/about/images"
import PressMedia from "src/about/PressMedia"
import Team from "src/about/Team"
import CeloValues from "src/about/Values"
import VideoCover from "src/about/VideoCover"
import analytics from "src/analytics/analytics"
import { H1, H2 } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import { I18nProps, NameSpaces, Trans, withNamespaces } from "src/i18n"
import BookLayout from "src/layout/BookLayout"
import { GridRow } from "src/layout/Grid2"
import LogoLightBg from "src/logos/LogoLightBg"
import BeautifulQuote from "src/shared/BeautifulQuote"
import Button, { BTN } from "src/shared/Button.3"
import InlineAnchor from "src/shared/InlineAnchor"
import menuItems from "src/shared/menu-items"
import { fonts, standardStyles, textStyles } from "src/estyles"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import { WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"

interface Props {
  contributors: Contributor[]
}

async function pronunceCelo() {
  const audio = document.getElementById("pronunce") as HTMLAudioElement
  await audio.play()
  await analytics.track("pronounced celo")
}

export class About extends React.Component<Props & I18nProps> {
  render() {
    const { t, contributors } = this.props

    return (
      <>
        <OpenGraph
          path={menuItems.ABOUT_US.link}
          title={t("pageTitle")}
          description={t("description")}
        />
        <div css={layout}>
          <VideoCover />
          {/* Below Fold */}
          <GridRow
           columns={4}
           css={logoArea}
          >
            <div css={logoColumn}>
              <LogoLightBg height={47} />
              </div>
          </GridRow>
          <BookLayout label={t("MissionTitle")}>
            <H1>{t("MissionText")}</H1>
          </BookLayout>
          <BookLayout label={<Text style={styles.foundation}>{t("celoFoundation")}</Text>}>
            <H2 style={standardStyles.elementalMarginBottom}>{t("celoFoundationBelieves")}</H2>
            <p css={[fonts.body, standardStyles.elementalMargin]}>{t("celoFoundationText")}</p>
          </BookLayout>
          <BookLayout label={t("MeaningTile")} endBlock={true}>
            <H1 ariaLevel="2" style={standardStyles.elementalMarginBottom}>
              <Trans
                ns={NameSpaces.about}
                t={t}
                i18nKey={"MeaningText"}
                values={{ phonetic: "/ˈtselo/" }}
                children={[
                  <span key={1} css={textStyles.italic}>
                    "/ˈtselo/"
                  </span>,
                  <TouchableOpacity key={2} onPress={pronunceCelo}>
                    <AudioIcon />
                    <audio id="pronunce">
                      <source src="audio/celo-pronunce.ogg" type="audio/ogg" />
                      <source src="audio/celo-pronunce.mp3" type="audio/mp3" />
                    </audio>
                  </TouchableOpacity>,
                ]}
              />
            </H1>
            <p css={[fonts.body, standardStyles.elementalMargin]}>{t("MeaningCopy")}</p>
          </BookLayout>
          <Image source={{uri: team.src}} style={styles.teamImage} resizeMode={"cover"} />
          <BookLayout label={t("ValuesTitle")}>
            <span css={[fonts.body, standardStyles.elementalMarginBottom]}>
              <Trans
                ns={NameSpaces.about}
                i18nKey={"ValuesCopy"}
                values={{ celoCLabs: "Celo\u00a0– C\u00a0Labs" }}
                children={<Strong key="0">M</Strong>}
              />
            </span>
          </BookLayout>
          <CeloValues />
          <BeautifulQuote
            color={colors.white}
            quote={t("beautifulLifeQuote")}
            imgSource={sacredEconBack}
            citation={`– ${t("beautifulLifeSource")}`}
          />
          <BookLayout label={t("SacredEconTitle")} startBlock={true}>
            <span css={[fonts.body, standardStyles.blockMarginBottomTablet]}>
              <Trans
                ns={NameSpaces.about}
                i18nKey="SacredEconText"
                children={
                  <InlineAnchor key="sacred" href="http://sacred-economics.com/film/">
                    Sacred Econ
                  </InlineAnchor>
                }
              />
            </span>
            <Button
              kind={BTN.PRIMARY}
              href="http://sacred-economics.com/film/"
              text={t("learnMore")}
            />
          </BookLayout>
          <BookLayout label={t("theoryOfChangeTitle")} startBlock={true}>
            <span css={[fonts.body, standardStyles.blockMarginBottomTablet]}>
              {t("theoryOfChangeText")}
            </span>
            <Button
              kind={BTN.PRIMARY}
              href="https://medium.com/celoOrg/celos-theory-of-change-b916de44945d"
              text={t("learnMore")}
            />
          </BookLayout>
          <Team contributors={contributors} />
          <Backers />
          <PressMedia />
        </div>
      </>
    )
  }
}

function Strong({ children }: { children: React.ReactNode }) {
  return <span css={textStyles.heavy}>{children}</span>
}

const layout = css({
  display: "flex",
  flexDirection: "column"
})
const logoArea = css({
  justifyContent: "flex-end",
  [WHEN_MOBILE]: standardStyles.sectionMarginMobile,
  [WHEN_TABLET]: standardStyles.sectionMarginTablet,
  [WHEN_DESKTOP]: standardStyles.sectionMarginTop,})

const logoColumn = css({
  gridColumn: "2"
})

const styles = StyleSheet.create({
  teamImage: { width: "100%", height: 650 },
  foundation: {
    lineHeight: 42,
  },
})

export default withNamespaces("about")(About)
