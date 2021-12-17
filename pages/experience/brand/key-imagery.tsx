import KeyImagery from "src/experience/brandkit/KeyImagery"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import makeSafeForJson from "src/utils/makeSafeForJson"

export async function getServerSideProps() {
  const AssetBase = await import("src/../server/AssetBase")
  const illos = await AssetBase.default(AssetBase.AssetSheet.Illustrations)
  
  return {
    props: makeSafeForJson({
      illos,
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.brand])),
    }),
  }
}
export default KeyImagery
