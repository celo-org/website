import * as React from "react"
import { NameSpaces, useTranslation } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/GridRow"
import { standardStyles } from "src/styles"
import { B, P } from "./stylingElements"

function RewardsKickOff() {
  const { t } = useTranslation(NameSpaces.celoRewards)

  return (
    <GridRow
      desktopStyle={standardStyles.blockMarginBottom}
      tabletStyle={standardStyles.blockMarginBottomTablet}
    >
      <Cell span={Spans.full}>
        <P>
          <B>{t("kickoff.title")}</B> {t("kickoff.body")}
        </P>
      </Cell>
    </GridRow>
  )
}

export default RewardsKickOff
