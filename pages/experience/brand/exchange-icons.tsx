import IconsExchangePage from "src/experience/brandkit/IconsExchangePage"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.brand])),
    },
  }
}

export default IconsExchangePage
