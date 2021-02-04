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
            <Adventure source={blankSquare} title={t('build1.title')} text={t('build1.text')} link={t('build1.link')}/> 
            <Adventure source={blankSquare} title={t('build2.title')} text={t('build2.text')} link={t('build2.link')}/>
            <Adventure source={blankSquare} title={t('build3.title')} text={t('build3.text')} link={t('build3.link')}/>

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
