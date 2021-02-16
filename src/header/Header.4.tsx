/** @jsx jsx */
import {jsx, css, CSSObject} from "@emotion/core"
import debounce from 'debounce'
import throttle from 'lodash.throttle'
import dynamic from 'next/dynamic'
import { SingletonRouter as Router, withRouter } from 'next/router'
import * as React from 'react'
import { WHEN_DESKTOP } from "src/estyles"
import Hamburger from 'src/header/Hamburger'
import { I18nProps, withNamespaces } from 'src/i18n'
import MediumLogo from 'src/icons/MediumLogo'
import Octocat from 'src/icons/Octocat'
import { ScreenProps, ScreenSizes, withScreenSize } from 'src/layout/ScreenSize'
import LogoDarkBg from 'src/logos/LogoDarkBg'
import LogoLightBg from 'src/logos/LogoLightBg'
import Button, { BTN } from 'src/shared/Button.3'
import Link from 'src/shared/Link'
import menu, { CeloLinks, MAIN_MENU, MenuLink, pagePaths } from 'src/shared/menu-items'
import MobileMenu from 'src/shared/MobileMenu'
import OvalCoin from 'src/shared/OvalCoin'
import { HEADER_HEIGHT } from 'src/shared/Styles'
import { colors } from 'src/styles'
const BlueBanner = dynamic(import('src/header/BlueBanner'), { loading: () => null, ssr: false })
const CookieConsent = dynamic(
  (import('src/header/CookieConsent') as unknown) as Promise<React.ComponentType>
)

const menuItems = MAIN_MENU
const mobileMenu = [menu.HOME, ...MAIN_MENU]

const PATH_TO_ATTRIBUTES: Record<string, MenuLink> = Object.keys(pagePaths).reduce((last, key) => {
  last[pagePaths[key].link] = pagePaths[key]

  return last
}, {})

interface OwnProps {
  router: Router
}

type Props = OwnProps & I18nProps & ScreenProps

interface State {
  mobileMenuActive: boolean
  menuFaded: boolean
  belowFoldUpScroll: boolean
  isBannerShowing: boolean
}

function scrollOffset() {
  return window.scrollY || document.documentElement.scrollTop
}

export class Header extends React.PureComponent<Props, State> {
  lastScrollOffset: number

  state = {
    showDesktopMenu: false,
    menuFaded: false,
    mobileMenuActive: false,
    belowFoldUpScroll: false,
    isBannerShowing: false,
  }

  handleScroll = throttle(() => {
    const goingUp = this.lastScrollOffset > scrollOffset()
    const belowFold = scrollOffset() > this.menuHidePoint()

    if (goingUp && belowFold) {
      this.setState({ belowFoldUpScroll: true })
    } else {
      this.setState({ belowFoldUpScroll: false })
    }

    if (goingUp) {
      this.setState({ menuFaded: false })
    } else if (belowFold) {
      this.setState({ menuFaded: true })
    }

    this.lastScrollOffset = scrollOffset()
  }, 100)

  clickHamburger = debounce(() => {
    if (!this.state.mobileMenuActive) {
      this.setState({
        mobileMenuActive: true,
      })
    } else {
      this.closeMenu()
    }
  }, 200)

  menuHidePoint() {
    const attributes = this.getAttributes()
    if (this.props.screen === ScreenSizes.MOBILE && attributes.menuHidePointMobile) {
      return attributes.menuHidePointMobile
    }
    return attributes.menuHidePoint || window.innerHeight - HEADER_HEIGHT - 1
  }

  componentDidMount() {
    this.lastScrollOffset = scrollOffset()
    window.addEventListener('scroll', this.handleScroll)

    this.props.router.events.on('routeChangeComplete', this.closeMenu)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  }

  closeMenu = () => {
    this.setState({ mobileMenuActive: false })
  }

  getAttributes = () => {
    return (
      PATH_TO_ATTRIBUTES[this.props.router.pathname] || {
        isDark: false,
        translucent: null,
        menuHidePoint: null,
        menuHidePointMobile: null,
      }
    )
  }

  isDarkMode = () => {
    return this.getAttributes().isDark || (this.isTranslucent() && !this.state.belowFoldUpScroll)
  }

  isTranslucent = () => {
    return this.getAttributes().translucent as boolean
  }

  getForegroundColor = () => {
    return this.isDarkMode() ? colors.white : colors.dark
  }

  getBackgroundColor = () => {
    const translucentAndNotUp =this.isTranslucent() && !this.state.belowFoldUpScroll
    return css({
      backgroundColor: translucentAndNotUp? "transparent" : this.isDarkMode() ? colors.dark : colors.white,
      [WHEN_DESKTOP]: {
        "&:hover": {
          backgroundColor: translucentAndNotUp? this.getAttributes().translucent.backgroundHover: undefined
        }
      },
    })

  }

  toggleBanner = (isBannerShowing: boolean) => {
    this.setState({ isBannerShowing })
  }

  setBannerHeight = (height: number) => {
    this.props.setBannerHeight(height)
  }

  allWhiteLogo = () => {
    return this.props.router.pathname === menu.ABOUT_US.link && !this.state.belowFoldUpScroll
  }

  willShowHamburger = () => {
    return !this.state.menuFaded || this.state.mobileMenuActive
  }

