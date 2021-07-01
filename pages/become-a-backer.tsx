import PublicSectorPage from "src/public-sector/CommonContentFullPage"
import { getPageBySlug } from "src/utils/contentful"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { GetServerSideProps } from "next"

export default PublicSectorPage

export const getServerSideProps: GetServerSideProps = async function getServerSideProps({
  locale,
}) {
  const page = await getPageBySlug("become-a-backer", { locale: "en-US" }, true)

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
