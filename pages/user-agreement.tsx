import Agreement from "src/terms/Agreement"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { i18nLocaleToContentfulLocale } from "server/i18nSetup"

export async function getServerSideProps({ locale }) {
  const getPageBySlug = await import("src/utils/contentful").then((mod) => mod.getPageBySlug)
  const pageData = await getPageBySlug("user-agreement", {
    locale: i18nLocaleToContentfulLocale(locale),
  })

  if (!pageData) {
    return { notFound: true }
  }

  return {
    props: {
      ...pageData,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.terms])),
    },
  }
}

export default Agreement
