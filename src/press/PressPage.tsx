import * as React from "react"
import { css } from "@emotion/react"
import OpenGraph from "src/header/OpenGraph"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import SideTitledSection from "src/layout/SideTitledSection"
import Button, { SIZE, BTN } from "src/shared/Button.3"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { standardStyles } from "src/styles"
import { flex, flexRow, fonts as eFonts, textStyles } from "src/estyles"
import { HelpfulLink } from "src/terms/HelpfulLink"
import { Languages } from "src/utils/languages"

export interface PressArticleFields {
  date: string
  publication: string
  title: string
  link: string
  language: string
}

interface Props {
  press: PressArticleFields[]
  languages: string
}

class PressPage extends React.PureComponent<I18nProps & Props> {
  static async getInitialProps(context) {
    let press = []
    let languages = []
    try {
      // when run on server import fetching code and run. on client send req to api
      if (context.req) {
        const getpress = await import("src/../server/fetchPress")
        press = await getpress.default()
        languages = context.req.headers["accept-language"]
          .toLowerCase()
          .split(",")
          .map((s) => s.substr(0, 2))
      } else {
        const res = await fetch(`/api/press`)
        press = await res.json()
        languages = navigator.languages ? navigator.languages.map((s) => s.substr(0, 2)) : []
      }
      return { press, languages }
    } catch {
      return { press, languages }
    }
  }
  render() {
    const { t, press, languages, i18n } = this.props
    const langList = new Set(languages)

    const formated = press
      .filter(
        (article) =>
          langList.has(Languages[article.language]) || Languages[article.language] === i18n.language
      )
      .reduce(groupByMonth, {})

    return (
      <>
        <OpenGraph
          title={"Celo | Press"}
          path={NameSpaces.audits}
          description={t("metaDescription")}
        />
        <div css={containerCss}>
          <GridRow
            allStyle={standardStyles.centered}
            desktopStyle={standardStyles.blockMarginBottom}
            tabletStyle={standardStyles.blockMarginBottomTablet}
            mobileStyle={standardStyles.blockMarginBottomMobile}
          >
            <Cell span={Spans.three4th} style={standardStyles.centered}>
              <h1 css={titleCss}>{t("title")}</h1>
              <Button
                text={t("contact")}
                kind={BTN.NAKED}
                size={SIZE.big}
                href={"mailto:press@celo.org"}
              />
            </Cell>
          </GridRow>
          {Object.keys(formated).map((date) => {
            return (
              <SideTitledSection
                key={date}
                span={Spans.three4th}
                title={new Date(date).toLocaleDateString(this.props.i18n.language, DATE_FORMAT)}
              >
                {formated[date].map((item) => (
                  <div css={referenceCss} key={item.title}>
                    <p css={articleCss}>{item.title}</p>
                    <p css={publisherLinkCss}>
                      <span css={publisherCss}>{t("by", { publisher: item.publication })}</span>
                      {item.link && <HelpfulLink text={t("read")} href={item.link} />}
                    </p>
                  </div>
                ))}
              </SideTitledSection>
            )
          })}
        </div>
      </>
    )
  }
}

const titleCss = css(eFonts.h1, {
  textAlign: "center",
  marginBottom: 16,
})

const articleCss = css(eFonts.body, textStyles.heavy, {
  marginTop: 0,
  marginBottom: 0,
})

const publisherLinkCss = css(eFonts.body, flexRow, {
  marginTop: 8,
})

const publisherCss = css(textStyles.italic, {
  marginRight: 24,
})

const DATE_FORMAT = { year: "numeric" as const, month: "long" as const }

export default withNamespaces(NameSpaces.press)(PressPage)

const containerCss = css(flex, {
  marginTop: HEADER_HEIGHT,
  paddingTop: HEADER_HEIGHT,
  minHeight: 450,
})

const referenceCss = css(flex, {
  marginBottom: 40,
  maxWidth: 700,
})

// groups by month by changing all dates to the 15th of month they are in
export function groupByMonth(previous: any, current) {
  const originDate = new Date(current.date)

  originDate.setDate(15)

  const groupedDate = originDate.toISOString().split("T")[0]

  const month = (previous[groupedDate] = previous[groupedDate] || [])

  month.push(current)

  return previous
}
