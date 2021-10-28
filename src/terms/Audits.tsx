import * as React from "react"
import OpenGraph from "src/header/OpenGraph"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { GridRow, Spans } from "src/layout/Grid2"
import SideTitledSection from "src/layout/SideTitledSection"
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
import { css } from "@emotion/react"

interface Audit {
  auditor: string
  title: string
  type: "economics" | "contracts" | "security"
  link?: string
}

const DATA: Audit[] = [
  {
    auditor: "OpenZeppelin",
    title: "Smart Contract Audit",
    link: "https://blog.openzeppelin.com/celo-contracts-audit",
    type: "contracts",
  },
  { auditor: "Teserakt", title: "Crypto Library Audit", type: "security" },
  { auditor: "Trailofbits", title: "Security Audit", type: "security" },
  {
    auditor: "Certora",
    title: "Formal Verification of Celo Governance Protocols",
    type: "contracts",
    link: "https://www.certora.com/pubs/CeloMay2020.pdf",
  },
  { auditor: "Gauntlet", title: "Stability Protocol Analysis", type: "economics" },
  { auditor: "Prysm Group", title: "Economic Analysis", type: "economics" },
  { auditor: "NCC", title: "Reserve Audit", type: "economics" },
]

const AUDITS = DATA.reduce((agg, current) => {
  const arrayOfType = agg[current.type] || []
  agg[current.type] = [...arrayOfType, current]

  return agg
}, {})

class Audits extends React.PureComponent<I18nProps> {
  render() {
    const { t } = this.props
    return (
      <>
        <OpenGraph
          title={"Celo | Audits & Analyses"}
          path={NameSpaces.audits}
          description={t("metaDescription")}
        />
        <div css={containerCss}>
          <GridRow columns={1} css={gridCss}>
            <h1 css={[fonts.h1, textStyles.center]}>{t("title")}</h1>
          </GridRow>
          {Object.keys(AUDITS).map((type) => {
            return (
              <SideTitledSection key={type} span={Spans.three} title={t(type)}>
                {AUDITS[type].map((audit: Audit) => (
                  <div css={referenceCss} key={audit.title}>
                    <p css={fonts.body}>
                      {audit.title} by <em css={textStyles.italic}>{audit.auditor}</em>
                    </p>
                    {audit.link && <HelpfulLink text={t("download")} href={audit.link} />}
                  </div>
                ))}
              </SideTitledSection>
            )
          })}
        </div>
      </>
    )
  }
}

export default withNamespaces(NameSpaces.audits)(Audits)

const gridCss = css(standardStyles.centered, {
  [WHEN_DESKTOP]: standardStyles.blockMarginBottom,
  [WHEN_TABLET]: standardStyles.blockMarginBottomTablet,
  [WHEN_MOBILE]: standardStyles.blockMarginBottomMobile,
})

const containerCss = css(flex, {
  marginTop: HEADER_HEIGHT,
  paddingTop: HEADER_HEIGHT,
  minHeight: 450,
})

const referenceCss = css({
  marginBottom: 20,
})
