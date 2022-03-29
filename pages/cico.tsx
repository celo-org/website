import CicoPage from "src/cico/CicoPage"
import makeSafeForJson from "src/utils/makeSafeForJson"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { CicoProvider } from "src/cico/CicoPage"
import { getPageBySlug } from "src/utils/contentful"

export async function getServerSideProps({ locale }) {
  const getCico = await import("src/../server/fetchCico")
  const result = await getCico.default()
  const data: Record<string, CicoProvider[]> = result.reduce((countries, provider) => {
    const country = provider.country
    if (countries[country] === null || countries[country] === undefined) {
      countries[country] = []
    }
    countries[country].push(provider)
    return countries
  }, {})

  const page = await getPageBySlug("cico-database" as string, { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }

  return {
    props: makeSafeForJson({
      data,
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.cico])),
    }),
  }
}

export default CicoPage
