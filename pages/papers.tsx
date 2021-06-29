import Papers from "src/terms/Papers"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.papers])),
      // Will be passed to the page component as props
    },
  }
}


export default Papers
