import * as React from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { StyleSheet } from "react-native"
import { MobileOS, RequestRecord, RequestType } from "src/fauceting/FaucetInterfaces"
import { ButtonWithFeedback, ContextualInfo, HashingStatus } from "src/fauceting/MicroComponents"
import { RequestState, requestStatusToState, validateBeneficary } from "src/fauceting/utils"
import { postForm } from "src/forms/postForm"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { colors } from "src/colors"
import getConfig from "next/config"
import subscribeRequest from "../../server/FirebaseClient"
import { css } from "@emotion/react"
import { errorStyle, flexRow, inputStyle } from "src/estyles"

interface State {
  beneficiary: string
  captchaOK: boolean
  requestState: RequestState
  dollarTxHash?: string | null
  goldTxHash?: string | null
  escrowTxHash?: string | null
  mobileOS: MobileOS | null
}

const RECAPTCHA_SITE_KEY = getConfig().publicRuntimeConfig.RECAPTCHA_SITE_KEY
interface Props {
  kind: RequestType
}

class RequestFunds extends React.PureComponent<Props & I18nProps, State> {
  state: State = {
    beneficiary: "",
    requestState: RequestState.Initial,
    captchaOK: false,
    mobileOS: null,
  }

  recaptchaRef = React.createRef<ReCAPTCHA>()

  setAddress = ({ currentTarget }: React.SyntheticEvent<HTMLInputElement>) => {
    const { value } = currentTarget
    this.setState({
      beneficiary: value,
      requestState:
        this.state.requestState !== RequestState.Working
          ? RequestState.Initial
          : this.state.requestState,
    })
  }

  selectOS = (os: MobileOS) => {
    this.setState({ mobileOS: os })
  }

  setNumber = (number: string) => {
    this.setState({ beneficiary: number })
  }

  onCaptcha = (value: string | null) => {
    this.setState({ captchaOK: !!value })
  }

  resetCaptcha = () => {
    this.recaptchaRef.current.reset()
  }

  getCaptchaToken = () => {
    return this.recaptchaRef.current.getValue()
  }

  onSubmit = async () => {
    if (!validateBeneficary(this.state.beneficiary, this.props.kind)) {
      this.setState({ requestState: RequestState.Invalid })
      return
    }

    const res = await this.startRequest()
    const { status, key } = await res.json()

    this.setState({ requestState: requestStatusToState(status) })
    if (key) {
      await this.subscribe(key)
    }
    this.resetCaptcha()
  }

  startRequest = () => {
    this.setState({ requestState: RequestState.Working })
    return send(
      this.state.beneficiary,
      this.props.kind,
      this.getCaptchaToken(),
      this.state.mobileOS
    )
  }

  subscribe = async (key: string) => {
    await subscribeRequest(key, this.onUpdates)
  }

  onUpdates = (record: RequestRecord) => {
    const { status, dollarTxHash, goldTxHash, escrowTxHash } = record
    const requestState = requestStatusToState(status)

    if (requestState === RequestState.Completed || requestState === RequestState.Failed) {
      this.setState({
        requestState,
        dollarTxHash: null,
        goldTxHash: null,
        escrowTxHash: null,
      })
    } else {
      this.setState({
        requestState,
        dollarTxHash,
        goldTxHash,
        escrowTxHash,
      })
    }
  }

  isFaucet = () => {
    return this.props.kind === RequestType.Faucet
  }

  inviteAndBlankOS = () => {
    return !this.isFaucet() ? !this.state.mobileOS : false
  }

  render() {
    const { requestState, dollarTxHash, goldTxHash, escrowTxHash } = this.state
    const isInvalid = requestState === RequestState.Invalid
    return (
      <div css={rootStyle}>
        <input
          type={"text"}
          name="beneficiary"
          css={[inputStyle, isInvalid && errorStyle]}
          placeholder={this.props.t("testnetAddress")}
          onChange={this.setAddress}
          value={this.state.beneficiary}
        />
        <ContextualInfo
          requestState={this.state.requestState}
          t={this.props.t}
          isFaucet={this.isFaucet()}
        />
        <div css={recaptchaStyle}>
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={this.onCaptcha}
            ref={this.recaptchaRef}
          />
        </div>
        <div css={this.isFaucet() && flexRow}>
          <ButtonWithFeedback
            requestState={requestState}
            isFaucet={this.isFaucet()}
            captchaOK={this.state.captchaOK}
            onSubmit={this.onSubmit}
            disabled={this.state.beneficiary.length === 0 || this.inviteAndBlankOS()}
            t={this.props.t}
          />
          <div css={viewCss}>
            <HashingStatus
              done={requestState === RequestState.Completed}
              isFaucet={this.isFaucet()}
              dollarTxHash={dollarTxHash}
              goldTxHash={goldTxHash}
              escrowTxHash={escrowTxHash}
            />
          </div>
        </div>
      </div>
    )
  }
}

function send(beneficiary: string, kind: RequestType, captchaToken: string, os?: MobileOS) {
  const route = kind === RequestType.Invite ? "/api/invite" : "/api/faucet"
  return postForm(route, { captchaToken, beneficiary, mobileOS: os })
}

const rootStyle = css({
  display: "flex",
  flexDirection: "column",
  margin: "20px 0",
})

const recaptchaStyle = css({
  height: 80,
  margin: "20px 0",
})

const viewCss = css({
  display: "flex",
  flexDirection: "column",
})

const styles = StyleSheet.create({
  error: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  radios: {
    marginStart: 20,
  },
})

export default withNamespaces(NameSpaces.faucet)(RequestFunds)
