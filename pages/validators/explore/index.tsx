import { ValidatorsListAppWithNetwork } from "src/dev/ValidatorsListApp"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps() {
  return {
    props: {
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.dev])),
    },
  }
}


export default ValidatorsListAppWithNetwork("mainnet")
