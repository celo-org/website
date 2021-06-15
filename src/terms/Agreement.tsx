import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Document } from "@contentful/rich-text-types"
import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { renderNode } from "src/contentful/nodes/nodes"
import { H1 } from "src/fonts/Fonts"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces, useTranslation } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { fonts, standardStyles, textStyles } from "src/styles"

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
      <OpenGraph title={title} path={NameSpaces.terms} description={description} />
      <View style={styles.container}>
        <GridRow
          allStyle={standardStyles.centered}
          desktopStyle={standardStyles.blockMarginBottom}
          tabletStyle={standardStyles.blockMarginBottomTablet}
          mobileStyle={standardStyles.blockMarginBottomMobile}
        >
          <Cell span={Spans.fourth}>{}</Cell>
          <Cell span={Spans.three4th} style={standardStyles.centered}>
            <H1 style={textStyles.center}>{title}</H1>
          </Cell>
        </GridRow>
        <GridRow>
          <Cell span={Spans.fourth}>
            <Text style={fonts.h6}>
              {t("updatedOn", { date: toLocaleDate(updatedAt, i18n.language) })}
            </Text>
          </Cell>
          <Cell span={Spans.three4th}>
            {sections.map((section) => {
              return documentToReactComponents(section.contentField, OPTIONS)
            })}
          </Cell>
        </GridRow>
      </View>
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

const styles = StyleSheet.create({
  container: {
    marginTop: HEADER_HEIGHT,
    paddingTop: HEADER_HEIGHT,
  },
})
