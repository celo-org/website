import * as React from 'react'
import { H1 } from 'src/fonts/Fonts'
import { Adventure } from 'src/home/Adventure'
import people from 'src/icons/05-connect-people-(light-bg)-2.png'
import stable from 'src/icons/12-green-coin-and-usd-(light-bg)-1.png'
import currencies from 'src/icons/08-save-currencies-(light-bg)-2.png'
import { NameSpaces, useTranslation } from 'src/i18n'
import { Cell, GridRow, Spans } from 'src/layout/GridRow'
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
                <H1 aria-level="2" style={[textStyles.center, standardStyles.elementalMarginBottom]}>
                        {t('buildTitle')}
                </H1>
            </Cell>
        </GridRow>
        <GridRow
        allStyle={standardStyles.blockMarginTopMobile}
        desktopStyle={standardStyles.sectionMarginBottom}
        tabletStyle={standardStyles.sectionMarginBottomTablet}
        mobileStyle={standardStyles.sectionMarginBottomMobile}
        >
            <Adventure source={currencies} title={t('build1.title')} text={t('build1.text')} link={{ href: 'https://docs.celo.org/v/master/developer-guide/dappkit', text: t('build1.link')}}/> 
            <Adventure source={stable} title={t('build2.title')} text={t('build2.text')} link={{ href: 'https://docs.celo.org/overview#stable-cryptocurrencies', text: t('build2.link')}}/>
            <Adventure source={people} title={t('build3.title')} text={t('build3.text')} link={{ href: 'https://valoraapp.com', text: t('build3.link')}}/>

        </GridRow>
        </>
    )
}

