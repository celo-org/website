import Circles from "src/experience/eventkit/AmbassadorPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", [NameSpaces.common])),
    },
  }
}



export default Circles
