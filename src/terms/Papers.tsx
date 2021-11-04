import * as React from "react"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/Grid2"
import SideTitledSection from "src/layout/SideTitledSection"
import { HEADER_HEIGHT } from "src/shared/Styles"
import { HelpfulLink } from "./HelpfulLink"
import whitePaperImage from "./celo-whitepapers.jpg"
import { useTranslation } from "src/i18n"
import { css } from "@emotion/react"
import {
  fonts,
  flex,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
  standardStyles,
  textStyles,
} from "src/estyles"

function Papers() {
  const { t } = useTranslation(NameSpaces.papers)

  return (
    <>
      <OpenGraph
        title={t("title")}
        path={NameSpaces.papers}
        description={t("metaDescription")}
        image={whitePaperImage}
      />
      <div css={containerCss}>
        <GridRow columns={1} css={gridCss}>
          <Cell span={Spans.one} css={standardStyles.centered}>
            <h1 css={css(fonts.h1, textStyles.center)}>{t("title")}</h1>
          </Cell>
        </GridRow>
        <SideTitledSection span={Spans.three} title={t("protocol")}>
          <p css={fonts.body}>{t("whitepaperTitle")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/whitepaper"} />
            <HelpfulLink text={"阅读"} href={"/papers/whitepaper/chinese"} />
          </div>
        </SideTitledSection>
        <SideTitledSection span={Spans.three} title={""}>
          <p css={fonts.body}>{t("plumoTitle")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/plumo"} />
          </div>
        </SideTitledSection>
        <SideTitledSection span={Spans.three} title={t("economics")}>
          <p css={fonts.body}>{t("stabilityTitle")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/stability"} />
          </div>
        </SideTitledSection>
        <SideTitledSection span={Spans.three} title={""}>
          <p css={fonts.body}>{t("velocityTitle")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/cbdc-velocity"} />
            <HelpfulLink text={"Lee el informe"} href={"/papers/cbdc-velocity/spanish"} />
          </div>
        </SideTitledSection>
        <SideTitledSection span={Spans.three} title={""}>
          <p css={fonts.body}>{t("futureCurrency")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/shaping-future-digital-currencies"} />
          </div>
        </SideTitledSection>
        <SideTitledSection span={Spans.three} title={t("socialImpact")}>
          <p css={fonts.body}>{t("futureProof")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/future-proof-aid"} />
            <HelpfulLink text={t("exec")} href={"/papers/future-proof-exec"} />
          </div>
        </SideTitledSection>
        <SideTitledSection span={Spans.three} title={""}>
          <p css={fonts.body}>{t("grameenCovid")}</p>
          <div css={linksCss}>
            <HelpfulLink text={t("download")} href={"/papers/covid-aid"} />
          </div>
        </SideTitledSection>
      </div>
    </>
  )
}

export default Papers

const containerCss = css(flex, {
  marginTop: HEADER_HEIGHT,
  paddingTop: HEADER_HEIGHT,
})

const gridCss = css(standardStyles.centered, {
  [WHEN_DESKTOP]: standardStyles.blockMarginBottom,
  [WHEN_TABLET]: standardStyles.blockMarginBottomTablet,
  [WHEN_MOBILE]: standardStyles.blockMarginBottomMobile,
})

const linksCss = css({
  flexWrap: "wrap",
  flexDirection: "row",
})
