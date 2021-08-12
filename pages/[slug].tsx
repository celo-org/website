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
  if (isBogus(params?.slug)) {
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

// filter out anything that wouldnt be a valid thing to pass to contentful.
// strings only, no weird stuff, this isnt php, theres nothing to login to.
function isBogus(slug: string | string[] | undefined) {
  if (!slug) {
    return true
  } else if (Array.isArray(slug)) {
    return true
  } else if (
    slug.startsWith(".") ||
    slug.endsWith(".php") ||
    slug.includes("%") ||
    slug.includes("login") ||
    slug.includes("admin")
  ) {
    return true
  }
  return false
}
