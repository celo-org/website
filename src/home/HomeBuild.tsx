import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import { H1 } from 'src/fonts/Fonts'
import { Adventure } from 'src/home/Adventure'
import blankSquare from 'src/icons/Rectangle.png'
import { NameSpaces, useTranslation } from 'src/i18n'
import { Cell, GridRow, Spans } from 'src/layout/GridRow'
import Button, { BTN, SIZE } from 'src/shared/Button.3'
import { standardStyles, textStyles} from 'src/styles'

export default function HomeBuild() {
    const { t } = useTranslation(NameSpaces.home)
    return (
        <>
        <GridRow
        desktopStyle={standardStyles.blockMarginTop}
        tabletStyle={standardStyles.blockMarginTopTablet}
        mobileStyle={standardStyles.blockMarginTopMobile}
        allStyle={standardStyles.centered}
        >
            <Cell tabletSpan={Spans.twoThird} span={Spans.half}>
                <H1 style={[textStyles.center, standardStyles.elementalMarginBottom]}>
                        {t('buildTitle')}
                </H1>
            </Cell>
        </GridRow>
        <GridRow
        desktopStyle={standardStyles.blockMarginTop}
        tabletStyle={standardStyles.blockMarginTopTablet}
        allStyle={standardStyles.blockMarginTopMobile}
        mobileStyle={standardStyles.sectionMarginBottomMobile}
        >
            <Adventure source={blankSquare} title={t('build1Title')} text={t('build1Text')}/> 
            <Adventure source={blankSquare} title={t('build2Title')} text={t('build2Text')}/>
            <Adventure source={blankSquare} title={t('build3Title')} text={t('build3Text')}/>

        </GridRow>
        </>
    )
}

const styles = StyleSheet.create({
    links: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        flexWrap: 'wrap',
    },
    link:{
        padding: 10,
    }
})
