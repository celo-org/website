/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import {Text} from "react-native"
import { H1 } from 'src/fonts/Fonts'
import { NameSpaces, useTranslation } from "src/i18n"
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import { CeloLinks } from 'src/shared/menu-items'
import { textStyles, fonts, standardStyles } from 'src/styles'


export default function CoverContent() {
  const { t } = useTranslation(NameSpaces.home)

  return <div css={rootCss}>
    <H1 style={[textStyles.center, textStyles.invert]}>
      {t('pageHeader')}
    </H1>
    <Text style={[fonts.p, textStyles.center, textStyles.readingOnDark, standardStyles.elementalMargin]}>{t('pageSubheader')}</Text>
    <div css={buttons}>
      <Button text={"coverPrimeButton"} href={CeloLinks.docsOverview} kind={BTN.PRIMARY} target={"_blank"} />
      <Button size={SIZE.normal} text={"coverPrimeButton"} href={CeloLinks.docsOverview} kind={BTN.NAKED} target={"_blank"} />
    </div>
  </div>
}

const centered = css({
  display: "flex",
  flexDirection: "column",
  alignItems: "center"
})

const rootCss = css(centered,{maxWidth: 660, marginBottom: 60})

const buttons = css(centered,{
  flexDirection: "row",
  justifyContent: "center",
  columnGap: 30
})