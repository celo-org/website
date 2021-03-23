
import * as React from 'react'
import {  useTranslation } from "src/i18n"
import {css} from "@emotion/react"
import AttestationsTable from './AttestationsTable'
import DropDownGroup from 'src/shared/DropDownGroup'
import { GridRow } from 'src/layout/Grid2'
import {  WHEN_MOBILE, whiteText } from 'src/estyles'
import { colors, typeFaces } from 'src/styles'
import { Radio } from 'src/table/table'
import useCurrentRound from './useCurrentRound'

function useDropDown(): [string, () => void, (key: string) => void] {
  const [value, setValue] = React.useState("0")

  function clear () {
    setValue("0")
  }

  return [value, clear, setValue]
}

export default function Rounds() {
  const { t } = useTranslation('plumo')
  const [round, onClearRound, onSelectRound] = useDropDown()
  const [phase, setPhase] = React.useState(1)

  const data = useCurrentRound()

  const rows = data.participantIds.map((id) => {
    return {
      name: id,
      address: id,
      count: (data.progress[id]),
      max: data.chunkCount,
      twitter: "",
      github: ""
    }
  })

  const dropDownData = [
    {
      name: t("select.round"),
      list: [{
        id: "1",
        selected: round === "1",
        label: t(`rounds.${"1"}`)
      }],
      onSelect: onSelectRound,
      onClear: onClearRound
    }
  ]

  return (
    <GridRow columns={1} css={rootCss}>
      <h2 css={titleCss}>{t("ceremonyResults")}</h2>
      <div css={dropdownsCss}>
        <label css={phaseLabelCss}>
          Phase
        </label>
        <span css={css(radioCss,{gridArea: "phase-selector-1"})}>
          <Radio selected={phase === 1} labelColor={colors.white} colorWhenSelected={colors.primary} onValueSelected={setPhase} label={"Powers of Tau"} value={1} />
        </span>
        <span css={css(radioCss,{gridArea: "phase-selector-2"})}>
          <Radio selected={phase === 2} labelColor={colors.white} colorWhenSelected={colors.primary}  onValueSelected={setPhase} label={"Plumo Circuit"} value={2} />
        </span>
        <label css={roundLabelCss}>
          Round
        </label>
        <DropDownGroup direction={"horizontal"} data={dropDownData} darkMode={true} />
      </div>
      <AttestationsTable rows={rows} max={data.chunkCount} />
    </GridRow>
  )
}

const rootCss = css({maxWidth: 686})

const dropdownsCss = css({
  display: "grid",
  gridAutoColumns: "max-content",
  gridTemplateAreas:`
    "phase-label phase-label round-label"
    "phase-selector-1 phase-selector-2 round-selector"
    `,
  columnGap: 24,
  marginBottom: 24,
  [WHEN_MOBILE]: {
    gridTemplateAreas:`
    "phase-label phase-label"
    "phase-selector-1"
    "phase-selector-2"
    "round-label"
    "round-selector"
    `,
  }
})

const labelCss= css(whiteText,{
  fontFamily: typeFaces.futura,
  fontSize: 16,
  fontWeight: "bold"
})

const radioCss = css({
  display: "inline-flex",
  alignItems: "center",
  label: {
    // fontFamily: typeFaces.futura,
    // fontSize: 16,
    lineHeight: 1
  },
  "svg + div": {
    paddingLeft: 8,
    paddingRight: 0
  }
})

const phaseLabelCss = css(labelCss, {gridArea: "phase-label"})

const roundLabelCss = css(labelCss, {gridArea: "round-label", marginBottom: 12})

const titleCss= css(whiteText, {
  fontFamily: typeFaces.futura,
  fontWeight: "normal",
  fontSize: 28,
  lineheight: 1.29,
  [WHEN_MOBILE] : {
    fontSize: 22
  }
})