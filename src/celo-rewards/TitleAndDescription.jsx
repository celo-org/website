import * as React from "react";
import { StyleSheet } from "react-native";
import { H1 } from "src/fonts/Fonts";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import { standardStyles, typeFaces } from "src/styles";
import { P } from "./stylingElements";
function TitleAndDescription({ title, description, style, titleStyle, descriptionStyle }) {
    return (<GridRow desktopStyle={standardStyles.elementalMarginBottom} tabletStyle={standardStyles.elementalMarginBottom}>
      <Cell span={Spans.full} style={style}>
        <H1 style={[styles.titleStyle, titleStyle]}>{title}</H1>
        {description && <P style={descriptionStyle}>{description}</P>}
      </Cell>
    </GridRow>);
}
export default TitleAndDescription;
const styles = StyleSheet.create({
    titleStyle: {
        fontFamily: typeFaces.futura,
        fontSize: 26,
        lineHeight: 32,
        fontWeight: "500",
        marginBottom: 16,
    },
});
//# sourceMappingURL=TitleAndDescription.jsx.map