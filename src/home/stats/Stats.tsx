import { css, keyframes } from "@emotion/react"
import { flex, garamond, sectionTitle, jost } from "src/estyles"
import { memo } from "react"
import { NameSpaces, useTranslation } from "src/i18n"
// import RingsGlyph from "src/logos/RingsGlyph"
//placed the rings as comments because maybe we may want to keep the celo logo in the stats component
import { colors } from "src/colors"
import useStatsRelay from "./useStatsRelay"
import CarbonStats from "./CarbonStats"

export default function Stats() {
  const { t } = useTranslation(NameSpaces.home)
  const { avgBlockTime, totalTx } = useStatsRelay()
  const allLoaded = avgBlockTime && totalTx
  return (
    <figure aria-hidden={!allLoaded} css={css(rootCss, allLoaded && appear)}>
      {/* <RingsGlyph color={colors.white} height={20} /> */}
      <figcaption css={headingCss}>
        <a css={linkCss} target="_blank" href={"https://explorer.celo.org"} rel="noreferrer">
          {t("statsHeading")}
        </a>
      </figcaption>
      <div css={bodyCss}>
        <Datum value={totalTx?.toLocaleString()} title={t("statsTransactions")} id="stat-tx" />
        <Datum value={`${avgBlockTime || 0}s`} title={t("statsAvgTime")} id="stat-time" />
        <CarbonStats />
      </div>
    </figure>
  )
}

const rootCss = css(flex, {
  opacity: 0,
  transitionProperty: "opacity",
  transitionDuration: "550ms",
  alignItems: "center",
  backgroundColor: colors.dark,
  borderRadius: 16,
  width: 740,
  height: 130,
  padding: 24,
  zIndex: 20,
  ["@media (max-width: 1165px)"]: {
    display: "none",
  },
  boxShadow: "0px 1px 16px rgba(255, 255, 255, 0.16), 0px 0px 24px rgba(78, 236, 255, 0.6)",
})

const appear = css({
  opacity: 1,
})

const headingCss = css(sectionTitle, {
  fontSize: 20,
  letterSpacing: 6,
})

const linkCss = css({
  color: colors.white,
  textDecoration: "none",
})

const bodyCss = css(flex, {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "start",
  marginTop: 20,
  padding: 0,
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
    <div css={spanBodyCss}>
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
    </div>
  )
})

const spanBodyCss = css(flex, {
  flexDirection: "row",
})

const valueCss = css(garamond, {
  color: colors.white,
  fontSize: 24,
  lineHeight: 1.2,
  textAlign: "center",
  marginRight: 10,
})

const labelCss = css(jost, {
  color: colors.lightGray,
  fontSize: 16,
  lineHeight: "34px",
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
