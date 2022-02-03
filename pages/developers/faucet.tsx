import FaucetPage from "src/dev/FaucetPage"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale || "en", [NameSpaces.common, NameSpaces.faucet])),
    },
  }
}

export default FaucetPage
