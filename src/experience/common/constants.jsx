import { StyleSheet } from "react-native";
import { colors } from "src/styles";
export const GAP = 10;
export const brandStyles = StyleSheet.create({
    gap: {
        marginHorizontal: GAP,
    },
    tiling: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    fullBorder: {
        borderWidth: 1,
        borderColor: colors.gray,
    },
    bottomBorder: {
        borderBottomColor: colors.gray,
        borderBottomWidth: 1,
    },
    button: {
        paddingLeft: 0,
        justifyContent: "flex-start",
    },
});
//# sourceMappingURL=constants.jsx.map