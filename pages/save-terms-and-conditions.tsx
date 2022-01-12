import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { getPageBySlug, SectionType } from "src/utils/contentful"
import OpenGraph from "src/header/OpenGraph"
import { renderNode } from "src/contentful/nodes/nodes"
import { GridRow } from "src/layout/Grid2"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { GetServerSideProps } from "next"
import { getDomainLocale } from "next/dist/shared/lib/router/router"
import { i18nLocaleToContentfulLocale } from "server/i18nSetup"

interface Props {
  title: string
  slug: string
  sections: SectionType[]
  description: string
}

const OPTIONS = { renderNode }

export default function SavingsTerms(props: Props) {
  return (
    <>
      <OpenGraph title={props.title} description={props.description} path={props.slug} />
      <GridRow columns={1} css={rootCss}>
        <div css={sectionsCss}>
          {props.sections.map((section) => {
            return documentToReactComponents(section.contentField, OPTIONS)
          })}
        </div>
      </GridRow>
    </>
  )
}

export const getServerSideProps: GetServerSideProps<Props> = async function getServerSideProps({
  locale,
}) {
  const page = await getPageBySlug(
    "save-terms-and-conditions",
    { locale: i18nLocaleToContentfulLocal(getDomainLocale) },
    false
  )

  if (!page) {
    return { notFound: true }
  }

  const sections = page.sections as SectionType[]
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common])),
      ...page,
      sections,
    },
  }
}

const rootCss = css({
  marginTop: 70,
  alignContent: "center",
})

const sectionsCss = css({
  maxWidth: "50em",
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
})
