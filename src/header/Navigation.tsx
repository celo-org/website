import { css, CSSObject } from "@emotion/react"
import throttle from "lodash.throttle"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import * as React from "react"
import { WHEN_DESKTOP } from "src/estyles"
import Hamburger from "src/header/Hamburger"
import { NameSpaces, useTranslation } from "src/i18n"
import MediumLogo from "src/icons/MediumLogo"
import Octocat from "src/icons/Octocat"
import { useScreenSize } from "src/layout/ScreenSize"
import LogoDarkBg from "src/logos/LogoDarkBg"
import LogoLightBg from "src/logos/LogoLightBg"
import Button, { BTN } from "src/shared/Button.4"
import Link from "src/shared/Link"
import menu, { CeloLinks, MAIN_MENU, MenuLink, pagePaths } from "src/shared/menu-items"
const MobileMenu = dynamic(import("src/shared/MobileMenu"))
import OvalCoin from "src/shared/OvalCoin"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { colors } from "src/colors"
import NewLogo from "src/logos/NewLogo"
import NewMenuIcon from "src/header/NewMenuIcon"
import { isConnectTheWorldPage as isConnectTheWorldPageFunc } from "../utils/utils"
const BlueBanner = dynamic(import("src/header/BlueBanner"), { loading: () => null, ssr: false })

const menuItems = MAIN_MENU
const mobileMenu = [menu.HOME, ...MAIN_MENU]

const PATH_TO_ATTRIBUTES: Record<string, MenuLink> = Object.keys(pagePaths).reduce((last, key) => {
  last[pagePaths[key].link] = pagePaths[key]

  return last
}, {})

function scrollOffset() {
  return window.scrollY || document.documentElement.scrollTop
}

function useAttributes() {
  const { pathname } = useRouter()
  return (
    PATH_TO_ATTRIBUTES[pathname] || {
      isDark: false,
      translucent: null,
      menuHidePoint: null,
      menuHidePointMobile: null,
    }
  )
}

function useMenuHidePoint(): number | undefined {
  const { isMobile } = useScreenSize()
  const attributes = useAttributes()
  if (isMobile && attributes.menuHidePointMobile) {
    return attributes.menuHidePointMobile
  }
  return attributes.menuHidePoint
}

