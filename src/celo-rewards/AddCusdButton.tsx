import * as React from "react"
import { StyleSheet, Text } from "react-native"
import { NameSpaces, useTranslation } from "src/i18n"
import Link from "src/shared/Link"
import { colors, fonts, standardStyles } from "src/styles"

const buyCusdLink = "celo://wallet/cashIn"

function AddCusdButton() {
  const { t } = useTranslation(NameSpaces.celoRewards)

  return (
    <Link href={buyCusdLink} passHref={true}>
      <Text
        accessibilityRole="link"
        style={[styles.buttonText, standardStyles.blockMarginMobile]}
        testID="AddCusd"
      >
        {t("buycUsd")}
      </Text>
    </Link>
  )
}

export default AddCusdButton

const styles = StyleSheet.create({
  buttonText: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ...fonts.navigation,
    fontSize: 17,
    fontWeight: "600",
    color: colors.white,
    height: 48,
    backgroundColor: colors.greenUI,
    borderWidth: 0,
    borderRadius: 24,
    marginHorizontal: 20,
  },
})
