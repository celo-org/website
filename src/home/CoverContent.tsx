import * as React from "react"
import { css } from "@emotion/react"
import { fonts, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
import { NameSpaces, useTranslation } from "src/i18n"
import Button, { BTN } from "src/shared/Button.3"
import { CeloLinks } from "src/shared/menu-items"
import { colors } from "src/styles"

export default function CoverContent() {
  const { t } = useTranslation(NameSpaces.home)

  return (
    <div css={rootCss}>
      <div css={blurCss} />
      <h1 css={heading}>{t("pageHeader")}</h1>
      <p css={subheading}>{t("pageSubheader")}</p>
      <div css={buttons}>
        <Button
          text={t("coverPrimeButton")}
          href={CeloLinks.docsOverview}
          kind={BTN.PRIMARY}
          target={"_blank"}
        />
        {/* <Button size={SIZE.normal} text={t("coverSecondButton")} href={CeloLinks.docsOverview} kind={BTN.NAKED} target={"_blank"} /> */}
      </div>
    </div>
  )
}

const centered = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
})

const blurCss = css({
  position: "absolute",
  width: "100%",
  height: "100%",
  borderRadius: 33,
  zIndex: -1,
  backgroundColor: colors.dark,
  filter: "blur(48px)",
  [WHEN_DESKTOP]: {
    display: "none",
  },
})

const rootCss = css(centered, {
  maxWidth: 660,
  width: "90vw",
  marginBottom: 24,
  padding: 24,
  position: "relative",
  [WHEN_TABLET]: {
    maxWidth: 580,
  },
  [WHEN_MOBILE]: {
    maxWidth: 310,
    paddingTop: 56,
    paddingBottom: 12,
  },
  [WHEN_DESKTOP]: {
    paddingTop: 150,
  },
})

const heading = css(fonts.h1, {
  color: colors.white,
  textAlign: "center",
  [WHEN_MOBILE]: css(fonts.h1Mobile, { color: colors.white }),
})

const subheading = css(fonts.body, {
  color: colors.lightGray,
  textAlign: "center",
  marginTop: 24,
  marginBottom: 24,
  [WHEN_TABLET]: {
    maxWidth: 500,
  },
})

const buttons = css(centered, {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "center",
  columnGap: 24,
  rowGap: 24,
  width: 290,
  maxWidth: "90vw",
  ["@media (max-width: 312px)"]: {
    justifyContent: "center",
  },
})
