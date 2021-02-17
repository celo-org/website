/** @jsx jsx */
import {jsx, css, keyframes} from "@emotion/core"
import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { agree, disagree, showVisitorCookieConsent } from 'src/analytics/analytics'
import { I18nProps, withNamespaces } from 'src/i18n'
import Link from 'src/shared/Link'
import Responsive from 'src/shared/Responsive'
import { CONSENT_HEIGHT } from 'src/shared/Styles'
import { colors, fonts } from 'src/styles'
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
            <div>

            </div>
        )
    }
}