import * as React from "react";
import External from "src/icons/External";
import { colors } from "src/styles";
export default function Outbound({ url }) {
    return (<a href={externalizeURL(url)} target="_blank" rel="noreferrer">
      <External size={12} color={colors.dark}/>
    </a>);
}
export function externalizeURL(url) {
    try {
        const uri = new URL(url);
        return uri.href;
    }
    catch {
        return `//${url}`;
    }
}
//# sourceMappingURL=Outbound.jsx.map