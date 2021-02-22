/** @jsx jsx */
import {jsx, css} from "@emotion/core"
import * as React from 'react'
import { agree, disagree, showVisitorCookieConsent } from 'src/analytics/analytics'
import { I18nProps, withNamespaces, Trans, NameSpaces } from 'src/i18n'
import {flex, WHEN_MOBILE, WHEN_DESKTOP, WHEN_TABLET, jost} from 'src/estyles'
import {colors} from 'src/styles'
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
        if(!this.state.showConsent){
            return null
        }

        
        return (
            <div css={cookieRoot}>
            <div css={container}>
                <div css={textDiv}>
                    <p css={infoMessageTextPrefix}>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.allowTrack'}>
                    <a css={link} href={'/'}>
                    </a>
                    </Trans>
                    {' '}
                    <br css={breakMobile}/>
                    <Trans ns={NameSpaces.common} i18nKey={'cookies.understandMore'}>
                        <a css={link} href={'/terms'}>
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
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20
})

const container = css(flex,{
    width: '100%',
    maxWidth: 1080,
    minHeight: 81,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    [WHEN_DESKTOP]:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    [WHEN_TABLET]:{
        flexDirection: 'row'
    }
})

const singleButton = css(flex,
    {
    color: colors.white,
    backgroundColor: colors.navyBlue,
    border: colors.navyBlue,
    fontFamily: 'Jost, futura-pt, futura, sans-serif',
    fontStyle: 'normal',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    height: 33,
    width: 147,
    position: 'static',
    fontWeight: 500,
    borderRadius: 5
})

const agreeButton = css(singleButton,{
    border: `2px solid ${colors.white}`,
})


const link = css({
    textDecorationLine: 'underline',
    cursor: 'pointer',
    color: colors.white
})

const infoMessageTextPrefix = css(jost,{
    textAlign: 'center',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: 13,
    height: 47,
    left: 12,
    top: 675,
    color: colors.white,
    [WHEN_DESKTOP]: {
        textAlign: 'start'
    },
    [WHEN_TABLET]: {
        textAlign: 'start'
    }
})

const textDiv = css(flex, {
    paddingLeft: 14,
    paddingRight: 14,
    fontSize: 13,
    [WHEN_MOBILE]:{
        maxWidth: 350
    }
})


export default withNamespaces('common')(CookieConsentWithEmotion)