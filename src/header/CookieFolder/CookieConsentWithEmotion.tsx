/** @jsx jsx */
import {jsx, css, keyframes} from "@emotion/core"
import * as React from 'react'
// import { StyleSheet, Text, View } from 'react-native'
import { agree, disagree, showVisitorCookieConsent } from 'src/analytics/analytics'
import { I18nProps, withNamespaces, Trans, NameSpaces } from 'src/i18n'
// import Link from 'src/shared/Link'
// import Responsive from 'src/shared/Responsive'
import { CONSENT_HEIGHT } from 'src/shared/Styles'
import { colors, fonts } from 'src/header/CookieFolder/CookieStyle'
import { initSentry } from 'src/utils/sentry'

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
                    <Trans ns={NameSpaces.common}>
                    <p>{t('cookies.allowTrack')}</p>
                    </Trans>
                </div>
                <div>
                    <button>

                    </button>
                    <button>
                        
                    </button>
                </div>
                {/* <Text style={[fonts.p]} css={infoMessageText}> */}
                {/* <Text style={[fonts.p]} css={infoMessageTextPrefix}>{t('cookies.allowTrack')}{' '}</Text> */}
                {/* <Link href="https://celo.org/"> */}
                    {/* <Text css={link} style={{textDecorationLine: 'underline', cursor: 'pointer'}}>{t('cookies.celoLink')}</Text> */}
                {/* </Link>{' '}  */}
                {/* {t('cookies.improveSite')} */}
                {/* </Text> */}
                {/* <Text> */}

                {/* </Text> */}
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
    cursor: 'pointer'
})
const infoMessageText = css({
   textAlign: 'center',
    color: 'white',
})

const infoMessageTextPrefix = css({
   textAlign: 'center',
    fontWeight: 600,
    fontFamily: 'Jost, futura-pt, futura, sans-serif'
})



export default withNamespaces('common')(CookieConsentWithEmotion)