import * as React from "react";
import { StyleSheet } from "react-native";
import useOnScreen from "src/hooks/useOnScreen";
export default function useFade({ rootMargin, duration, fraction, delay }) {
    const ref = React.useRef(null);
    const isOnScreen = useOnScreen(ref, fraction, rootMargin);
    const transitionDelay = delay ? `${delay}ms` : null;
    const style = React.useMemo(() => StyleSheet.create({
        base: {
            transitionDelay,
            transitionDuration: `${duration}ms`,
            transitionProperty: "opacity, transform",
            opacity: isOnScreen ? 1 : 0,
            transform: [{ translateY: isOnScreen ? 0 : 5 }],
        },
    }), [isOnScreen, duration, transitionDelay]);
    return { style: style.base, ref };
}
//# sourceMappingURL=useFade.js.map