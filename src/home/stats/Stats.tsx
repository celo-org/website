/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import { flex, garamond, sectionTitle, jost, } from "src/estyles"
import {memo} from "react"
import { NameSpaces, useTranslation } from "src/i18n"
import RingsGlyph from "src/logos/RingsGlyph"
import { colors } from "src/styles"
import useBlockscoutWS from "./useBlockscoutWS"

export default function Stats() {
  const {t} = useTranslation(NameSpaces.home)
  const {walletAddresses, blockCount, average, txCount} = useBlockscoutWS()
  const allLoaded = walletAddresses && average && txCount && blockCount
  return <figure aria-hidden={!allLoaded} css={css(rootCss,allLoaded && appear )}>
        <RingsGlyph color={colors.white} height={20}/>
        <figcaption css={headingCss}>{t("statsHeading")}</figcaption>
        <Datum value={blockCount.toLocaleString()} title={t("statsBlockCount")} id="stat-blockcount"/>
        <Datum value={walletAddresses} title={t("statsAddresses")} id="stat-addressess"/>
        <Datum value={txCount.toLocaleString()} title={t("statsTransactions")} id="stat-tx"/>
        <Datum value={`${average}s`} title={t("statsAvgTime")} id="stat-time"/>
  </figure>
}

const rootCss = css(flex,{
  opacity: 0,
  transitionProperty: "opacity",
  transitionDuration: "250ms",
  boxShadow: "0px 2px 54px 0px #1F2327",
  alignItems: "center",
  backgroundColor: '#23272C',
  position: "absolute",
  borderRadius: 6,
  right: 0,
  top: 260,
  padding: 24,
  paddingBottom: 30,
  zIndex: 20,
  ['@media (max-width: 1165px)'] : {
    display: "none"
  }
})

const appear = css({
  opacity: 1
})

const headingCss = css(sectionTitle,{
  color: colors.white,
})

interface DatumProps {
  value: string |number
  title: string
  id: string
}

const Datum = memo<DatumProps>(function _Datum({value, title, id}: DatumProps) {
  return <>
      <span css={valueCss} aria-labelledby={id} >{value}</span>
      <span css={labelCss} id={id}>{title}</span>
  </>
})

const valueCss = css(garamond,{
  color: colors.white,
  fontSize: 24,
  lineHeight:1.2,
  textAlign: "center",
  marginTop: 24
})

const labelCss = css(jost, {
  color: colors.lightGray,
  fontSize: 12,
  lineHeight: "20px",
  textAlign: "center"
})