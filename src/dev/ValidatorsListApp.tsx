import { css } from "@emotion/react"
import { Router, useRouter } from "next/router"
import * as React from "react"
import { StyleSheet, View } from "react-native"
import ValidatorsList, { ValidatorsListProps } from "src/dev/ValidatorsList"
import { styles } from "src/dev/ValidatorsListStyles"
import { H2 } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import menuItems from "src/shared/menu-items"
import Navigation, { NavigationTheme } from "src/shared/Navigation"
import Spinner from "src/shared/Spinner"
import { standardStyles, textStyles } from "src/styles"
import { colors } from "src/colors"

const networkMenu = [
  ["Mainnet", menuItems.VALIDATORS_LIST.link],
  ["Baklava", menuItems.VALIDATORS_LIST__BAKLAVA.link],
]

type Props = { router: Router } & ValidatorsListProps

export default function ValidatorsListApp(props: Props) {
  const router = useRouter()
  const networkMenuList = networkMenu.map(([name, link]) => [name, link, () => router.push(link)])
  return (
    <div css={rootCss}>
      <OpenGraph
        title="Celo Validators"
        path={menuItems.VALIDATORS_LIST.link}
        description="View status of Validators on the Celo Network"
      />

      <View style={[styles.cover, styles.pStaticOverflow, compStyles.fullHeight]}>
        <H2
          style={[
            textStyles.center,
            compStyles.blockMarginTopTabletValidator,
            standardStyles.elementalMarginBottom,
            textStyles.invert,
          ]}
        >
          Validators
        </H2>

        <View>
          <View style={styles.links}>
            {networkMenuList.map(([name, link, navigate]: any) => (
              <View key={name} style={[styles.linkWrapper]}>
                <Navigation
                  onPress={navigate}
                  text={name}
                  theme={NavigationTheme.DARKGOLD}
                  selected={router.pathname === link}
                />
              </View>
            ))}
          </View>
        </View>
        {!props.data ? (
          <View
            style={[standardStyles.darkBackground, standardStyles.centered, compStyles.useSpace]}
          >
            <Spinner size="medium" color={colors.white} />
          </View>
        ) : (
          <ValidatorsList data={props.data} />
        )}
      </View>
    </div>
  )
}

const compStyles = StyleSheet.create({
  fullHeight: {
    minHeight: "calc(100vh - 75px)",
    width: "fit-content",
    backgroundColor: colors.dark,
  },
  useSpace: {
    flex: 1,
    paddingBottom: "20vh",
  },
  blockMarginTopTabletValidator: {
    marginTop: 116,
  },
})

const rootCss = css({
  backgroundColor: colors.dark,
})
