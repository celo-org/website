import CicoPage from "src/cico/CicoPage"
import makeSafeForJson from "src/utils/makeSafeForJson"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"

export async function getServerSideProps(context) {
  const getCico = await import("src/../server/fetchCico")
  const data = await getCico.default()
  return {
    props: makeSafeForJson({
      data,
      ...(await serverSideTranslations(context.locale, [NameSpaces.common])),
    }),
  }
}

export default CicoPage
