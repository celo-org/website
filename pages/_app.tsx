import App from "next/app"
import dynamic from "next/dynamic"
import { css } from "@emotion/react"
import Head from "next/head"
import * as React from "react"
import Navigation from "src/header/Navigation"
import { ScreenSizeProvider } from "src/layout/ScreenSize"
import Button, { BTN } from "src/shared/Button.4"
import Footer from "src/shared/Footer"
import pagePaths from "src/shared/menu-items"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { fonts, textStyles } from "src/estyles"
import { getSentry, initSentry } from "src/utils/sentry"
import { appWithTranslation } from "src/i18n"
import { flex } from "src/estyles"
const SECOND = 1000
const Progress = dynamic(import("src/shared/Progress"))

const CookieConsent = dynamic(import("src/header/CookieFolder/CookieConsentWithEmotion"))

class MyApp extends App {
  state = {
    showConsent: false,
    hasError: false,
  }
  static getDerivedStateFromError() {
    return { hasError: true }
  }

  onAgree = async () => {
    this.setState({ showConsent: false })
    const agree = await import("src/analytics/analytics").then((mod) => mod.agree)
    await agree()
    await initSentry()
  }

  onDisagree = async () => {
    this.setState({ showConsent: false })
    const disagree = await import("src/analytics/analytics").then((mod) => mod.disagree)
    disagree()
  }
  async componentDidMount() {
    const analyticsModule = await import("src/analytics/analytics")
    if (window.location.hash) {
      await hashScroller(window.location.hash)
    }
    window.addEventListener("hashchange", () => hashScroller(window.location.hash))

    setTimeout(async () => {
      this.setState({
        showConsent: await analyticsModule.showVisitorCookieConsent(),
      })
    }, SECOND * 5)

    await analyticsModule.initializeAnalytics()
    await analyticsModule.default.page()
    if (await analyticsModule.canTrack()) {
      await initSentry()
    }

    this.props.router.events.on("routeChangeComplete", async () => {
      await analyticsModule.default.page()
    })

    if (process.env.ENV === "development") {
      const { checkH1Count } = await import("src/shared/checkH1Count")
      checkH1Count()
    }
  }

  // there are a few pages we dont want the header on
  // currently this is just the animation demo pages and experience kits and out art project
  skipNavigation() {
    return (
      this.props.router.asPath.startsWith("/animation") ||
      this.isBrand() ||
      this.props.router.asPath.startsWith(pagePaths.FLOWERS.link) ||
      this.props.router.asPath.startsWith(pagePaths.PLUMO.link) ||
      this.props.router.asPath == "/CeloConnect2022" ||
      this.props.router.asPath == "/celo-connect2022"
    )
  }

  isBrand = () => {
    return this.props.router.asPath.startsWith("/experience")
  }

  componentDidCatch = async (error: Error, info: React.ErrorInfo) => {
    const Sentry = await getSentry()
    Sentry.withScope((scope) => {
      scope.setExtras(info)
      Sentry.captureException(error)
    })
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <ScreenSizeProvider>
          <Progress />
          {this.skipNavigation() || <Navigation darkMode={pageProps?.darkNav} />}
          {this.state.hasError ? <FiveHundred /> : <Component {...pageProps} />}
          {this.skipNavigation() || (
            <div css={footerWrapperCss}>
              <Footer />
            </div>
          )}
          {this.state.showConsent && (
            <CookieConsent onAgree={this.onAgree} onDisagree={this.onDisagree} />
          )}
        </ScreenSizeProvider>
      </>
    )
  }
}

const footerWrapperCss = css(flex, {
  position: "relative",
})

function FiveHundred() {
  return (
    <div css={fiveHundredWrapCss}>
      <h1 css={errorTitle}>Something went wrong</h1>
      <Button text="Return Home" href="/" kind={BTN.SECONDARY} />
    </div>
  )
}

const fiveHundredWrapCss = css(flex, {
  justifyContent: "center",
  alignItems: "center",
  minHeight: "50vh",
})

const errorTitle = css(fonts.h1, textStyles.center, {
  marginBottom: 48,
  marginTop: 48,
})

export default appWithTranslation(MyApp)

async function hashScroller(id: string) {
  const element = document.getElementById(id.replace("#", ""))
  const scrollIntoView = await import("scroll-into-view").then((mod) => mod.default)
  scrollIntoView(element, { time: 100, align: { top: 0, topOffset: HEADER_HEIGHT + 100 } })
}
