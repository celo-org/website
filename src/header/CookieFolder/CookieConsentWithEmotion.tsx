/** @jsx jsx */
import {jsx, css, keyframes} from "@emotion/core"
import * as React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import { agree, disagree, showVisitorCookieConsent } from 'src/analytics/analytics'
import { I18nProps, withNamespaces, Trans, NameSpaces } from 'src/i18n'
import Link from 'src/shared/Link'
import InlineAnchor from 'src/shared/InlineAnchor'
// import Link from 'src/shared/Link'
// import Responsive from 'src/shared/Responsive'
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
        const { t } = this.props
        
        if(!this.state.showConsent){
            return null
        }

        
        return (
            <div css={container}>
                <div>
                    <p css={infoMessageTextPrefix}>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.allowTrack'}>
                    <a css={link} href={'https//celo.org'}>
                    </a>
                    </Trans>
                    </p>
                    <p css={infoMessageTextPrefix}>
                        <Trans ns={NameSpaces.common} i18nKey={'cookies.understandMore'}>
                        <a css={link} href={'https//celo.org'}>
                        Celo.org
                    </a>
                        </Trans>
                    </p>

                    
                </div>
                <div>
                    <button onClick={this.onDisagree}>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.cookiesDisagree'}>
                    </Trans>
                    </button>
                    <button onClick={this.onAgree}>
                        <Trans ns={NameSpaces.common} i18nKey={'cookies.cookiesAgree'}>
                        </Trans>
                    </button>
                </div>
            </div>
        )
    }
}

const container = css({
    bottom: 0,
    position: 'fixed',
    backgroundColor: colors.navyBlue,
    width: '100%',
    minHeight: CONSENT_HEIGHT,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
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