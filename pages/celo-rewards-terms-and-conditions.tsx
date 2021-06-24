import CeloRewardsTerms from "src/celo-rewards/CeloRewardsTerms"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.celoRewards])),
    },
  }
}

export default CeloRewardsTerms
