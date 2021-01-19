import { useRouter } from "next/router";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NameSpaces, useTranslation } from "src/i18n";
import { fonts, standardStyles, typeFaces } from "src/styles";

function GoBackButton() {
  const { t } = useTranslation(NameSpaces.celoRewards);
  const router = useRouter();
  if (typeof window !== "undefined" && window.history.length <= 1) {
    return null
  }

  return (
    <Text
      accessibilityRole="link"
      style={styles.buttonText}
      onClick={router.back}
    >
      {t("Go Back")}
    </Text>
  );
}

export default GoBackButton;

const styles = StyleSheet.create({
  buttonText: {
    ...fonts.navigation,
    ...standardStyles.sectionMarginMobile,
    fontSize: 14,
    fontWeight: "400",
    fontFamily: typeFaces.futura,
    padding: 10,
    marginHorizontal: 10,
  },
});
