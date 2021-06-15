import Privacy from "src/privacy/Privacy"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common])),
      // Will be passed to the page component as props
    },
  }
}



export default Privacy
