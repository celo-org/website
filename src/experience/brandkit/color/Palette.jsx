import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Pigment from "src/experience/brandkit/color/Pigment";
import { GAP } from "src/experience/common/constants";
import { fonts, standardStyles } from "src/styles";
export default function Palette({ text, title, colors }) {
    return (<View style={standardStyles.blockMarginBottom}>
      {title && (<Text style={[fonts.h5, styles.gap, standardStyles.elementalMarginBottom]}>{title}</Text>)}
      <Text style={[fonts.p, standardStyles.elementalMarginBottom, styles.gap]}>{text}</Text>
      <View style={styles.swatch}>
        {colors.map(({ name, hex }) => {
            return <Pigment key={hex} name={name} hex={hex}/>;
        })}
      </View>
    </View>);
}
const styles = StyleSheet.create({
    swatch: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    gap: {
        marginHorizontal: GAP,
    },
});
//# sourceMappingURL=Palette.jsx.map