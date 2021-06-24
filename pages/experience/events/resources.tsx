import resources from "src/experience/eventkit/ResourcesPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", [NameSpaces.common])),
    },
  }
}

export default resources
