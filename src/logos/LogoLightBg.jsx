import * as React from "react";
import Logo, { ColorScheme } from "src/logos/Logo";
export default function LogoDarkBg(props) {
    return <Logo colorScheme={colorScheme(props)} height={props.height}/>;
}
function colorScheme({ allBlack }) {
    if (allBlack) {
        return ColorScheme.allBlack;
    }
    return ColorScheme.lightBG;
}
//# sourceMappingURL=LogoLightBg.jsx.map