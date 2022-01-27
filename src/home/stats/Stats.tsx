import { css, keyframes } from "@emotion/react"
import { flex, garamond, sectionTitle, jost } from "src/estyles"
import { memo } from "react"
import { NameSpaces, useTranslation } from "src/i18n"
import { WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
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
  position: "relative",
  top: 200,
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: colors.dark,
  borderRadius: 16,
  maxWidth: 724,
  padding: "24px 40px",
  zIndex: 20,
  boxShadow: "0px 1px 16px rgba(255, 255, 255, 0.16), 0px 0px 24px rgba(78, 236, 255, 0.6)",
  [WHEN_TABLET]: {
    top: 170,
  },
  [WHEN_MOBILE]: {
    maxWidth: 256,
    margin: "16px 60px",
    flexBasis: "0%",
    padding: "24px 0px",
    filter: "drop-shadow(0px 3px 16px rgba(78, 236, 255, 0.7)) drop-shadow(0px 2px 54px #353D45)",
    boxShadow: "0px 2px 54px #353D45",
    borderRadius: 4,
    top: 0,
  },
})

const appear = css({
  opacity: 1,
})

const headingCss = css(sectionTitle, {
  fontSize: 20,
  letterSpacing: 6,
  marginTop: 4,
  paddingBottom: 10,
  [WHEN_MOBILE]: {
    fontSize: 10,
    marginBottom: 4,
    padding: 0,
    textAlign: "center",
  },
})

const linkCss = css({
  color: colors.white,
  textDecoration: "none",
})

const bodyCss = css(flex, {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  margin: "8px 0px",
  maxWidth: 644,
  [WHEN_MOBILE]: {
    flexDirection: "column",
    margin: "16px 0px",
  },
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
  alignItems: "center",
  justifyContent: "center",
  [WHEN_MOBILE]: {
    flexDirection: "column",
  },
})

const valueCss = css(garamond, {
  color: colors.white,
  fontSize: 24,
  lineHeight: 1.2,
  textAlign: "center",
  marginRight: 10,
  [WHEN_MOBILE]: {
    fontSize: 20,
    marginRight: 0,
  },
})

const labelCss = css(jost, {
  color: colors.lightGray,
  fontSize: 16,
  lineHeight: "34px",
  textAlign: "center",
  marginRight: 40,
  whiteSpace: "nowrap",
  textDecorationLine: "none",
  [WHEN_MOBILE]: {
    fontSize: 12,
    marginRight: 0,
  },
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
