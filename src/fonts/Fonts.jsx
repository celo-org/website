import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Responsive from "src/shared/Responsive";
import { TextStyles } from "src/shared/Styles";
import { fonts, standardStyles } from "src/styles";
export const TABLE = ({ style, children }) => {
    return <View style={[TextStyles.table, style]}>{children}</View>;
};
export const TR = ({ style, children }) => {
    return <View style={[TextStyles.tr, style]}>{children}</View>;
};
export const TH = ({ style, children }) => {
    return <Text style={[fonts.legal, TextStyles.th, style]}>{children}</Text>;
};
export const TD = ({ style, children }) => {
    return <Text style={[fonts.legal, TextStyles.td, style]}>{children}</Text>;
};
export const H1 = ({ style, children, tabIndex, accessibilityRole, id, ariaLevel }) => {
    return (<Responsive large={[styles.reset, fonts.h1, style]}>
      <Text aria-level={ariaLevel || "1"} id={id} tabIndex={tabIndex} accessibilityRole={accessibilityRole || "heading"} style={[styles.reset, fonts.h1Mobile, style]}>
        {children}
      </Text>
    </Responsive>);
};
export const H2 = ({ style, children, tabIndex, accessibilityRole, id }) => {
    return (<Responsive large={[styles.reset, fonts.h2, style]}>
      <Text id={id} accessibilityRole={accessibilityRole || "heading"} tabIndex={tabIndex} aria-level="2" style={[styles.reset, fonts.h2Mobile, style]}>
        {children}
      </Text>
    </Responsive>);
};
export const H3 = ({ style, children, tabIndex, accessibilityRole, id }) => {
    return (<Responsive large={[styles.reset, fonts.h3, style]}>
      <Text id={id} tabIndex={tabIndex} accessibilityRole={accessibilityRole || "heading"} aria-level="3" style={[styles.reset, fonts.h3Mobile, style]}>
        {children}
      </Text>
    </Responsive>);
};
export const H4 = ({ style, children, tabIndex, accessibilityRole, id }) => {
    return (<Responsive large={[styles.reset, fonts.h4, style]}>
      <Text id={id} tabIndex={tabIndex} accessibilityRole={accessibilityRole || "heading"} aria-level="4" style={[styles.reset, fonts.h4Mobile, style]}>
        {children}
      </Text>
    </Responsive>);
};
export var ListType;
(function (ListType) {
    ListType[ListType["numeric"] = 0] = "numeric";
    ListType[ListType["alpha"] = 1] = "alpha";
    ListType[ListType["bullet"] = 2] = "bullet";
})(ListType || (ListType = {}));
export function Ul(props) {
    return (<View style={[styles.ul, StyleSheet.flatten(props.style)]} accessibilityRole={"list"}>
      {props.children}
    </View>);
}
export function Ol(props) {
    return (<View style={[styles.ol, StyleSheet.flatten(props.style)]} accessibilityRole={"list"}>
      {props.children}
    </View>);
}
function listType(listStyle) {
    switch (listStyle) {
        case ListType.numeric:
            return styles.numeric;
        case ListType.alpha:
            return styles.alpha;
        default:
            return styles.initial;
    }
}
export function Li(props) {
    const style = StyleSheet.flatten([
        fonts.p,
        standardStyles.elementalMarginBottom,
        listType(props.listStyle),
        props.style,
    ]);
    return (<Text style={style} accessibilityRole={"listitem"}>
      {props.children}
    </Text>);
}
const styles = StyleSheet.create({
    reset: {
        textTransform: "none",
    },
    alpha: {
        listStyle: "lower-alpha",
        display: "list-item",
    },
    numeric: {
        listStyle: "decimal",
        display: "list-item",
    },
    bullet: {
        listStyle: "disc",
        display: "list-item",
    },
    initial: {
        listStyle: "inherit",
        display: "list-item",
    },
    ul: {
        marginTop: 20,
        paddingLeft: 20,
        listStyle: "disc",
    },
    ol: {
        marginTop: 20,
        paddingLeft: 20,
        listStyle: "decimal",
    },
});
//# sourceMappingURL=Fonts.jsx.map