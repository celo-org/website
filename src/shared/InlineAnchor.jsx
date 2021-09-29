import * as React from "react";
import Button, { BTN } from "src/shared/Button.3";
export default function InlineAnchor({ children, href, target, onPress, style }) {
    return (<Button text={children} onPress={onPress} target={target} href={href} kind={BTN.INLINE} style={style}/>);
}
//# sourceMappingURL=InlineAnchor.jsx.map