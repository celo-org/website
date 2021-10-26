import throttle from "lodash.throttle"
import { SingletonRouter, withRouter } from "next/router"
import * as React from "react"
import MobileKitMenu from "src/experience/common/MobileKitMenu"
import scrollToHash from "src/experience/common/scrollToHash"
import Sidebar, { Page as Pages } from "src/experience/common/Sidebar"
import TopBar from "src/experience/common/TopBar"
import OpenGraph from "src/header/OpenGraph"
import { ScreenProps, ScreenSizes } from "src/layout/ScreenSize"
import Footer from "src/shared/Footer"
import menu from "src/shared/menu-items"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import { flex, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET, WHEN_TABLET_AND_UP } from "src/estyles"

const FOOTER_ID = "experience-footer"
const DISTANCE_TO_HIDE_AT = 25
const THROTTLE_SCROLL_MS = 150
export const ROOT = menu.BRAND.link
export const LOGO_PATH = `${ROOT}/logo`
export const COLOR_PATH = `${ROOT}/color`
export const TYPE_PATH = `${ROOT}/typography`
export const IMAGERY_PATH = `${ROOT}/key-imagery`
export const ICONS_PATH = `${ROOT}/icons`
export const EXCHANGE_ICONS_PATH = `${ROOT}/exchange-icons`
export const COMPOSITION_PATH = `${ROOT}/composition`

interface Section {
  id: string
  children: React.ReactNode
}

interface Props {
  pages: Pages[]
  router: SingletonRouter
  sections: Section[]
  title: string
  path: string
  kitName?: string
  metaDescription: string
  ogImage: string
}

interface State {
  routeHash: string
  isSidebarFrozen: boolean
  isLineVisible: boolean
}

class Page extends React.Component<Props & ScreenProps, State> {
  state: State = {
    routeHash: "",
    isSidebarFrozen: true,
    isLineVisible: false,
  }

  ratios: Record<string, { id: string; ratio: number; top: number }> = {}

  observer: IntersectionObserver

  footer = React.createRef<HTMLDivElement>()

  scrollHandeler = throttle((event) => {
    const scrollTop = event.target.scrollingElement.scrollTop
    const top = scrollTop + DISTANCE_TO_HIDE_AT
    if (top > HEADER_HEIGHT) {
      if (!this.state.isLineVisible) {
        this.setState({ isLineVisible: true })
      }
    } else {
      if (this.state.isLineVisible) {
        this.setState({ isLineVisible: false })
      }
    }
  }, THROTTLE_SCROLL_MS) as (event) => void

  onChangeHash = () => {
    this.setState({ routeHash: window.location.hash })
  }

  updateSectionHashWhenInView = (entries: IntersectionObserverEntry[]) => {
    const filteredEntries = entries.filter(({ target }) => target.id !== FOOTER_ID)
    this.ratios = filteredEntries
      .map((entry) => ({
        id: entry.target.id,
        ratio: entry.intersectionRatio,
        top: entry.boundingClientRect.top,
      }))
      .reduce((acc, currentValue) => {
        acc[currentValue.id] = currentValue
        return acc
      }, this.ratios)

    const top = Object.keys(this.ratios)
      .map((key) => this.ratios[key])
      .reduce(
        (acc, current) => {
          if (current.ratio > acc.ratio) {
            return current
          }
          return acc
        },
        { ratio: 0, id: this.state.routeHash }
      )

    if (this.state.routeHash !== top.id) {
      this.setState({ routeHash: top.id })

      window.history.replaceState(
        {},
        top.id,
        `${location.pathname}${window.location.search}#${top.id}`
      )
    }
  }

