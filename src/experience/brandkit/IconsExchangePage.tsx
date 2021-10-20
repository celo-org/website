import { css } from "@emotion/react"
import frontMatter from "front-matter"
import { NextPage } from "next"
import * as React from "react"
import { flex, flexRow } from "src/estyles"
import Page, { ICONS_PATH } from "src/experience/brandkit/common/Page"
import data from "src/experience/brandkit/content/exchange-icons.md"
import {
  AssetTypes,
  EXCHANGE_ICONS_PKG_TRACKING,
  trackDownload,
} from "src/experience/brandkit/tracking"
import CCLicense from "src/experience/common/CCLicense"
import { GAP } from "src/experience/common/constants"
import IconShowcase from "src/experience/common/Showcase"
import Markdown, { Attributes } from "src/experience/Markdown"
import { NameSpaces, useTranslation } from "src/i18n"
import Button, { BTN } from "src/shared/Button.3"
import { hashNav } from "src/shared/menu-items"
import { standardStyles } from "src/styles"

const icons = [
  {
    name: "CELO Exchange Icon",
    description: "Full Color\n",
    preview: "/images/marketplace-icons/icon-celo-CELO-color-f.svg",
    uri: "/assets/marketplace-icons/CELO-Full-Color.zip",
  },
  {
    name: "CELO Exchange Icon",
    description: "Monochrome\n",
    preview: "/images/marketplace-icons/icon-celo-CELO-mono-f.svg",
    uri: "/assets/marketplace-icons/icon-CELO-monochrome.zip",
    variant: "circle-white",
  },
  {
    name: "CELO Exchange Icon",
    description: "Reverse Monochrome\n",
    preview: "/images/marketplace-icons/icon-celo-CELO-reverse-f.svg",
    uri: "/assets/marketplace-icons/icon-CELO-reverse-monochrome.zip",
    variant: "circle-black",
  },
  null,
  {
    name: "cUSD Exchange Icon",
    description: "Full Color\n",
    preview: "/images/marketplace-icons/icon-celo-dollar-color.svg",
    uri: "/assets/marketplace-icons/icon-cusd-color-v2.zip",
  },
  {
    name: "cUSD Exchange Icon",
    description: "Monochrome\n",
    preview: "/images/marketplace-icons/icon-cUSD-mono.svg",
    uri: "/assets/marketplace-icons/icon-cusd-mono-v2.zip",
    variant: "circle-white",
  },
  {
    name: "cUSD Exchange Icon",
    description: "Reverse Monochrome\n",
    preview: "/images/marketplace-icons/icon-celo-dollar-reverse.svg",
    uri: "/assets/marketplace-icons/icon-cusd-reverse-v2.zip",
    variant: "circle-black",
  },
  null,
  {
    name: "cEUR Exchange Icon",
    description: "Full Color\n",
    preview: "/images/marketplace-icons/icon-cEUR-color.svg",
    uri: "/assets/marketplace-icons/icon-cEUR-color.zip",
  },
  {
    name: "cEUR Exchange Icon",
    description: "Monochrome\n",
    preview: "/images/marketplace-icons/icon-celo-euro-mono.svg",
    uri: "/assets/marketplace-icons/icons-celo-euro-monochrome.zip",
    variant: "circle-white",
  },
  {
    name: "cEUR Exchange Icon",
    description: "Reverse Monochrome\n",
    preview: "/images/marketplace-icons/icon-celo-euro-reverse.svg",
    uri: "/assets/marketplace-icons/icons-celo-euro-reverse.zip",
    variant: "circle-black",
  },
  null,
  {
    name: "cBRL Exchange Icon",
    description: "Full Color\n",
    preview: "/images/marketplace-icons/icon-cBRL-color.svg",
    uri: "/assets/marketplace-icons/icons-cbrl-color.zip",
  },
  {
    name: "cBRL Exchange Icon",
    description: "Monochrome\n",
    preview: "/images/marketplace-icons/icon-cbrl-mono.svg",
    uri: "/assets/marketplace-icons/icons-cbrl-mono.zip",
    variant: "circle-white",
  },
  {
    name: "cBRL Exchange Icon",
    description: "Reverse Monochrome\n",
    preview: "/images/marketplace-icons/icon-cbrl-reverse.svg",
    uri: "/assets/marketplace-icons/icons-cbrl-reverse.zip",
    variant: "circle-black",
  },
]

const info = frontMatter<Attributes>(data)

const IconExchangePage: NextPage = React.memo(() => {
  return (
    <Page
      title={info.attributes.title}
      metaDescription={info.attributes.description}
      path={ICONS_PATH}
      sections={[{ id: hashNav.brandIcons.overview, children: <Overview /> }]}
    />
  )
})

export default IconExchangePage

export interface IconData {
  description: string
  name: string
  preview: string
  uri: string
  tags: string[]
  id: string
}

function Overview() {
  const { t } = useTranslation(NameSpaces.brand)

  const onPressDownload = React.useCallback(async () => {
    await trackDownload(EXCHANGE_ICONS_PKG_TRACKING)
  }, [])

  return (
    <div css={containerCss}>
      <div css={mainInfoCss}>
        <Markdown source={info.body} />
        <Button
          kind={BTN.PRIMARY}
          text={t("logo.overviewBtn")}
          style={standardStyles.elementalMarginTop}
          onPress={onPressDownload}
          href="/assets/marketplace-icons/CeloMarketplaceIcons.zip"
        />
      </div>
      <CCLicense textI18nKey="exchangeIcons.license" />

      <div css={rootCss}>
        <div css={flexWrap}>
          {icons.map((icon, i) =>
            icon === null ? (
              <div key={i} style={breakCss} />
            ) : (
              <div key={i}>
                <IconShowcase
                  key={i}
                  ratio={1}
                  variant={(icon.variant || "circle") as any}
                  description={icon.description}
                  name={icon.name}
                  preview={icon.preview}
                  uri={icon.uri}
                  loading={false}
                  assetType={AssetTypes.icon}
                  size={160}
                />
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

const flexWrap = css(flexRow, {
  flexWrap: "wrap",
})

const mainInfoCss = css({
  marginLeft: GAP,
  marginRight: GAP,
})

const containerCss = css(flex, { paddingLeft: GAP, paddingRight: GAP })
const rootCss = css({ minHeight: "75vh" })
const breakCss = {
  width: "100%",
  display: "block",
}
