import * as React from "react";
import { View } from "react-native";
import useFade from "src/hooks/useFade";
export default function Fade(props) {
    const { children, ...options } = props;
    const { style, ref } = useFade(options);
    return (<View ref={ref} style={[style, props.style]}>
      {children}
    </View>);
}
//# sourceMappingURL=Fade.jsx.map