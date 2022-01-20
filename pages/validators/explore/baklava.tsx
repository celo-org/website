import Validators from "src/dev/ValidatorsListApp"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import fetchValidators, { BlockScout } from "src/dev/validatorsFetch"

export async function getServerSideProps({ locale }) {
  const data = await fetchValidators(BlockScout.baklava)
  return {
    props: {
      data,
      ...(await serverSideTranslations(locale || "en", [NameSpaces.common, NameSpaces.dev])),
    },
  }
}

export default Validators
