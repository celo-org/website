import TermsPortal from "src/terms/TermsPortal"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.terms])),
    },
  }
}


export default TermsPortal