function useScroll() {
  const lastScrollOffset = React.useRef(0)
  const [menuFaded, setMenuFaded] = React.useState(false)
  const [belowFoldUpScroll, setBelowFoldUpScroll] = React.useState(false)
  const menuHidePoint = useMenuHidePoint()
  React.useEffect(() => {
    lastScrollOffset.current = scrollOffset()

    const handleScroll = throttle(() => {
      const goingUp = lastScrollOffset.current > scrollOffset()
      const belowFold = scrollOffset() > (menuHidePoint || window.innerHeight - HEADER_HEIGHT - 1)

      if (goingUp && belowFold) {
        setBelowFoldUpScroll(true)
      } else {
        setBelowFoldUpScroll(false)
      }

      if (goingUp) {
        setMenuFaded(false)
      } else if (belowFold) {
        setMenuFaded(true)
      }

      lastScrollOffset.current = scrollOffset()
    }, 100)

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [menuHidePoint])

  return { menuFaded, belowFoldUpScroll }
}

function useBanner() {
  const [isBannerShowing, setBannerVisible] = React.useState(false)

  return { isBannerShowing, setBannerVisible }
}

function useMobileMenu(): [boolean, () => void] {
  const { events } = useRouter()
  const [mobileMenuActive, setMobileMenuActive] = React.useState(false)

  function closeMenu() {
    setMobileMenuActive(false)
  }

  React.useEffect(() => {
    events.on("routeChangeComplete", closeMenu)
  }, [events])

  function clickHamburger() {
    if (!mobileMenuActive) {
      setMobileMenuActive(true)
    } else {
      closeMenu()
    }
  }

  return [mobileMenuActive, clickHamburger]
}

interface Props {
  darkMode: boolean
}

export default function Header(props: Props) {
  const { bannerHeight } = useScreenSize()
  const { setBannerVisible, isBannerShowing } = useBanner()
  const { pathname } = useRouter()
  const attributes = useAttributes()
  const isHomePage = pathname === menu.HOME.link
  const isConnectTheWorldPage = isConnectTheWorldPageFunc(pathname)
  const [mobileMenuActive, clickHamburger] = useMobileMenu()

  const { menuFaded, belowFoldUpScroll } = useScroll()
  const willShowHamburger = !menuFaded || mobileMenuActive

  const isDarkMode =
    attributes.isDark || props.darkMode || (attributes.translucent && !belowFoldUpScroll)

  const backgroundColor = React.useMemo(() => {
    const translucentAndNotUp = attributes.translucent && !belowFoldUpScroll
    return css({
      backgroundColor: translucentAndNotUp
        ? "transparent"
        : isDarkMode
        ? "transparent"
        : colors.white,
      [WHEN_DESKTOP]: {
        "&:hover": {
          backgroundColor: translucentAndNotUp ? attributes.translucent.backgroundHover : undefined,
        },
      },
    })
  }, [attributes.translucent, belowFoldUpScroll, isDarkMode])

  const allWhiteLogo = pathname === menu.ABOUT_US.link && !belowFoldUpScroll

  return (
    <div
      css={css(
        styles.container,
        { top: isHomePage && isBannerShowing ? bannerHeight : 0 },
        menuFaded && { height: 0 },
        mobileMenuActive && styles.mobileMenuActive
      )}
    >
      {isHomePage && <BlueBanner onVisibilityChange={setBannerVisible} />}

      <div
        css={css(
          styles.menuContainer,
          styles.background,
          backgroundColor,
          styles.fadeTransition,
          menuFaded ? styles.menuInvisible : styles.menuVisible
        )}
      >
        <HomeLogo menuFaded={menuFaded} isDarkMode={isDarkMode} allWhiteLogo={allWhiteLogo} />
        {!isConnectTheWorldPage && (
          <NavigationLinks menuFaded={menuFaded} isDarkMode={isDarkMode} />
        )}
      </div>

      {mobileMenuActive && (
        <div css={styles.menuActive}>
          <div css={styles.mobileOpenContainer}>
            <MobileMenu currentPage={pathname} menu={mobileMenu} />
          </div>
        </div>
      )}
      {isConnectTheWorldPage ? (
        <NewMenuIcon onPress={clickHamburger} isOpen={mobileMenuActive} menuFaded={menuFaded} />
      ) : (
        <MobileMenuIcon
          isDarkMode={isDarkMode}
          willShowHamburger={willShowHamburger}
          isHomePage={isHomePage}
          mobileMenuActive={mobileMenuActive}
          bannerHeight={isBannerShowing ? bannerHeight : 0}
          clickHamburger={clickHamburger}
        />
      )}
    </div>
  )
}

const HomeLogo = React.memo(function _HomeLogo({
  menuFaded,
  isDarkMode,
  allWhiteLogo,
}: {
  menuFaded: boolean
  isDarkMode: boolean
  allWhiteLogo: boolean
}) {
  const { pathname } = useRouter()
  const useNewLogo = pathname === "/connect-the-world"
  return (
    <Link href={"/"}>
      <div css={styles.logoLeftContainer}>
        <div css={styles.logoContainer}>
          <>
            <div
              css={css(
                styles.fadeTransition,
                menuFaded ? styles.menuInvisible : styles.menuVisible
              )}
            >
              {useNewLogo ? (
                <NewLogo />
              ) : isDarkMode ? (
                <LogoDarkBg height={30} allWhite={allWhiteLogo} />
              ) : (
                <LogoLightBg height={30} />
              )}
            </div>
          </>
        </div>
      </div>
    </Link>
  )
})

const NavigationLinks = React.memo(function _NavigationLinks(props: {
  menuFaded: boolean
  isDarkMode: boolean
}) {
  const { t } = useTranslation(NameSpaces.common)
  const foregroundColor = props.isDarkMode ? colors.white : colors.dark
  const { pathname, asPath } = useRouter()

  return (
    <nav
      css={[
        styles.links,
        styles.fadeTransition,
        props.menuFaded ? styles.menuInvisible : styles.menuVisible,
      ]}
    >
      {menuItems.map((item) => (
        <div key={item.link} css={styles.linkWrapper}>
          <Button
            kind={props.isDarkMode ? BTN.DARKNAV : BTN.NAV}
            href={item.link}
            text={t(item.name)}
          />
          {(pathname === item.link || asPath === item.link) && (
            <div css={styles.activeTab}>
              <OvalCoin color={colors.primary} size={10} />
            </div>
          )}
        </div>
      ))}
      <div css={styles.linkWrapper}>
        <Button
          kind={props.isDarkMode ? BTN.DARKNAV : BTN.NAV}
          href={"https://medium.com/CeloHQ"}
          text={""}
          target={"_blank"}
          iconRight={<MediumLogo height={20} color={foregroundColor} wrapWithLink={false} />}
        />
      </div>
      <div css={[styles.linkWrapper, styles.lastLink]}>
        <Button
          kind={props.isDarkMode ? BTN.DARKNAV : BTN.NAV}
          href={CeloLinks.gitHub}
          text={""}
          target={"_blank"}
          iconRight={<Octocat size={22} color={props.isDarkMode ? colors.white : colors.dark} />}
        />
      </div>
    </nav>
  )
})

function MobileMenuIcon(props: {
  isDarkMode: boolean
  willShowHamburger: boolean
  isHomePage: boolean
  mobileMenuActive: boolean
  bannerHeight: number
  clickHamburger: () => void
}) {
  const foregroundColor = props.isDarkMode ? colors.white : colors.dark

  const containerStyle = css(
    styles.hamburger,
    styles.fadeTransition,
    props.willShowHamburger && styles.hamburgerShowing,
    props.isHomePage &&
      !props.mobileMenuActive && {
        transform: `translateY(${props.bannerHeight}px)`,
      }
  )

  return (
    <div css={containerStyle}>
      <Hamburger
        isOpen={props.mobileMenuActive}
        onPress={props.clickHamburger}
        color={foregroundColor}
      />
    </div>
  )
}

function flexCss(cssStyle: CSSObject) {
  return css(
    {
      display: "flex",
    },
    cssStyle
  )
}

const styles = {
  fadeTransition: css({
    transitionProperty: "opacity color",
    transitionDuration: "200ms",
  }),
  menuVisible: css({
    opacity: 1,
  }),
  menuInvisible: css({
    opacity: 0,
    zIndex: -5,
    visibility: "hidden",
  }),
  container: flexCss({
    position: "fixed",
    left: 0,
    right: 0,
    display: "flex",
    flexDirection: "row",
    height: HEADER_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 30,
    maxWidth: "100vw",
    transitionProperty: "top",
    transitionDuration: "200ms",
  }),
  mobileOpenContainer: flexCss({
    flex: 1,
    justifyContent: "flex-start",
    height: "100vh",
  }),
  background: flexCss({
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    opacity: 1,
    height: HEADER_HEIGHT,
  }),
  links: css({
    display: "none",
    [WHEN_DESKTOP]: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-end",
      alignItems: "center",
    },
  }),
  menuContainer: flexCss({
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch",
    alignSelf: "stretch",
    paddingLeft: 20,
    marginRight: 0,
    [WHEN_DESKTOP]: {
      marginRight: 0,
      marginLeft: 0,
      paddingRight: 30,
      paddingLeft: 30,
      position: "relative",
    },
  }),
  logoContainer: flexCss({
    paddingLeft: 6,
    paddingTop: 20,
    cursor: "pointer",
  }),
  menuActive: flexCss({
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: "100vh",
    backgroundColor: colors.white,
    overflowY: "scroll",
  }),
  mobileMenuActive: flexCss({
    bottom: 0,
    top: 0,
    height: "auto",
    position: "absolute",
    overflowY: "hidden",
  }),
  activeTab: flexCss({
    position: "absolute",
    height: 8,
    width: 7,
    bottom: -16,
  }),
  linkWrapper: flexCss({
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: 20,
    marginRight: 20,
  }),
  lastLink: flexCss({
    marginRight: 10,
  }),
  hamburger: css({
    position: "fixed",
    top: 10,
    right: 5,
    opacity: 0,
    display: "none",
    [WHEN_DESKTOP]: {
      display: "none",
    },
  }),
  hamburgerShowing: {
    opacity: 1,
    display: "block",
  },
  logoLeftContainer: flexCss({
    flexDirection: "row",
  }),
  hidden: {
    display: "none",
  },
  logoLeftVisible: {
    display: "flex",
  },
}
