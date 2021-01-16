import * as React from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import { H1 } from "src/fonts/Fonts";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import { fonts, standardStyles, typeFaces } from "src/styles";

interface Props {
  title: string;
  description: string | React.ReactNode;
  style?: ViewStyle;
  titleStyle?: any;
  descriptionStyle?: any;
}

function TitleAndDescription({
  title,
  description,
  style,
  titleStyle,
  descriptionStyle,
}: Props) {
  return (
    <GridRow
      desktopStyle={standardStyles.blockMarginBottom}
      tabletStyle={standardStyles.blockMarginBottomTablet}
    >
      <Cell span={Spans.full} style={style}>
        <H1 style={[styles.titleStyle, titleStyle]}>{title}</H1>
        <P style={descriptionStyle}>{description}</P>
      </Cell>
    </GridRow>
  );
}

export function P({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) {
  return <Text style={[fonts.p, styles.paragraph, style]}>{children}</Text>;
}

export default TitleAndDescription;

const styles = StyleSheet.create({
  paragraph: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "400",
    fontFamily: typeFaces.futura,
  },
  titleStyle: {
    fontFamily: typeFaces.futura,
    fontSize: 26,
    lineHeight: 32,
    fontWeight: "500",
    marginBottom: 16,
  },
});
