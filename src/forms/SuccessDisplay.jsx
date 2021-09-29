import * as React from "react";
import { StyleSheet, Text } from "react-native";
import MessageDisplay from "src/forms/MessageDisplay";
import Checkmark from "src/icons/Checkmark";
import { colors } from "src/styles";
export default React.memo(({ message, style, isShowing }) => {
    return (<MessageDisplay isShowing={isShowing} style={[styles.success, style]}>
      <>
        <Checkmark color={colors.primary} size={16}/>
        <Text style={styles.message}>{message}</Text>
      </>
    </MessageDisplay>);
});
const styles = StyleSheet.create({
    success: {
        color: colors.primary,
        fontWeight: "500",
    },
    message: {
        marginStart: 10,
    },
});
//# sourceMappingURL=SuccessDisplay.jsx.map