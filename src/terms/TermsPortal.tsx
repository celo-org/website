import { css } from "@emotion/react"
import * as React from "react"
import OpenGraph from "src/header/OpenGraph"
import { NameSpaces, useTranslation } from "src/i18n"
import { Cell, GridRow, Spans } from "src/layout/Grid2"
import SideTitledSection from "src/layout/SideTitledSection"
import menuItems, { CeloLinks } from "src/shared/menu-items"
import { HEADER_HEIGHT } from "src/shared/Styles"
import {
  flex,
  fonts,
  standardStyles,
  textStyles,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
} from "src/estyles"
import { HelpfulLink } from "./HelpfulLink"

function TermsPortal() {
  const { t } = useTranslation(NameSpaces.terms)
  return (
    <>
      <OpenGraph title={t("title")} path={NameSpaces.terms} description={t("metaDescription")} />
      <div css={containerCss}>
        <GridRow css={gridCss} columns={1}>
          <Cell span={Spans.one} css={standardStyles.centered}>
            <h1 css={titleCss}>{t("title")}</h1>
          </Cell>
        </GridRow>
        <SideTitledSection title={t("helpfulLinks")}>
          <div css={linkCss}>
            <HelpfulLink text={t("userAgreementLink")} href={CeloLinks.agreement} />
            <HelpfulLink text={t("privacyPolicy")} href={menuItems.PRIVACY.link} />
            <HelpfulLink text={t("disclaimer")} href={CeloLinks.disclaimer} />
          </div>
        </SideTitledSection>
        <SideTitledSection title={t("privacy")}>
          <p css={[fonts.body, standardStyles.elementalMarginBottom]}>{t("privacyNote")}</p>
          <HelpfulLink text={t("privacyLink")} href={CeloLinks.privacyDocs} />
        </SideTitledSection>
      </div>
    </>
  )
}

export default TermsPortal

const containerCss = css(flex, {
  marginTop: HEADER_HEIGHT,
  paddingTop: HEADER_HEIGHT,
})

const titleCss = css(textStyles.center, fonts.h1)

const linkCss = css({
  height: 120,
  justifyContent: "space-between",
})

const gridCss = css(standardStyles.centered, {
  [WHEN_MOBILE]: standardStyles.blockMarginBottomMobile,
  [WHEN_TABLET]: standardStyles.blockMarginBottomTablet,
  [WHEN_DESKTOP]: standardStyles.blockMarginBottom,
})
