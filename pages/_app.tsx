import App from 'next/app'
import getConfig from 'next/config'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'
import { View } from 'react-native'
import scrollIntoView from 'scroll-into-view'
import analytics, { canTrack, agree, disagree, initializeAnalytics, showVisitorCookieConsent } from 'src/analytics/analytics'
import { H1 } from 'src/fonts/Fonts'
import Navigation from 'src/header/Navigation'
import { ScreenSizeProvider } from 'src/layout/ScreenSize'
import Button, { BTN } from 'src/shared/Button.3'
import Footer from 'src/shared/Footer'
import pagePaths from 'src/shared/menu-items'
import Progress from 'src/shared/Progress'
import { HEADER_HEIGHT } from 'src/shared/Styles'
import { standardStyles, textStyles } from 'src/styles'
import { getSentry, initSentry } from 'src/utils/sentry'
import { appWithTranslation } from '../src/i18n'
const SECOND = 1000
const CookieConsent = dynamic((import('src/header/CookieFolder/CookieConsentWithEmotion')))

class MyApp extends App {
  state = {
    showConsent: false,
    hasError: false
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  onAgree = async () =>{
      await agree()
      this.setState({
          showConsent: false
      })
      await initSentry()
  }

  onDisagree = () => {
      disagree()
      this.setState({
          showConsent: false
      })
  }
  async componentDidMount() {
    if (window.location.hash) {
      hashScroller(window.location.hash)
    }
    window.addEventListener('hashchange', () => hashScroller(window.location.hash))

    setTimeout(async () => {
      this.setState({
        showConsent: await showVisitorCookieConsent()
      })
    }, SECOND * 5)

    await initializeAnalytics()
    await analytics.page()
    if (await canTrack()) {
      await initSentry()
    }

    this.props.router.events.on('routeChangeComplete', async () => {
      await analytics.page()
    })

    if (getConfig().publicRuntimeConfig.FLAGS.ENV === 'development') {
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
      this.props.router.asPath === pagePaths.PLUMO.link ||
      [pagePaths.CELO_REWARDS.link, pagePaths.CELO_REWARDS_EDUCATION.link].indexOf(this.props.router.pathname) >= 0
    )
  }

  isBrand = () => {
    return this.props.router.asPath.startsWith('/experience')
  }

  componentDidCatch = async (error: Error, info: object) => {
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
          {this.skipNavigation() || <Navigation />}
          {this.state.hasError ? <FiveHundred /> : <Component {...pageProps} />}
          {this.skipNavigation() || (
            <View>
              <Footer />
            </View>
          )}
          {this.state.showConsent && <CookieConsent onAgree={this.onAgree} onDisagree={this.onDisagree} />}
        </ScreenSizeProvider>
      </>
    )
  }
}

function FiveHundred() {
  return <View style={[standardStyles.centered, {height: "50vh"}]}>
      <H1 style={[textStyles.center, standardStyles.blockMarginBottomTablet]}>Oops something went wrong</H1>
      <Button text="Return Home" href="/" kind={BTN.SECONDARY}/>
    </View>
}

export default appWithTranslation(MyApp)

function checkH1Count() {
  setTimeout(() => {
    if (document.getElementsByTagName('h1').length > 1) {
      console.warn(
        'To many h1 tags on page. This decreases search rank, please limit to 1 per page',
        Array.from(document.getElementsByTagName('h1')).map((el) => el.innerText)
      )
    }
  }, 500)
}

function hashScroller(id: string) {
  const element = document.getElementById(id.replace('#', ''))

  scrollIntoView(element, { time: 100, align: { top: 0, topOffset: HEADER_HEIGHT + 100 } })
}
