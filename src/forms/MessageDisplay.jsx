import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { fonts } from "src/styles";
export default React.memo(({ children, isShowing, style }) => {
    return (<View style={[styles.container, !isShowing && styles.containerCollapsed]}>
      <Text style={[fonts.h6, styles.text, style, isShowing ? styles.showingError : styles.hidingError]}>
        {children}
      </Text>
    </View>);
});
const styles = StyleSheet.create({
    text: {
        transitionProperty: "opacity",
        transitionDuration: "700ms",
    },
    showingError: {
        opacity: 100,
    },
    hidingError: {
        opacity: 0,
    },
    container: {
        marginVertical: 5,
        height: "auto",
        maxHeight: 80,
        transitionProperty: "max-height",
        transitionDuration: "600ms",
    },
    containerCollapsed: {
        maxHeight: 0,
    },
});
//# sourceMappingURL=MessageDisplay.jsx.map