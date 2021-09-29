import * as React from "react";
import { StyleSheet, View } from "react-native";
import Button, { BTN } from "src/shared/Button.3";
import OvalCoin from "src/shared/OvalCoin";
const COIN_SIZE = 12;
export const SubNavLink = React.memo(function _Link(props) {
    return (<Button iconLeft={props.active ? (<OvalCoin color={props.color} size={COIN_SIZE}/>) : (<View style={linkStyles.iconPlaceholder}/>)} kind={BTN.NAV} href={props.href} accessibilityRole={props.accessibilityRole} onPress={props.onPress} text={props.title} style={[linkStyles.item, !props.active && linkStyles.inactiveText]}/>);
});
const linkStyles = StyleSheet.create({
    iconPlaceholder: { width: COIN_SIZE },
    item: {
        padding: 5,
        margin: 5,
    },
    inactiveText: { fontWeight: "normal" },
});
//# sourceMappingURL=SubNavLink.jsx.map