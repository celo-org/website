import ConnectPage from "src/community/CommunityPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { getPageBySlug } from "src/utils/contentful"
import { i18nLocaleToContentfulLocale } from "server/i18nSetup"

export async function getServerSideProps({ locale }) {
  const page = await getPageBySlug(
    "community",
    { locale: i18nLocaleToContentfulLocale(locale) },
    true
  )
  return {
    props: {
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.community])),
    },
  }
}

export default ConnectPage
