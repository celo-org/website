import throttle from "lodash.throttle";
import MobileDetect from "mobile-detect";
import * as React from "react";
import { Dimensions } from "react-native";
import { BANNER_HEIGHT } from "src/header/BlueBanner";
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from "src/shared/Styles";
export var ScreenSizes;
(function (ScreenSizes) {
    ScreenSizes["MOBILE"] = "MOBILE";
    ScreenSizes["TABLET"] = "TABLET";
    ScreenSizes["DESKTOP"] = "DESKTOP";
})(ScreenSizes || (ScreenSizes = {}));
const defaultContext = { screen: null, bannerHeight: BANNER_HEIGHT, setBannerHeight: () => null };
export const ScreenSizeContext = React.createContext(defaultContext);
export class ScreenSizeProvider extends React.PureComponent {
    state = defaultContext;
    windowResize = throttle(({ window: { width } }) => {
        const newScreen = widthToScreenType(width);
        if (newScreen !== this.state.screen) {
            this.setState({ screen: newScreen });
        }
    }, 50);
    setBannerHeight = (height) => {
        this.setState({ bannerHeight: height });
    };
    componentDidMount() {
        this.windowResize({ window: Dimensions.get("window") });
        Dimensions.addEventListener("change", this.windowResize);
    }
    componentWillUnmount() {
        Dimensions.removeEventListener("change", this.windowResize);
        this.windowResize.cancel();
    }
    screen = () => {
        return this.state.screen || widthToScreenType(Dimensions.get("screen").width);
    };
    render() {
        return (<ScreenSizeContext.Provider value={{
                screen: this.screen(),
                bannerHeight: this.state.bannerHeight,
                setBannerHeight: this.setBannerHeight,
            }}>
        {this.props.children}
      </ScreenSizeContext.Provider>);
    }
}
function widthToScreenType(width) {
    if (width >= DESKTOP_BREAKPOINT) {
        return ScreenSizes.DESKTOP;
    }
    else if (width >= TABLET_BREAKPOINT) {
        return ScreenSizes.TABLET;
    }
    else {
        return ScreenSizes.MOBILE;
    }
}
export function withScreenSize(Component) {
    return function ScreenSizeContainer(props) {
        return (<ScreenSizeContext.Consumer>
        {({ screen, bannerHeight, setBannerHeight }) => {
                return (<Component screen={screen} bannerHeight={bannerHeight} setBannerHeight={setBannerHeight} {...props}/>);
            }}
      </ScreenSizeContext.Consumer>);
    };
}
export function useScreenSize() {
    const { screen, bannerHeight, setBannerHeight } = React.useContext(ScreenSizeContext);
    return {
        bannerHeight,
        screen,
        setBannerHeight,
        isMobile: screen === ScreenSizes.MOBILE,
        isDesktop: screen === ScreenSizes.DESKTOP,
        isTablet: screen === ScreenSizes.TABLET,
    };
}
export function setDimensionsForScreen(userAgent) {
    const md = new MobileDetect(userAgent);
    if (md.mobile()) {
        Dimensions.set({
            window: { width: TABLET_BREAKPOINT - 1 },
            screen: { width: TABLET_BREAKPOINT - 1 },
        });
    }
    else if (md.tablet()) {
        Dimensions.set({
            window: { width: DESKTOP_BREAKPOINT - 1 },
            screen: { width: DESKTOP_BREAKPOINT - 1 },
        });
    }
    else {
        Dimensions.set({
            window: { width: DESKTOP_BREAKPOINT + 1 },
            screen: { width: DESKTOP_BREAKPOINT + 1 },
        });
    }
}
//# sourceMappingURL=ScreenSize.jsx.map