import { useEffect, useState } from "react";
import { findNodeHandle } from "react-native";
export default function useOnScreen(ref, fraction = 0, rootMargin = "0px") {
    const [isIntersecting, setIntersecting] = useState(false);
    useEffect(() => {
        if (!("IntersectionObserver" in window) ||
            !("IntersectionObserverEntry" in window) ||
            !("intersectionRatio" in window.IntersectionObserverEntry.prototype)) {
            setIntersecting(true);
            return;
        }
        const observer = new IntersectionObserver(([entry]) => {
            setIntersecting(entry.intersectionRatio >= fraction);
        }, {
            root: null,
            rootMargin,
            threshold: [0, 0.1, 0.2, 0.5, 0.6, 0.75, 0.8, 0.9, 1],
        });
        const element = findNodeHandle(ref.current);
        if (element) {
            observer.observe(element);
        }
        return () => {
            observer.unobserve(element);
        };
    }, [fraction, rootMargin, ref]);
    return isIntersecting;
}
//# sourceMappingURL=useOnScreen.js.map