import { GridRowContentType } from "../utils/contentful"
import { css } from "@emotion/react"
import { flex } from "../estyles"
import { colors } from "../colors"
import { cellSwitch } from "../public-sector/cellSwitch"

interface Props {
  gridFields: GridRowContentType
}

export default function LogoGrid(props: Props) {
  const { gridFields } = props
  return (
    <section css={mainCss}>
      {gridFields.cells?.map((cell) => cellSwitch(cell, gridFields.darkMode, gridFields.columns))}
    </section>
  )
}

const mainCss = css(flex, {
  paddingTop: 136,
  backgroundColor: colors.baseTan,
  color: colors.black,
})
