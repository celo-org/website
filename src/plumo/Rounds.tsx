
import * as React from 'react'
import {  useTranslation } from "src/i18n"
import {css} from "@emotion/react"
import AttestationsTable, {Row} from './AttestationsTable'
import DropDownGroup, {DropDownProps} from 'src/shared/DropDownGroup'
import { GridRow } from 'src/layout/Grid2'
import {  WHEN_MOBILE, whiteText } from 'src/estyles'
import { colors, typeFaces } from 'src/styles'
import { Radio } from 'src/table/table'
import useCurrentRound from "./useCurrentRound"
import usePhase from './usePhase'
import Safety from "./Safety"

function useDropDown(): [number, () => void, (key: number) => void] {
  const [value, _setValue] = React.useState(0)
  function clear() {
    _setValue(0)
  }
  function setValue(val: string | number) {
    _setValue(Number(val))
  }
  return [value, clear, setValue]
}

interface Rounds {
  phase: number
  rows: Row[]
  dropDownData: DropDownProps[]
  setPhase: (phase: number) => void
  isPhaseLoading: boolean
  isActiveRoundLoading: boolean
  phase2Available: boolean
}


function useDropDownOptions(
  roundsInPhase: any[],
  phase: number,
  round: number,
  onSelectRound: (key:  number | string) => void,
  onClearRound: () => void
) {
  const { t } = useTranslation("plumo")
  const dropDownListOptions = React.useMemo(
    () => roundsInPhase.map((_, index) => {
            return {
              id: index.toString(),
              selected: round === index,
              label: t(`round.${index}`),
            }
          }),
      [round, phase, roundsInPhase]
  )

  const dropDownData = [
    {
      name: "",
      onSelect: onSelectRound,
      onClear: onClearRound,
      list: dropDownListOptions,
    },
  ]
  return dropDownData
}


function useRound(): Rounds {
  const [round, onClearRound, onSelectRound] = useDropDown()
  const currentRound = useCurrentRound()
  const {isValidating, phases} = usePhase()

  const [phase, setPhase] = React.useState(1)

  const phaseRounds = (phase === 1 ? phases?.phase1 : phases?.phase2) ||[]

  const roundIsCurrent = currentRound.round === round

  // if phase 2 is available select it
  React.useEffect(() => {
    if (phases?.phase2) {
      setPhase(2)
    }
  }, [phases?.phase2])

  const rows: Row[] = React.useMemo(
    () => {
      if (!isValidating) {
        return Object.keys(phaseRounds[round]).map((key) => {
          return {
            address: key,
            ...phaseRounds[round][key],
            count: roundIsCurrent ? currentRound.progressCompleted[key] : 100,
            max: roundIsCurrent ? currentRound.chunkCount : 100,
          }
        })
      }
      else {
        return []
      }
    },
    [round, isValidating, phaseRounds, currentRound.loading]
  )

  const dropDownData = useDropDownOptions(phaseRounds,
    phase,
    round,
    onSelectRound,
    onClearRound
  )

  return {
    rows,
    setPhase,
    phase,
    dropDownData,
    isPhaseLoading: isValidating,
    isActiveRoundLoading: currentRound.loading,
    phase2Available: !!phases?.phase2
  }
}

export default function Rounds(): JSX.Element {
  const { t } = useTranslation("plumo")

  const {rows, phase2Available, setPhase, phase, dropDownData,  isActiveRoundLoading} = useRound()

  return (
    <GridRow columns={1} css={rootCss}>
      <h2 css={titleCss}>{t("ceremonyResults")}</h2>
      <div css={dropdownsCss}>
        <Phases phase={phase} setPhase={setPhase} phase2Started={phase2Available}/>
        <label css={roundLabelCss}>{t("roundLabel")}</label>
        <div css={roundSelectorCss}>
        <Safety>
          <DropDownGroup
            direction={"horizontal"}
            data={dropDownData}
            darkMode={true}
          />
          </Safety>
        </div>
      </div>
      <Safety>
      <AttestationsTable
        rows={rows}
        showProgress={true}
        loading={isActiveRoundLoading}
      />
      </Safety>
    </GridRow>
  )
}

interface PhaseProps {
  phase: number
  setPhase: (p: number) =>void
  phase2Started: boolean
}


const Phases = React.memo(function Phases({phase, setPhase, phase2Started}: PhaseProps) {
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
    disabled={!phase2Started}
    colorWhenSelected={colors.primary}  onValueSelected={setPhase}
    label={t("phase2")} value={2} />
  </span>
  </>
})

const rootCss = css({
  maxWidth: 720,
  marginTop: 16,
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


