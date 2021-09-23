import ConnectPage from "src/community/CommunityPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { getPageBySlug } from "src/utils/contentful"

export async function getServerSideProps({ locale }) {
  const page = await getPageBySlug("community", { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.community])),
    },
  }
}


export default ConnectPage
