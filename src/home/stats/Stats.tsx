import { css, keyframes } from "@emotion/react"
import { flex, sectionTitle, jost, WHEN_DESKTOP, WHEN_TABLET_AND_UP } from "src/estyles"
import { memo } from "react"
import { NameSpaces, useTranslation } from "src/i18n"
import { WHEN_MOBILE, WHEN_TABLET } from "src/estyles"

import { colors } from "src/colors"
import useStatsRelay from "./useStatsRelay"
import CarbonStats from "./CarbonStats"

export default function Stats() {
  const { t } = useTranslation(NameSpaces.home)
  const { avgBlockTime, totalTx } = useStatsRelay()
  const allLoaded = avgBlockTime && totalTx
  return (
    <figure aria-hidden={!allLoaded} css={css(rootCss, allLoaded && appear)}>
      <figcaption css={headingCss}>
        <a css={linkCss} target="_blank" href={"https://explorer.celo.org"} rel="noreferrer">
          {t("statsHeading")}
        </a>
      </figcaption>
      <div css={bodyCss}>
        <Datum value={totalTx?.toLocaleString()} title={t("statsTransactions")} id="stat-tx" />
        <Datum value={`${avgBlockTime || 0}s`} title={t("statsAvgTime")} id="stat-time" />
        <CarbonStats />
        <Datum value={`$0.001`} title={t("statsAvgFee")} id="avg-fee" />
      </div>
    </figure>
  )
}

const rootCss = css(flex, {
  opacity: 0,
  maxWidth: 812,
  transitionProperty: "opacity",
  transitionDuration: "550ms",
  alignItems: "center",
  flexDirection: "column",
  backgroundColor: colors.white,
  borderRadius: 128,
  zIndex: 20,
  marginBottom: 60,
  boxShadow: "0px 0px 24px rgba(255, 255, 255, 0.16), 0px 0px 90px rgba(78, 236, 255, 0.85)",
  [WHEN_MOBILE]: {
    flexBasis: "0%",
    padding: "24px 18px 12px 18px",
    filter: "drop-shadow(1px 3px 16px rgba(78, 236, 255, 0.7)) drop-shadow(0px 2px 36px #353D45)",
    boxShadow: "none",
    borderRadius: 12,
    marginBottom: 24,
  },
  [WHEN_TABLET]: {
    borderRadius: 72,
    padding: "32px 20px 40px 20px",
  },
  [WHEN_DESKTOP]: {
    padding: "32px 32px 40px 32px",
  },
})

const appear = css({
  opacity: 1,
})

const headingCss = css(sectionTitle, {
  fontSize: 20,
  letterSpacing: 6,
  marginTop: 4,
  paddingBottom: 16,
  [WHEN_MOBILE]: {
    fontSize: 16,
    marginBottom: 4,
    padding: 0,
    textAlign: "center",
  },
})

const linkCss = css({
  color: colors.dark,
  textDecoration: "none",
})

const bodyCss = css(flex, {
  alignItems: "center",
  justifyContent: "space-between",
  maxWidth: 640,
  margin: "8px 40px",
  [WHEN_TABLET_AND_UP]: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr 1fr",
    columnGap: 16,
  },
  [WHEN_TABLET]: {
    margin: "8px 16px",
  },
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
        css={css(valueCss, special && specialCss, { width: `${(value?.length || 3) * 0.95}rem` })}
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
  alignItems: "center",
  flexDirection: "column",
  justifyContent: "center",
})

const valueCss = css(jost, {
  color: colors.dark,
  lineHeight: 1.2,
  textAlign: "center",
  fontSize: 20,
  [WHEN_TABLET_AND_UP]: {
    fontSize: 24,
  },
})

const labelCss = css(jost, {
  color: colors.dark,
  fontSize: 12,
  lineHeight: "18px",
  textAlign: "center",
  whiteSpace: "nowrap",
  textDecorationLine: "none",
  [WHEN_MOBILE]: {
    marginBottom: 20,
    fontSize: 14,
    lineHeight: "18px",
  },
})

const hoverLabelCss = css(labelCss, {
  ":hover": {
    textDecorationLine: "underline",
  },
})

const celobration = keyframes`
  from {
    color: ${colors.dark};
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
    color: ${colors.dark};
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
