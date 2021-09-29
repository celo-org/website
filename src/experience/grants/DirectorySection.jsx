import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import DirectoryItem from "src/experience/grants/DirectoryItem";
import { H4 } from "src/fonts/Fonts";
import { colors, fonts, standardStyles } from "src/styles";
export default function DirectorySection({ name, items, description }) {
    return (<View style={styles.root}>
      <H4>{name}</H4>
      <View style={styles.line}/>
      <Text style={[fonts.p, standardStyles.elementalMargin]}>{description}</Text>
      <View style={styles.grid}>
        {items.map((item) => (<DirectoryItem key={item.name} {...item}/>))}
      </View>
    </View>);
}
const styles = StyleSheet.create({
    root: {
        paddingTop: 30,
    },
    grid: {
        display: "grid",
        gridRowGap: "40px",
        gridColumnGap: "80px",
        gridTemplateColumns: `repeat(auto-fit, minmax(150px, 1fr))`,
        marginTop: 20,
    },
    line: {
        height: 1,
        backgroundColor: colors.gray,
        marginTop: 10,
    },
});
//# sourceMappingURL=DirectorySection.jsx.map