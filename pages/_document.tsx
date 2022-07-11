import Document, { DocumentContext, Head, Main, Html, NextScript } from "next/document"
import Script from "next/script"
import * as React from "react"
import { AppRegistry, I18nManager } from "react-native-web"
import { setDimensionsForScreen } from "src/layout/setDimensionsForScreen"
import { getSentry } from "src/utils/sentry"

interface NextReq {
  locale: string
}

interface Props {
  locale: string
}

interface PropContext {
  req: DocumentContext["req"] & NextReq
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps(context: DocumentContext & PropContext) {
    const locale = context.req?.locale
    const userAgent = context.req?.headers["user-agent"]
    setDimensionsForScreen(userAgent)

    AppRegistry.registerComponent("Main", () => Main)

    // Use RTL layout for appropriate locales. Remember to do this client-side too.
    I18nManager.setPreferredLanguageRTL(false)

    // Get the html and styles needed to render this page.
    const { getStyleElement } = AppRegistry.getApplication("Main")
    const page = context.renderPage()
    const styles = [getStyleElement()]

    if (context.err) {
      const Sentry = await getSentry()
      Sentry.captureException(context.err)
    }

    return { ...page, locale, styles: React.Children.toArray(styles), pathname: context.pathname }
  }

  render() {
    const { locale } = this.props
    return (
      <Html lang={locale} style={{ height: "100%", width: "100%" }}>
        <Head>
          <link key="favicon" rel="shortcut icon" type="image/x-icon" href="/favicon.ico" />
          <link rel="stylesheet" href="/fonts/JostFont.css" type="text/css" />
          <link rel="stylesheet" href="/fonts/EBGaramondFont.css" type="text/css" />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
                  (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement("script");r.src=o;r.async=true;i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)})(window,document,"https://diffuser-cdn.app-us1.com/diffuser/diffuser.js","vgo");
                  vgo('setAccount', '89584074');
                  vgo('setTrackByDefault', false);
                  vgo('process');
        `,
          }}
        />
      </Html>
    )
  }
}
