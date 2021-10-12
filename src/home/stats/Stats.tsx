import { css, keyframes } from "@emotion/react"
import { flex, garamond, sectionTitle, jost } from "src/estyles"
import { memo } from "react"
import { NameSpaces, useTranslation } from "src/i18n"
import RingsGlyph from "src/logos/RingsGlyph"
import { colors } from "src/colors"
import useStatsRelay from "./useStatsRelay"
import CarbonStats from "./CarbonStats"

export default function Stats() {
  const { t } = useTranslation(NameSpaces.home)
  const { avgBlockTime, totalTx } = useStatsRelay()
  const allLoaded = avgBlockTime && totalTx
  return (
    <figure aria-hidden={!allLoaded} css={css(rootCss, allLoaded && appear)}>
      <RingsGlyph color={colors.white} height={20} />
      <figcaption css={headingCss}>
        <a css={linkCss} target="_blank" href={"https://explorer.celo.org"} rel="noreferrer">
          {t("statsHeading")}
        </a>
      </figcaption>
      <Datum value={totalTx?.toLocaleString()} title={t("statsTransactions")} id="stat-tx" />
      <Datum value={`${avgBlockTime || 0}s`} title={t("statsAvgTime")} id="stat-time" />
      <CarbonStats />
    </figure>
  )
}

const rootCss = css(flex, {
  opacity: 0,
  transitionProperty: "opacity",
  transitionDuration: "550ms",
  boxShadow: "0px 2px 54px 0px #1F2327",
  alignItems: "center",
  backgroundColor: "#23272C",
  position: "absolute",
  borderRadius: 6,
  right: 0,
  top: 210,
  padding: 24,
  paddingBottom: 30,
  zIndex: 20,
  ["@media (max-width: 1165px)"]: {
    display: "none",
  },
})

const appear = css({
  opacity: 1,
})

const headingCss = css(sectionTitle)

const linkCss = css({
  color: colors.white,
  textDecoration: "none",
})

interface DatumProps {
  value: string | undefined
  title: string
  id: string
  link?: string
}

export const Datum = memo<DatumProps>(function _Datum({ value, title, id, link }: DatumProps) {
  const special = isSpecial(value)
  return (
    <>
      <span
        key={`${id}-${special}`}
        css={css(valueCss, special && specialCss)}
        aria-labelledby={id}
      >
        {value}
      </span>
      {link ? (
        <a href={link} target="_blank" rel="noopener" css={hoverLabelCss} id={id}>
          {title}
        </a>
      ) : (
        <span css={labelCss} id={id}>
          {title}
        </span>
      )}
    </>
  )
})

const valueCss = css(garamond, {
  color: colors.white,
  fontSize: 24,
  lineHeight: 1.2,
  textAlign: "center",
  marginTop: 24,
})

const labelCss = css(jost, {
  color: colors.lightGray,
  fontSize: 12,
  lineHeight: "20px",
  textAlign: "center",
  textDecorationLine: "none",
})

const hoverLabelCss = css(labelCss, {
  ":hover": {
    textDecorationLine: "underline",
  },
})

const celobration = keyframes`
  from {
    color: white;
    transform: scale(1) translateY(0);
  }

  5% {
    color: ${colors.gold};
    transform: scale(1.001) translateY(-5px);
  }

  90% {
    color: ${colors.gold};
  }

  to {
    color: white;
    transform: scale(1) translateY(0);
  }

`

const specialCss = css({
  animationName: celobration,
  animationDuration: "150ms",
  animationIterationCount: 1,
})

function isSpecial(value: string | undefined) {
  return value?.endsWith("000,000") || value?.endsWith("000.000")
}
