import CommonPage from "src/public-sector/CommonContentFullPage"
import { getPageBySlug } from "src/utils/contentful"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { GetServerSideProps } from "next"

export default CommonPage

export const getServerSideProps: GetServerSideProps = async function getServerSideProps({
  locale,
}) {
  const page = await getPageBySlug("use-dapp", { locale: "en-US" }, true)

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
