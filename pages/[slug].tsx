import CommonPage from "src/public-sector/CommonContentFullPage"
import { getPageBySlug } from "src/utils/contentful"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { GetServerSideProps } from "next"

export default CommonPage

export const getServerSideProps: GetServerSideProps = async function getServerSideProps({
  locale,
  params,
}) {
  if (typeof params?.slug !== "string" || !VALID_SLUGS.has(params?.slug)) {
    return { notFound: true }
  }

  const page = await getPageBySlug(params.slug as string, { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common])),
    },
  }
}
// only allow these slugs, this is to prevent requests for slugs that should not exist
// from being routed to contentful, which would bypass any caching and cause our usage to spike
const VALID_SLUGS = new Set(["dapps", "buy"])