  createSectionObservers = () => {
    if (!("IntersectionObserver" in window)) {
      return
    }
    this.observer =
      this.observer ||
      new IntersectionObserver(this.updateSectionHashWhenInView, {
        threshold: [0, 0.1, 0.9, 1],
      })

    this.props.sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        this.observer.observe(element)
      }
    })
  }

  observeRef = (ref: React.RefObject<HTMLElement>) => {
    // findNodeHandle is typed to return a number but returns an Element
    const element = ref.current
    if (element instanceof Element) {
      this.observer.observe(element)
    }
  }

  componentDidMount = () => {
    this.createSectionObservers()
    this.observeRef(this.footer)

    if (this.props.screen !== ScreenSizes.MOBILE) {
      this.setScrollListener()
    }

    // once we are on a new page and have rendered add the new elements to the observation
    this.props.router?.events?.on("routeChangeComplete", this.createSectionObservers)

    window.addEventListener("hashchange", this.onChangeHash, false)
  }

  setScrollListener = () => {
    window.addEventListener("scroll", this.scrollHandeler)
  }

  componentWillUnmount = () => {
    this.observer.disconnect()
    window.removeEventListener("hashchange", this.onChangeHash)
    window.removeEventListener("scroll", this.scrollHandeler)
  }

  render() {
    const { sections, router, path, metaDescription, title } = this.props

    return (
      <>
        <OpenGraph
          title={`Celo Experience / ${title}`}
          path={path}
          description={metaDescription}
          image={this.props.ogImage}
        />
        <div css={containerCss}>
          <div css={topBarCss}>
            <div css={[grayLineOffCss, this.state.isLineVisible && grayLineCss]}>
              <TopBar current={this.props.pages[0].href} kitName={this.props.kitName} />
            </div>
            <MobileKitMenu
              pages={this.props.pages}
              pathname={router.asPath}
              routeHash={this.state.routeHash}
            />
          </div>
          <div css={rootCss}>
            <div css={sidebarCss}>
              <Sidebar
                pages={this.props.pages}
                currentPathName={router.asPath}
                routeHash={this.state.routeHash}
                onChangeRoute={moveToHash}
              />
            </div>
            <div css={desktopMainCss}>
              <div css={childrenAreaCss}>
                {sections.map(({ id, children }) => {
                  return (
                    <div key={id} id={id} css={flex}>
                      {children}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <div css={footerCss} id={FOOTER_ID} ref={this.footer}>
            <Footer hideForm={true} />
          </div>
        </div>
      </>
    )
  }
}
const rootCss = css(flex, {
  alignSelf: "center",
  flexDirection: "row",
  position: "relative",
  marginTop: 116,
  padding: 20,
  width: "100%",
  [WHEN_MOBILE]: {
    zIndex: -5,
    flexDirection: "column",
    maxWidth: "100vw",
  },
  [WHEN_TABLET]: {
    maxWidth: 958,
  },
  [WHEN_DESKTOP]: {
    maxWidth: 1080,
  },
})

const containerCss = css(flex, { isolation: "isolate", position: "relative" })

const desktopMainCss = css(flex, {
  position: "relative",
  [WHEN_TABLET_AND_UP]: {
    flex: 1,
    flexBasis: "calc(75% - 50px)",
    marginLeft: 20,
  },
})

const sidebarCss = css({
  display: "flex",
  position: "sticky",
  top: 100,
  alignSelf: "flex-start",
  minWidth: 190,
  paddingLeft: 0,
  height: "fit-content",
  [WHEN_MOBILE]: {
    display: "none",
  },
})

const grayLineCss = css({
  boxShadow: `0px 1px 1px -1px rgba(0,0,0,0.5)`,
})
const grayLineOffCss = css({
  transitionProperty: "box-shadow",
  transitionDuration: "400ms",
  marginBottom: 1,
  boxShadow: `0px 0px 0px 0px rgba(0,0,0,0)`,
  [WHEN_MOBILE]: grayLineCss,
})

const topBarCss = css({
  zIndex: 10,
  position: "fixed",
  width: "100%",
  backgroundColor: colors.white,
})

const footerCss = css({ zIndex: -10, backgroundColor: colors.white, marginTop: 50 })

const childrenAreaDesktopCss = css({
  // Design calls for *baseline* of text Title to match that of intro on side nav
  transform: "translateY(-25)",
})

const childrenAreaCss = css(flex, {
  position: "relative",
  minHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  [WHEN_TABLET_AND_UP]: childrenAreaDesktopCss,
})

export default withRouter(Page)

function moveToHash() {
  scrollToHash(60)
}
