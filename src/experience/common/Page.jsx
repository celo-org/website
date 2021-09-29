import throttle from "lodash.throttle";
import { withRouter } from "next/router";
import * as React from "react";
import { findNodeHandle, StyleSheet, View } from "react-native";
import MobileKitMenu from "src/experience/common/MobileKitMenu";
import scrollToHash from "src/experience/common/scrollToHash";
import Sidebar from "src/experience/common/Sidebar";
import Topbar from "src/experience/common/TopBar";
import OpenGraph from "src/header/OpenGraph";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import { ScreenSizes, withScreenSize } from "src/layout/ScreenSize";
import Footer from "src/shared/Footer";
import menu from "src/shared/menu-items";
import { HEADER_HEIGHT } from "src/shared/Styles";
import { colors, standardStyles } from "src/styles";
const FOOTER_ID = "experience-footer";
const DISTANCE_TO_HIDE_AT = 25;
const THROTTLE_SCROLL_MS = 150;
export const ROOT = menu.BRAND.link;
export const LOGO_PATH = `${ROOT}/logo`;
export const COLOR_PATH = `${ROOT}/color`;
export const TYPE_PATH = `${ROOT}/typography`;
export const IMAGERY_PATH = `${ROOT}/key-imagery`;
export const ICONS_PATH = `${ROOT}/icons`;
export const EXCHANGE_ICONS_PATH = `${ROOT}/exchange-icons`;
export const COMPOSITION_PATH = `${ROOT}/composition`;
class Page extends React.Component {
    state = {
        routeHash: "",
        isSidebarFrozen: true,
        isLineVisible: false,
    };
    ratios = {};
    observer;
    footer = React.createRef();
    scrollHandeler = throttle((event) => {
        const scrollTop = event.target.scrollingElement.scrollTop;
        const top = scrollTop + DISTANCE_TO_HIDE_AT;
        if (top > HEADER_HEIGHT) {
            if (!this.state.isLineVisible) {
                this.setState({ isLineVisible: true });
            }
        }
        else {
            if (this.state.isLineVisible) {
                this.setState({ isLineVisible: false });
            }
        }
    }, THROTTLE_SCROLL_MS);
    onChangeHash = () => {
        this.setState({ routeHash: window.location.hash });
    };
    updateSectionHashWhenInView = (entries) => {
        const filteredEntries = entries.filter(({ target }) => target.id !== FOOTER_ID);
        this.ratios = filteredEntries
            .map((entry) => ({
            id: entry.target.id,
            ratio: entry.intersectionRatio,
            top: entry.boundingClientRect.top,
        }))
            .reduce((acc, currentValue) => {
            acc[currentValue.id] = currentValue;
            return acc;
        }, this.ratios);
        const top = Object.keys(this.ratios)
            .map((key) => this.ratios[key])
            .reduce((acc, current) => {
            if (current.ratio > acc.ratio) {
                return current;
            }
            return acc;
        }, { ratio: 0, id: this.state.routeHash });
        if (this.state.routeHash !== top.id) {
            this.setState({ routeHash: top.id });
            window.history.replaceState({}, top.id, `${location.pathname}${window.location.search}#${top.id}`);
        }
    };
    createSectionObservers = () => {
        if (!("IntersectionObserver" in window)) {
            return;
        }
        this.observer =
            this.observer ||
                new IntersectionObserver(this.updateSectionHashWhenInView, {
                    threshold: [0, 0.1, 0.9, 1],
                });
        this.props.sections.forEach((section) => {
            const element = document.getElementById(section.id);
            if (element) {
                this.observer.observe(element);
            }
        });
    };
    observeRef = (ref) => {
        const element = findNodeHandle(ref.current);
        if (element instanceof Element) {
            this.observer.observe(element);
        }
    };
    componentDidMount = () => {
        this.createSectionObservers();
        this.observeRef(this.footer);
        if (this.props.screen !== ScreenSizes.MOBILE) {
            this.setScrollListener();
        }
        this.props.router?.events?.on("routeChangeComplete", this.createSectionObservers);
        window.addEventListener("hashchange", this.onChangeHash, false);
    };
    setScrollListener = () => {
        window.addEventListener("scroll", this.scrollHandeler);
    };
    componentWillUnmount = () => {
        this.observer.disconnect();
        window.removeEventListener("hashchange", this.onChangeHash);
        window.removeEventListener("scroll", this.scrollHandeler);
    };
    render() {
        const { screen, sections, router, path, metaDescription, title } = this.props;
        const isMobile = screen === ScreenSizes.MOBILE;
        return (<>
        <OpenGraph title={`Celo Experience / ${title}`} path={path} description={metaDescription} image={this.props.ogImage}/>
        <View style={styles.conatiner}>
          <View style={styles.topbar}>
            <View style={[
                styles.grayLineOff,
                (this.state.isLineVisible || isMobile) && styles.grayLine,
            ]}>
              <Topbar current={this.props.pages[0].href} kitName={this.props.kitName}/>
            </View>
            {isMobile && (<MobileKitMenu pages={this.props.pages} pathname={router.asPath} routeHash={this.state.routeHash}/>)}
          </View>

          <GridRow mobileStyle={styles.mobileMain} desktopStyle={standardStyles.sectionMarginTop}>
            <Cell span={Spans.fourth} style={styles.sidebar}>
              {!isMobile && (<Sidebar pages={this.props.pages} currentPathName={router.asPath} routeHash={this.state.routeHash} onChangeRoute={moveToHash}/>)}
            </Cell>
            <Cell span={Spans.three4th} style={!isMobile && styles.desktopMain}>
              <View style={[
                styles.childrenArea,
                screen === ScreenSizes.DESKTOP && styles.childrenAreaDesktop,
            ]}>
                {sections.map(({ id, children }) => {
                return (<View key={id} nativeID={id}>
                      {children}
                    </View>);
            })}
              </View>
            </Cell>
          </GridRow>
          <View style={styles.footer} nativeID={FOOTER_ID} ref={this.footer}>
            <Footer hideForm={true}/>
          </View>
        </View>
      </>);
    }
}
const styles = StyleSheet.create({
    conatiner: { isolation: "isolate" },
    mobileMain: { zIndex: -5, marginTop: 116 },
    desktopMain: { flex: 1, flexBasis: "calc(75% - 50px)" },
    sidebar: { minWidth: 190, paddingLeft: 0 },
    grayLineOff: {
        transitionProperty: "box-shadow",
        transitionDuration: "400ms",
        marginBottom: 1,
        boxShadow: `0px 0px 0px 0px rgba(0,0,0,0)`,
    },
    grayLine: {
        boxShadow: `0px 1px 1px -1px rgba(0,0,0,0.5)`,
    },
    topbar: {
        zIndex: 10,
        position: "fixed",
        width: "100%",
        backgroundColor: colors.white,
    },
    footer: { zIndex: -10, backgroundColor: colors.white, marginTop: 50 },
    childrenArea: {
        minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
    },
    childrenAreaDesktop: {
        transform: [{ translateY: -25 }],
    },
});
export default withRouter(withScreenSize(Page));
function moveToHash() {
    scrollToHash(60);
}
//# sourceMappingURL=Page.jsx.map