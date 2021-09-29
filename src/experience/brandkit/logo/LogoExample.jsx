import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import DownloadButton from "src/experience/brandkit/DownloadButton";
import { AssetTypes } from "src/experience/brandkit/tracking";
import { brandStyles, GAP } from "src/experience/common/constants";
import LogoDarkBg from "src/logos/LogoDarkBg";
import LogoLightBg from "src/logos/LogoLightBg";
import { fonts, standardStyles } from "src/styles";
export var Logos;
(function (Logos) {
    Logos[Logos["dark"] = 0] = "dark";
    Logos[Logos["light"] = 1] = "light";
    Logos[Logos["white"] = 2] = "white";
    Logos[Logos["black"] = 3] = "black";
})(Logos || (Logos = {}));
export default React.memo(function LogoExample({ href, caption, background, logoType, hasBorder, }) {
    const isLightbg = logoType === Logos.light || logoType === Logos.black;
    return (<View style={styles.container}>
      <View style={[
            standardStyles.centered,
            styles.displayArea,
            hasBorder && brandStyles.fullBorder,
            { backgroundColor: background },
        ]}>
        {isLightbg ? (<LogoLightBg height={35} allBlack={logoType === Logos.black}/>) : (<LogoDarkBg height={35} allWhite={logoType === Logos.white}/>)}
      </View>
      <Text style={fonts.legal}>{caption}</Text>
      <DownloadButton uri={href} trackingData={{ name: `${Logos[logoType]} Logo`, type: AssetTypes.logo }}/>
    </View>);
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        minWidth: 300,
        paddingHorizontal: GAP,
    },
    displayArea: {
        height: 172,
        width: "100%",
        marginVertical: 15,
    },
    button: {
        transform: [{ translateX: -30 }],
    },
});
//# sourceMappingURL=LogoExample.jsx.map