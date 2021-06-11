import KeyImagery from "src/experience/brandkit/KeyImagery"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import makeSafeForJson from "src/utils/makeSafeForJson"

export async function getServerSideProps() {
  const AssetBase = await import("src/../server/AssetBase")
  const [illos, graphics] = await Promise.all([
    AssetBase.default(AssetBase.AssetSheet.Illustrations),
    AssetBase.default(AssetBase.AssetSheet.AbstractGraphics),
  ])

  return {
    props: makeSafeForJson({
      illos,
      graphics,
      ...(await serverSideTranslations("en", [(NameSpaces.common, NameSpaces.brand)])),
    }),
  }
}
export default KeyImagery
