import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import * as React from "react"
import { renderNode } from "src/contentful/nodes/nodes"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces, useTranslation } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/Grid2"
import { HEADER_HEIGHT } from "src/shared/Styles"
import {
  fonts,
  standardStyles,
  textStyles,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
} from "src/estyles"
import { css } from "@emotion/react"

const OPTIONS = {
  renderNode,
}

interface Props {
  title: string
  slug: string
  updatedAt: string
  description: string
  sections: {
    name: string
    contentField: Document
  }[]
}

function Agreement(props: Props) {
  const { t, i18n } = useTranslation(NameSpaces.terms)
  const { title, sections, updatedAt, description } = props
  return (
    <>
      <OpenGraph title={title} path={"/user-agreement"} description={description} />
      <div css={containerCss}>
        <GridRow columns={4} css={headingCss}>
          <Cell span={Spans.one}>{}</Cell>
          <Cell span={Spans.three} css={standardStyles.centered}>
            <h1 css={h1Css}>{title}</h1>
          </Cell>
        </GridRow>
        <GridRow columns={4}>
          <Cell span={Spans.one}>
            <h6 css={fonts.h6}>
              {t("updatedOn", { date: toLocaleDate(updatedAt, i18n.language) })}
            </h6>
          </Cell>
          <Cell span={Spans.three}>
            {sections.map((section) => {
              return documentToReactComponents(section.contentField, OPTIONS)
            })}
          </Cell>
        </GridRow>
      </div>
    </>
  )
}

function toLocaleDate(dateString: string, locale: string) {
  return new Date(dateString).toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default Agreement

const containerCss = css({
  marginTop: HEADER_HEIGHT,
  paddingTop: HEADER_HEIGHT,
})

const h1Css = css(fonts.h1, textStyles.center)

const headingCss = css(standardStyles.centered, {
  [WHEN_DESKTOP]: standardStyles.blockMarginBottom,
  [WHEN_TABLET]: standardStyles.blockMarginBottomTablet,
  [WHEN_MOBILE]: standardStyles.blockMarginBottomMobile,
})
