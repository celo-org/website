import IconsPage from "src/experience/brandkit/IconsPage"

import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import makeSafeForJson from "src/utils/makeSafeForJson"

export async function getServerSideProps({ locale }) {
  const AssetBase = await import("src/../server/AssetBase")
  const icons = await AssetBase.default(AssetBase.AssetSheet.Icons)

  return {
    props: makeSafeForJson({
      icons,
      ...(await serverSideTranslations(locale || "en", [NameSpaces.common, NameSpaces.brand])),
    }),
  }
}

export default IconsPage
