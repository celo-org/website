import StakeoffTerms from "src/terms/StakeOffTerms"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.terms])),
    },
  }
}


export default StakeoffTerms
