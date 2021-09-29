import * as React from "react";
import Logo, { ColorScheme } from "src/logos/Logo";
export default function LogoDarkBg(props) {
    return <Logo colorScheme={colorScheme(props)} height={props.height}/>;
}
function colorScheme({ allWhite }) {
    if (allWhite) {
        return ColorScheme.allWhite;
    }
    return ColorScheme.darkBG;
}
//# sourceMappingURL=LogoDarkBg.jsx.map