import CeloRewardsTerms from "src/celo-rewards/CeloRewardsTerms"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [NameSpaces.common, NameSpaces.celoRewards])),
      // Will be passed to the page component as props
    },
  }
}

export default CeloRewardsTerms