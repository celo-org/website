import page from "src/experience/eventkit/ExamplesPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [NameSpaces.common])),
    },
  }
}

export default page
