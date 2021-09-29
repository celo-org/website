import { useRouter } from "next/router";
import * as React from "react";
import { css, keyframes } from "@emotion/react";
import { colors } from "src/styles";
import { EffectiveTypes, getEffectiveConnection } from "src/utils/utils";
import { flexRow } from "src/estyles";
var RouterEvents;
(function (RouterEvents) {
    RouterEvents["routeChangeStart"] = "routeChangeStart";
    RouterEvents["routeChangeComplete"] = "routeChangeComplete";
    RouterEvents["routeChangeError"] = "routeChangeError";
})(RouterEvents || (RouterEvents = {}));
export function usePageTurner() {
    const router = useRouter();
    const [isPageTurning, setPageTurning] = React.useState(false);
    const [hasError, setError] = React.useState(false);
    const [route, setRoute] = React.useState("");
    React.useEffect(() => {
        const eventHandlers = {
            [RouterEvents.routeChangeStart]: (url) => {
                setPageTurning(true);
                setError(false);
                setRoute(url);
            },
            [RouterEvents.routeChangeComplete]: () => {
                setTimeout(() => setPageTurning(false), 300);
                setError(false);
            },
            [RouterEvents.routeChangeError]: (error, url) => {
                if (error.cancelled) {
                    setRoute(url);
                }
                setError(true);
            },
        };
        Object.keys(RouterEvents).forEach((eventType) => {
            router.events.on(eventType, eventHandlers[eventType]);
        });
        return () => {
            Object.keys(RouterEvents).forEach((eventType) => {
                router.events.off(eventType, eventHandlers[eventType]);
            });
        };
    }, [router.events]);
    return { isPageTurning, hasError, route };
}
export default function Progress() {
    const { isPageTurning, hasError, route } = usePageTurner();
    if (isPageTurning) {
        const speed = getEffectiveConnection(navigator);
        const animationSpeed = durations[speed];
        const visibility = isPageTurning ? visibleCss : hiddenCss;
        return (<div css={rootCss} key={route}>
        <div css={css(barCss, animationSpeed, visibility, hasError ? badStyle : goodStyle)}/>
      </div>);
    }
    return null;
}
const rootCss = css(flexRow, {
    alignItems: "center",
    zIndex: 1000,
    height: 2,
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
});
const hiddenCss = css({
    top: -2,
});
const visibleCss = css({
    top: 0
});
const badStyle = css({
    backgroundColor: colors.red,
});
const goodStyle = css({
    backgroundColor: colors.primary,
});
const progressive = keyframes `
  from {
    transform: scaleX(0)
  }

  to {
    transform: scaleX(1)
  }
`;
const barCss = css({
    height: "100%",
    width: "100%",
    transformOrigin: "left",
    transitionDuration: "1s, 0.4s",
    transitionProperty: "background-color, top",
    animationFillMode: "both",
    animationTimingFunction: "cubic-bezier(0,.58,.51,1.01)",
    animationName: progressive
});
const durations = {
    [EffectiveTypes["slow-2g"]]: {
        animationDuration: `30s`,
    },
    [EffectiveTypes["2g"]]: {
        animationDuration: `20s`,
    },
    [EffectiveTypes.unknown]: {
        animationDuration: `12s`,
    },
    [EffectiveTypes["3g"]]: {
        animationDuration: `15s`,
    },
    [EffectiveTypes["4g"]]: {
        animationDuration: `5s`,
    },
};
//# sourceMappingURL=Progress.jsx.map