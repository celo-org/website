/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import { fonts, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
import { NameSpaces, useTranslation } from "src/i18n"
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import { CeloLinks } from 'src/shared/menu-items'
import { colors } from 'src/styles'


export default function CoverContent() {
  const { t } = useTranslation(NameSpaces.home)

  return <div css={rootCss}>
    <h1 css={heading}>
      {t('pageHeader')}
    </h1>
    <p css={subheading}>{t('pageSubheader')}</p>
    <div css={buttons}>
      <Button text={t("coverPrimeButton")} href={CeloLinks.docsOverview} kind={BTN.PRIMARY} target={"_blank"} />
      <Button size={SIZE.normal} text={t("coverSecondButton")} href={CeloLinks.docsOverview} kind={BTN.NAKED} target={"_blank"} />
    </div>
  </div>
}

const centered = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
})


const rootCss = css(centered,
  {
    maxWidth: 660,
    width: "90vw",
    marginBottom: 24,
    padding: 24,
    [WHEN_TABLET]: {
      maxWidth: 580,
    },
    [WHEN_MOBILE]: {
      maxWidth: 310,
    }
})


const heading = css(fonts.h1, {
  color: colors.white,
  textAlign: "center",
  [WHEN_MOBILE]: css(fonts.h1Mobile,   {color: colors.white})
})

const subheading = css(fonts.body, {
  color: colors.lightGray,
  textAlign: "center",
  marginTop: 24,
  marginBottom: 24,
  [WHEN_TABLET] : {
    maxWidth: 500
  }
})



const buttons = css(centered,{
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  justifyContent: "space-between",
  columnGap: 24,
  rowGap: 24,
  width: 290,
  maxWidth: "90vw",
  ["@media (max-width: 312px)"]: {
    justifyContent: "center",
  }
})