import * as React from "react"
import { StyleSheet, View } from "react-native"
import { H1, H4 } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import { I18nProps, withNamespaces } from "src/i18n"
import previewImage from "src/join/preview.png"
import Rise from "src/join/Rise"
import Fade from "src/shared/AwesomeFade"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import menuItems from "src/shared/menu-items"
import { standardStyles, textStyles } from "src/styles"
import { colors } from "src/colors"
import {css} from "@emotion/react"

const DESCRIPTION =
  "Join us in building financial system that creates the conditions for prosperity for all. We are growing a team with all kinds of different perspectives, experiences and backgrounds to create products that are used and loved by people all around the world."

type Props = I18nProps
class JoinPage extends React.PureComponent<Props> {
  render() {
    const { t } = this.props
    return (
      <>
        <OpenGraph
          path={menuItems.JOBS.link}
          title={t("pageTitle")}
          description={DESCRIPTION}
          image={previewImage}
        />
        <View style={[standardStyles.centered, styles.container]}>
          <View style={styles.cover}>
            <View style={styles.heading}>
              <View style={[standardStyles.centered, styles.cloud, styles.inside]}>
                <Fade delay={10} distance={"20px"}>
                  <View style={standardStyles.centered}>
                    <H1
                      ariaLevel="2"
                      style={[textStyles.center, standardStyles.elementalMarginBottom]}
                    >
                      {t("workWithValue")}
                    </H1>
                    <H4 style={[textStyles.center, standardStyles.elementalMarginBottom]}>
                      {t("joinUsToCreateMoney")}
                    </H4>
                  </View>
                </Fade>
              </View>
              <View style={[styles.cloud]}>
                <Fade delay={20} distance={"20px"}>
                  <Button
                    kind={BTN.PRIMARY}
                    text={t("clabsOpenRoles")}
                    target="_blank"
                    href={"https://clabs.co/careers"}
                    size={SIZE.big}
                    align={"center"}
                  />
                  <span css={spacer} />
                  <Button
                    kind={BTN.PRIMARY}
                    text={t("valoraOpenRoles")}
                    target="_blank"
                    href={"https://valoraapp.com/careers"}
                    size={SIZE.big}
                    align={"center"}
                  />
                 <span css={spacer} />
                 <Button
                    kind={BTN.PRIMARY}
                    text={t("celoFoundationOpenRoles")}
                    target="_blank"
                    href={"https://boards.greenhouse.io/celofoundation"}
                    size={SIZE.big}
                    align={"center"}
                  />
                </Fade>
              </View>
            </View>
            <Rise />
          </View>
        </View>
      </>
    )
  }
}

export default withNamespaces("jobs")(JoinPage)

const spacer = css({
  width: "100%",
  height: "1rem"
})
const styles = StyleSheet.create({
  container: {
    maxWidth: "100vw",
    overflow: "hidden",
  },
  heading: {
    width: "100vw",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
  },
  inside: {
    maxWidth: 800,
  },
  cloud: {
    borderRadius: 100,
    backgroundColor: colors.white,
    padding: 10,
    boxShadow: "0px 5px 30px 10px rgba(255,255,255,1)",
  },
  cover: {
    height: "100vh",
    width: "100%",
    marginBottom: 100,
  },
})
