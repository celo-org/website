import Page from "src/plumo/Landing"
import { getPageBySlug } from "src/utils/contentful"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { i18nLocaleToContentfulLocale } from "server/i18nSetup"

export default Page

export async function getServerSideProps({ locale }) {
  const page = await getPageBySlug("plumo", { locale: i18nLocaleToContentfulLocale(locale) }, true)

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.plumo])),
    },
  }
}
