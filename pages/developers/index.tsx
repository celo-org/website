import DevelopersPage from "src/dev/DevelopersPage"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { getPageBySlug } from "src/utils/contentful"

export default DevelopersPage

export async function getServerSideProps({ locale }) {
  const page = await getPageBySlug("developers", { locale: "en-US" }, true)

  if (!page) {
    return { notFound: true }
  }

  return {
    props: {
      ...page,
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.terms])),
    },
  }
}
