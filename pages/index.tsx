import Home from "src/home/Home"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { getPageBySlug } from "src/utils/contentful"

export async function getServerSideProps() {
  const page = await getPageBySlug("home", { locale: "en-US" }, true)
  return {
    props: {
      ...page,
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.home])),
    },
  }
}


export default Home
