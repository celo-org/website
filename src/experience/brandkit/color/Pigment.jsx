import { ColorTranslator } from "colortranslator";
import hexRgba from "hex-rgba";
import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { brandStyles } from "src/experience/common/constants";
import CopyIcon from "src/icons/CopyIcon";
import Hoverable from "src/shared/Hoverable";
import { colors, fonts, standardStyles } from "src/styles";
import { yiq } from "yiq";
function hexToHumanRGB(hex) {
    return hexRgba(hex, 1).toUpperCase().replace("A(", "A (");
}
function getContrastingColor(hex) {
    return yiq(hex, { colors: { light: colors.white, dark: colors.dark } });
}
async function onCopy(text) {
    await navigator.clipboard.writeText(text);
}
const MILLISECONDS = 5000;
export default class PigmentState extends React.PureComponent {
    state = {
        justCopied: false,
    };
    onCopy = async () => {
        await onCopy(this.props.hex);
        this.setState({ justCopied: true });
        setTimeout(() => {
            this.setState({ justCopied: false });
        }, MILLISECONDS);
    };
    render() {
        const { hex, name } = this.props;
        return (<Pigment onCopyHex={this.onCopy} hex={hex} name={name} justCopied={this.state.justCopied}/>);
    }
}
function Pigment({ hex, name, onCopyHex, justCopied }) {
    const inline = { backgroundColor: hex };
    const cmyk = new ColorTranslator(hex).CMYK.toUpperCase().replace(/%/g, "").replace("K(", "K (");
    if (hex === colors.white) {
        inline.borderColor = colors.gray;
        inline.borderWidth = 1;
    }
    const foreGround = getContrastingColor(hex);
    return (<View style={[standardStyles.elementalMarginBottom, brandStyles.gap, styles.container]}>
      <Hoverable onPress={onCopyHex}>
        {(isHovering) => (<View style={styles.box}>
            <View style={[
                standardStyles.centered,
                styles.pigment,
                styles.transitions,
                isHovering && styles.pigmentHover,
                inline,
            ]}>
              <View style={[
                standardStyles.row,
                styles.transitions,
                styles.copy,
                !justCopied && isHovering && styles.copyHover,
            ]}>
                <CopyIcon size={14} color={foreGround}/>
                <Text style={[fonts.micro, styles.copyText, { color: foreGround }]}>Copy</Text>
              </View>
              <Text style={[
                styles.afterEffect,
                fonts.micro,
                styles.copy,
                justCopied && styles.copyHover,
                styles.transitions,
                { color: foreGround },
            ]}>
                Copied
              </Text>
            </View>
          </View>)}
      </Hoverable>
      <View>
        <Text style={[fonts.h6, styles.title]}>{name}</Text>
        <Text style={fonts.uiSmall}>{hex}</Text>
        <Text style={fonts.uiSmall}>{hexToHumanRGB(hex)}</Text>
        <Text style={fonts.uiSmall}>{cmyk}</Text>
      </View>
    </View>);
}
const styles = StyleSheet.create({
    container: { flex: 1, minWidth: 120 },
    transitions: {
        transitionDuration: "500ms",
    },
    title: {
        marginBottom: 5,
    },
    box: {
        cursor: "copy",
        paddingTop: 30,
        paddingBottom: 10,
        paddingRight: 40,
    },
    pigment: {
        height: 100,
        flexBasis: 100,
        width: 100,
        transitionProperty: "transform",
        transformOrigin: "left",
    },
    pigmentHover: {
        transform: [{ scaleX: 1.01 }],
    },
    copyText: {
        paddingLeft: 5,
    },
    copy: {
        opacity: 0,
        transitionProperty: "opacity, transform",
    },
    copyHover: {
        opacity: 1,
        transform: [{ scaleX: 0.95 }, { scaleY: 0.95 }],
    },
    afterEffect: { position: "absolute" },
});
//# sourceMappingURL=Pigment.jsx.map