
import * as React from 'react'
import {  useTranslation } from "src/i18n"
import {css} from "@emotion/react"
import AttestationsTable, {Row} from './AttestationsTable'
import DropDownGroup from 'src/shared/DropDownGroup'
import { GridRow } from 'src/layout/Grid2'
import {  WHEN_MOBILE, whiteText } from 'src/estyles'
import { colors, typeFaces } from 'src/styles'
import { Radio } from 'src/table/table'
import useCurrentRound from './useCurrentRound'
import DATA from 'src/plumo/data.json'

function useDropDown(): [string, () => void, (key: string) => void] {
  const [value, setValue] = React.useState("0")
  function clear () {
    setValue("0")
  }
  return [value, clear, setValue]
}

function useRound(phase): [Array<any>, number,  () => void, (key: string) => void, number] {
  const [round, onClearRound, onSelectRound] = useDropDown()
  const data = useCurrentRound()

  const phaseData = phase === 1 ? DATA.phase1 : DATA.phase2

  const rows: Row[] = React.useMemo(() => (
    Object.keys(phaseData[round]).map(key => ({...phaseData[round][key], address: key, count: data.progressCompleted[key]}))
  ),
  [round])


  return [rows, Number(round), onClearRound, onSelectRound, data.chunkCount]
}


export default function Rounds(): JSX.Element {
  const { t } = useTranslation('plumo')

  const [phase, setPhase] = React.useState(1)


  const [rows, round, onClearRound, onSelectRound, chunkCount] = useRound(phase)


  const dropDownData = useDropDownOptions(phase, round, onSelectRound, onClearRound)

  return (
    <GridRow columns={1} css={rootCss}>
      <h2 css={titleCss}>{t("ceremonyResults")}</h2>
      <div css={dropdownsCss}>
        <Phases phase={phase} setPhase={setPhase} />
        <label css={roundLabelCss}>
          {t("roundLabel")}
        </label>
        <div css={roundSelectorCss}>
          <DropDownGroup direction={"horizontal"} data={dropDownData} darkMode={true} />
        </div>
      </div>
      <AttestationsTable rows={rows} max={chunkCount} showProgress={phase === 2} loading={false} />
    </GridRow>
  )
}

interface PhaseProps {
  phase: number
  setPhase: (p: number) =>void
}


const Phases = React.memo(function Phases({phase, setPhase}: PhaseProps) {
  const { t } = useTranslation('plumo')
  return <>
  <label css={phaseLabelCss}>
    {t("phaseLabel")}
  </label>
  <span css={radioOne}>
    <Radio selected={phase === 1}
    labelColor={colors.white}
    colorWhenSelected={colors.primary}
    onValueSelected={setPhase} label={t("phase1")} value={1} />
  </span>
  <span css={radioTwo}>
    <Radio selected={phase === 2} labelColor={colors.white}
    colorWhenSelected={colors.primary}  onValueSelected={setPhase}
    label={t("phase2")} value={2} />
  </span>
  </>
})

const rootCss = css({
  maxWidth: 720,
  marginTop: 36,
})

const dropdownsCss = css({
  display: "grid",
  gridTemplateColumns: "max-content",
  gridTemplateAreas:`
    "phase-label phase-label round-label .."
    "phase-selector-1 phase-selector-2 round-selector .."
    `,
  columnGap: 16,
  marginBottom: 24,
  [WHEN_MOBILE]: {
    gridAutoColumns: "max-content",
    gridTemplateAreas:`
    "phase-label phase-label"
    "phase-selector-1 phase-selector-2"
    "round-label round-label"
    "round-selector round-selector"
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
    lineHeight: 1,
    [WHEN_MOBILE] : {
      fontSize: 18
    }
  },
  "svg + div": {
    paddingLeft: 8,
    paddingRight: 0
  }
})

const radioOne = css(radioCss, { gridArea: "phase-selector-1" })
const radioTwo = css(radioCss, { gridArea: "phase-selector-2" })

const phaseLabelCss = css(labelCss, {gridArea: "phase-label"})

const roundLabelCss = css(labelCss, {
  gridArea: "round-label",
  marginBottom: 12,
  [WHEN_MOBILE] : {
    marginTop: 12,
    marginBottom: 6,

  }
})

const roundSelectorCss = css({
  gridArea: "round-selector",
  "& > div > div": {
    width: 180
  },
  [WHEN_MOBILE] : {
    "& > div > div": {
      width: "100%"
    }
  }
})

const titleCss= css(whiteText, {
  fontFamily: typeFaces.futura,
  fontWeight: "normal",
  fontSize: 28,
  lineheight: 1.29,
  [WHEN_MOBILE] : {
    fontSize: 22
  }
})

function useDropDownOptions(phase: number, round: number, onSelectRound: (key: string) => void, onClearRound: () => void) {
  const { t } = useTranslation('plumo')

  const dropDownListOptions = React.useMemo(() => DATA[phase === 1 ? "phase1" : "phase2"]?.map((_, index) => {
    return {
      id: index.toString(),
      selected: round === index,
      label: t(`round.${index}`)
    }
  }), [round, phase])

  const dropDownData = [{
    name: "",
    onSelect: onSelectRound,
    onClear: onClearRound,
    list: dropDownListOptions
  }]
  return dropDownData
}