  render() {
    const { t, screen } = this.props
    const isDesktop = screen === ScreenSizes.DESKTOP
    const foreground = this.getForegroundColor()
    const isHomePage = this.props.router.pathname === menu.HOME.link

    return (
      <div
        css={[
          styles.container,
          { top: isHomePage && this.state.isBannerShowing ? this.props.bannerHeight : 0 },
          this.state.menuFaded && { height: 0 },
          this.state.mobileMenuActive && styles.mobileMenuActive,
        ]}
      >
        {isHomePage && (
          <BlueBanner onVisibilityChange={this.toggleBanner} getHeight={this.setBannerHeight} />
        )}
        <CookieConsent />
        <div css={css(styles.menuContainer,styles.background,
          this.getBackgroundColor(),
          styles.fadeTransition,
          this.state.menuFaded ? styles.menuInvisible : styles.menuVisible,
          )}>
          <Link href={'/'}>
            <div css={styles.logoLeftContainer}>
              <div css={styles.logoContainer}>
                <>
                  <div
                    // @ts-ignore
                    css={[
                      styles.fadeTransition,
                      this.state.menuFaded ? styles.menuInvisible : styles.menuVisible,
                    ]}
                  >
                    {this.isDarkMode() ? (
                      <LogoDarkBg height={30} allWhite={this.allWhiteLogo()} />
                    ) : (
                      <LogoLightBg height={30} />
                    )}
                  </div>
                </>
              </div>
            </div>
          </Link>
          {isDesktop && (
            <div
              css={[
                styles.links,
                styles.fadeTransition,
                this.state.menuFaded ? styles.menuInvisible : styles.menuVisible,
              ]}
            >
              {menuItems.map((item, index) => (
                <div key={index} css={styles.linkWrapper}>
                  <Button
                    kind={this.isDarkMode() ? BTN.DARKNAV : BTN.NAV}
                    href={item.link}
                    text={t(item.name)}
                  />
                  {this.props.router.pathname === item.link && (
                    <div css={styles.activeTab}>
                      <OvalCoin color={colors.primary} size={10} />
                    </div>
                  )}
                </div>
              ))}
              <div css={styles.linkWrapper}>
                <Button
                  kind={this.isDarkMode() ? BTN.DARKNAV : BTN.NAV}
                  href={'https://medium.com/CeloHQ'}
                  text={t('blog')}
                  target={'_blank'}
                  iconRight={<MediumLogo height={20} color={foreground} wrapWithLink={false} />}
                />
              </div>
              <div css={[styles.linkWrapper, styles.lastLink]}>
                <Button
                  kind={this.isDarkMode() ? BTN.DARKNAV : BTN.NAV}
                  href={CeloLinks.gitHub}
                  text={t('github')}
                  target={'_blank'}
                  iconRight={
                    <Octocat size={22} color={this.isDarkMode() ? colors.white : colors.dark} />
                  }
                />
              </div>
            </div>
          )}
        </div>

        {this.state.mobileMenuActive && (
          <div css={styles.menuActive}>
            <div css={styles.mobileOpenContainer}>
              <MobileMenu currentPage={this.props.router.pathname} menu={mobileMenu} />
            </div>
          </div>
        )}
          <div
            css={[
              styles.hamburger,
              styles.fadeTransition,
              this.willShowHamburger() && styles.hamburgerShowing,
              isHomePage &&
                !this.state.mobileMenuActive && {
                  transform: `translateY(${this.props.bannerHeight}px)`,
                },
            ]}
          >
            <Hamburger
              isOpen={this.state.mobileMenuActive}
              onPress={this.clickHamburger}
              color={this.getForegroundColor()}
            />
          </div>
      </div>
    )
  }
}

function flexCss(styles: CSSObject) {
  return css({
    ...styles,
    display: "flex",
  })
}


const styles = {
  fadeTransition: flexCss({
    transitionProperty: 'opacity color',
    transitionDuration: '300ms',
  }),
  menuVisible: flexCss({
    opacity: 1,
  }),
  menuInvisible: flexCss({
    opacity: 0,
    zIndex: -5,
    visibility: 'hidden',
  }),
  container: flexCss({
    position: 'fixed',
    left: 0,
    right: 0,
    display: 'flex',
    flexDirection: 'row',
    height: HEADER_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    maxWidth: '100vw',
    transitionProperty: 'top',
    transitionDuration: '300ms',
  }),
  mobileOpenContainer: flexCss({
    flex: 1,
    justifyContent: 'flex-start',
    height: '100vh',
  }),
  background: flexCss({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    opacity: 1,
    height: HEADER_HEIGHT,
  }),
  links: flexCss({
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }),
  menuContainer: flexCss({
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    paddingLeft: 20,
    marginRight: 0,
    [WHEN_DESKTOP]: {
      marginRight: 0,
      marginLeft: 0,
      paddingRight: 30,
      paddingLeft: 30,
      position: 'relative',
    }
  }),
  logoContainer: flexCss({
    paddingLeft: 6,
    paddingTop: 20,
    cursor: 'pointer',
  }),
  menuActive: flexCss({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '100vh',
    backgroundColor: colors.white,
    overflowY: 'scroll',
  }),
  mobileMenuActive: flexCss({
    bottom: 0,
    top: 0,
    height: 'auto',
    position: 'absolute',
    overflowY: 'hidden',
  }),
  activeTab: flexCss({
    position: 'absolute',
    height: 8,
    width: 7,
    bottom: -16,
  }),
  linkWrapper: flexCss({
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginLeft: 20,
    marginRight: 20,
  }),
  lastLink: flexCss({
    marginRight: 10,
  }),
  hamburger: css({
    position: 'fixed',
    top: 5,
    right: 5,
    opacity: 0,
    display: "none",
    [WHEN_DESKTOP]: {
      display: "none"
    }
  }),
  hamburgerShowing: {
    opacity: 1,
    display: "block",

  },
  logoLeftContainer: flexCss({
    flexDirection: 'row',
  }),
  hidden: flexCss({
    display: 'none',
  }),
  logoLeftVisible: flexCss({
    display: 'flex',
  }),
}

export default withNamespaces('common')(withScreenSize(withRouter<Props>(Header)))
