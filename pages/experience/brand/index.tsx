import Intro from "src/experience/brandkit/Intro"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getStaticProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", [(NameSpaces.common, NameSpaces.brand)])),
    },
  }
}

export default Intro
