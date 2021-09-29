import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useScreenSize } from "src/layout/ScreenSize";
import { fonts, standardStyles } from "src/styles";
export default function IdeaReadiness({ title, caption, stages }) {
    const { isDesktop } = useScreenSize();
    return (<View style={[standardStyles.blockMarginTablet, isDesktop && styles.root]}>
      <View style={styles.caption}>
        <Text style={[fonts.h5, standardStyles.halfElement]}>{title}</Text>
        <Text style={fonts.legal}>{caption}</Text>
      </View>
      <View style={styles.steps}>
        {stages.map((stage) => {
            return (<View key={stage.sys.id} style={styles.stage}>
              <Image style={styles.image} source={{ uri: `${stage.fields.file.url}?w=52` }}/>
              <Text style={fonts.h6}>{stage.fields.title}</Text>
            </View>);
        })}
      </View>
    </View>);
}
const styles = StyleSheet.create({
    root: {
        flexDirection: "row",
        flexWrap: "wrap",
        flex: 1,
        maxWidth: "100%",
    },
    steps: {
        flexDirection: "row",
        flex: 1,
        flexWrap: "wrap",
    },
    caption: {
        flexBasis: 180,
        maxWidth: 300,
        marginEnd: 20,
    },
    image: {
        marginVertical: 20,
        height: 65,
        width: 52,
    },
    stage: {
        flex: 1,
        minWidth: 90,
        flexBasis: 90,
        marginHorizontal: 20,
    },
});
//# sourceMappingURL=IdeaReadiness.jsx.map