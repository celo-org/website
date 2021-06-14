import CeloRewards from "src/celo-rewards/CeloRewards"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.celoRewards])),
    },
  }
}

export default CeloRewards
