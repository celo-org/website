import { GridRowContentType } from "../utils/contentful"
import { cellSwitch } from "../public-sector/cellSwitch"
import { SquarePixel } from "./SquarePixel"
import { css } from "@emotion/react"
import { WHEN_DESKTOP, WHEN_MOBILE } from "../estyles"
import { GridRow } from "../layout/Grid2"
import React from "react"

interface Props {
  gridFields: GridRowContentType
}

export default function ConnectContact(props: Props) {
  const { gridFields } = props
  return (
    <GridRow
      darkMode={gridFields.darkMode}
      id={gridFields.id}
      columns={gridFields.columns}
      css={css(
        sectionsCss,
        gridFields.cssStyle,
        gridFields.desktopCss && { [WHEN_DESKTOP]: gridFields.desktopCss }
      )}
    >
      {gridFields.cells?.map((cell) => cellSwitch(cell, gridFields.darkMode, gridFields.columns))}
      <SquarePixel options={{ top: 0, right: 0 }} mobileOnly />
    </GridRow>
  )
}

const sectionsCss = css({
  position: "relative",
  paddingTop: 80,
  paddingBottom: 80,
  [WHEN_MOBILE]: {
    paddingTop: 40,
    paddingBottom: 40,
  },
})
