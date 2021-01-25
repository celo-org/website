import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NameSpaces, useTranslation } from "src/i18n";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import {  standardStyles } from "src/styles";
import { P } from "./TitleAndDescription";

function RewardsKickOff() {
  const { t } = useTranslation(NameSpaces.celoRewards);

  return (
    <GridRow
      desktopStyle={standardStyles.blockMarginBottom}
      tabletStyle={standardStyles.blockMarginBottomTablet}
    >
      <Cell span={Spans.full}>
        <P>
          <B>{t("kickoff.title")}</B> {t("kickoff.body")}
        </P>
      </Cell>
    </GridRow>
  );
}

const B = (props) => (
  <Text style={styles.bold}>{props.children}</Text>
);

export default RewardsKickOff;

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold",
  },
});
