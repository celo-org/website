import CicoPage from "src/cico/CicoPage"
import makeSafeForJson from "src/utils/makeSafeForJson"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { CicoProvider } from "src/cico/CicoPage"
import { getPageBySlug } from "src/utils/contentful"
import getCico from "server/fetchCico"

export async function getServerSideProps({ locale }) {
  const page = await getPageBySlug("connect-the-world" as string, { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }
  const result = await getCico()
  const data: Record<string, CicoProvider[]> = result.reduce((countries, provider) => {
    const country = provider.country
    if (countries[country] === null || countries[country] === undefined) {
      countries[country] = []
    }
    countries[country].push(provider)
    return countries
  }, {})

  return {
    props: makeSafeForJson({
      data,
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.cico])),
    }),
  }
}

export default CicoPage
