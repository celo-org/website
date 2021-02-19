/** @jsx jsx */
import {jsx, css, keyframes, ThemeContext} from "@emotion/core"
import styled from '@emotion/styled'
import * as React from 'react'
import { agree, disagree, showVisitorCookieConsent } from 'src/analytics/analytics'
import { I18nProps, withNamespaces, Trans, NameSpaces } from 'src/i18n'
import {flex, WHEN_MOBILE, WHEN_DESKTOP, WHEN_TABLET, jost} from 'src/estyles'
import { CONSENT_HEIGHT, TextStyles } from 'src/shared/Styles'
import { colors, fonts } from 'src/header/CookieFolder/CookieStyle'
import { initSentry } from 'src/utils/sentry'
import { interpolateAs } from "next/dist/next-server/lib/router/router"

interface State {
    showConsent: boolean
}

export class CookieConsentWithEmotion extends React.PureComponent<I18nProps, State> {
    state = {
        showConsent: false
    }

    
    async componentDidMount(){
        this.setState({
            showConsent: await showVisitorCookieConsent()
        })
    }
    onAgree = async () =>{
        await agree()
        this.setState({
            showConsent: false
        })
        await initSentry()
    }
    
    onDisagree = () =>{
        disagree()
        this.setState({
            showConsent: false
        })
    }
    render(){
        // const { t } = this.props
        
        if(!this.state.showConsent){
            return null
        }

        
        return (
            <div css={cookieRoot}>

            <div css={container}>
                <div>
                    <p css={infoMessageTextPrefix}>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.allowTrack'}>
                    <a css={link} href={'https//celo.org'}>
                    </a>
                    </Trans>
                    {' '}
                    <br css={breakMobile}/>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.understandMore'}>
                        <a css={link} href={'https//celo.org'}>
                    </a>
                        </Trans>
                    </p>

                    
                </div>
                <div css={cookieButtons}>
                    <button css={singleButton} onClick={this.onDisagree}>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.cookiesDisagree'}>
                    </Trans>
                    </button>
                    <button css={agreeButton} onClick={this.onAgree}>
                        <Trans ns={NameSpaces.common} i18nKey={'cookies.cookiesAgree'}>
                        </Trans>
                    </button>
                </div>
            </div>
</div>
        )
    }
}

const cookieRoot = css(flex,{
    bottom: 0,
    position: 'fixed',
    backgroundColor: colors.navyBlue,
    width: '100%',
    justifyContent: 'center'
})

const container = css(flex,{
    width: '100%',
    maxWidth: 1080,
    minHeight: CONSENT_HEIGHT,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    [WHEN_MOBILE]: {
        flexDirection: 'column'
    },
    [WHEN_DESKTOP]: {
        justifyContent: 'space-between'
    }

})

const breakMobile = css({
    [WHEN_MOBILE]:{
        display: 'none'
    }
})

const cookieButtons = css(flex, {
    flexDirection: 'column-reverse',
    [WHEN_DESKTOP]:{
        flexDirection: 'row'
    },
    [WHEN_TABLET]:{
        flexDirection: 'row'
    }
})


const singleButton = css({
    color: colors.white,
    backgroundColor: colors.navyBlue,
    border: colors.navyBlue,
    fontFamily: 'Jost, futura-pt, futura, sans-serif'
})

const agreeButton = css(singleButton,{
    border: `2px solid ${colors.white}`
})


const link = css({
    textDecorationLine: 'underline',
    cursor: 'pointer',
    color: colors.white
})

const infoMessageTextPrefix = css({
    textAlign: 'start',
    fontWeight: 600,
    fontFamily: 'Jost, futura-pt, futura, sans-serif',
    color: colors.white,
})



export default withNamespaces('common')(CookieConsentWithEmotion)