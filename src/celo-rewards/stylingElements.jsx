import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { fonts, typeFaces } from "src/styles";
export function P({ children, style }) {
    return <Text style={[fonts.p, styles.paragraph, style]}>{children}</Text>;
}
export const B = (props) => (<Text style={[fonts.p, styles.paragraph, styles.bold]}>{props.children}</Text>);
const styles = StyleSheet.create({
    bold: {
        fontWeight: "bold",
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 24,
        fontWeight: "400",
        fontFamily: typeFaces.futura,
    },
});
//# sourceMappingURL=stylingElements.jsx.map