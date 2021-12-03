import * as React from "react"
import { css } from "@emotion/react"
import OpenGraph from "src/header/OpenGraph"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { GridRow, Spans } from "src/layout/Grid2"
import SideTitledSection from "src/layout/SideTitledSection"
import Button, { SIZE, BTN } from "src/shared/Button.3"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { standardStyles } from "src/styles"
import {
  flex,
  flexRow,
  fonts as eFonts,
  textStyles,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
} from "src/estyles"
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

function PressPage(props: I18nProps & Props) {
  const { t, press, languages, i18n } = props

  const formatted = React.useMemo(() => {
    const langList = new Set(languages)

    return press
      .filter(
        (article) =>
          Languages[article.language] === i18n.language || langList.has(Languages[article.language])
      )
      .reduce(groupByMonth, {})
  }, [languages, press, i18n.language])

  return (
    <>
      <OpenGraph
        title={"Celo | Press"}
        path={NameSpaces.audits}
        description={t("metaDescription")}
      />
      <div css={containerCss}>
        <GridRow columns={1} css={gridCss}>
          <h1 css={titleCss}>{t("title")}</h1>
          <Button
            text={t("contact")}
            kind={BTN.NAKED}
            size={SIZE.big}
            href={"mailto:press@celo.org"}
          />
        </GridRow>
        {Object.keys(formatted).map((date) => {
          return (
            <SideTitledSection
              key={date}
              span={Spans.three}
              title={new Date(date).toLocaleDateString(props.i18n.language, DATE_FORMAT)}
            >
              {formatted[date].map((item) => (
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

const gridCss = css(standardStyles.centered, flex, {
  [WHEN_DESKTOP]: standardStyles.blockMarginBottom,
  [WHEN_TABLET]: standardStyles.blockMarginBottomTablet,
  [WHEN_MOBILE]: standardStyles.blockMarginBottomMobile,
})

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
