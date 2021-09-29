import * as React from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { StyleSheet, View } from "react-native";
import { RequestType } from "src/fauceting/FaucetInterfaces";
import { ButtonWithFeedback, ContextualInfo, HashingStatus } from "src/fauceting/MicroComponents";
import { RequestState, requestStatusToState, validateBeneficary } from "src/fauceting/utils";
import { postForm } from "src/forms/postForm";
import { TextInput } from "src/forms/TextInput";
import { NameSpaces, withNamespaces } from "src/i18n";
import { colors, standardStyles } from "src/styles";
import getConfig from "next/config";
import subscribeRequest from "../../server/FirebaseClient";
const RECAPTCHA_SITE_KEY = getConfig().publicRuntimeConfig.RECAPTCHA_SITE_KEY;
class RequestFunds extends React.PureComponent {
    state = {
        beneficiary: "",
        requestState: RequestState.Initial,
        captchaOK: false,
        mobileOS: null,
    };
    recaptchaRef = React.createRef();
    setAddress = ({ currentTarget }) => {
        const { value } = currentTarget;
        this.setState({
            beneficiary: value,
            requestState: this.state.requestState !== RequestState.Working
                ? RequestState.Initial
                : this.state.requestState,
        });
    };
    selectOS = (os) => {
        this.setState({ mobileOS: os });
    };
    setNumber = (number) => {
        this.setState({ beneficiary: number });
    };
    onCaptcha = (value) => {
        this.setState({ captchaOK: !!value });
    };
    resetCaptcha = () => {
        this.recaptchaRef.current.reset();
    };
    getCaptchaToken = () => {
        return this.recaptchaRef.current.getValue();
    };
    onSubmit = async () => {
        if (!validateBeneficary(this.state.beneficiary, this.props.kind)) {
            this.setState({ requestState: RequestState.Invalid });
            return;
        }
        const res = await this.startRequest();
        const { status, key } = await res.json();
        this.setState({ requestState: requestStatusToState(status) });
        if (key) {
            await this.subscribe(key);
        }
        this.resetCaptcha();
    };
    startRequest = () => {
        this.setState({ requestState: RequestState.Working });
        return send(this.state.beneficiary, this.props.kind, this.getCaptchaToken(), this.state.mobileOS);
    };
    subscribe = async (key) => {
        await subscribeRequest(key, this.onUpdates);
    };
    onUpdates = (record) => {
        const { status, dollarTxHash, goldTxHash, escrowTxHash } = record;
        const requestState = requestStatusToState(status);
        if (requestState === RequestState.Completed || requestState === RequestState.Failed) {
            this.setState({
                requestState,
                dollarTxHash: null,
                goldTxHash: null,
                escrowTxHash: null,
            });
        }
        else {
            this.setState({
                requestState,
                dollarTxHash,
                goldTxHash,
                escrowTxHash,
            });
        }
    };
    isFaucet = () => {
        return this.props.kind === RequestType.Faucet;
    };
    inviteAndBlankOS = () => {
        return !this.isFaucet() ? !this.state.mobileOS : false;
    };
    render() {
        const { requestState, dollarTxHash, goldTxHash, escrowTxHash } = this.state;
        const isInvalid = requestState === RequestState.Invalid;
        return (<View style={standardStyles.elementalMargin}>
        <TextInput type={"text"} focusStyle={standardStyles.inputFocused} name="beneficiary" style={[standardStyles.input, isInvalid && styles.error]} placeholder={this.props.t("testnetAddress")} onChange={this.setAddress} value={this.state.beneficiary}/>
        <ContextualInfo requestState={this.state.requestState} t={this.props.t} isFaucet={this.isFaucet()}/>
        <View style={[styles.recaptcha, standardStyles.elementalMargin]}>
          <ReCAPTCHA sitekey={RECAPTCHA_SITE_KEY} onChange={this.onCaptcha} ref={this.recaptchaRef}/>
        </View>
        <View style={[this.isFaucet() && standardStyles.row]}>
          <ButtonWithFeedback requestState={requestState} isFaucet={this.isFaucet()} captchaOK={this.state.captchaOK} onSubmit={this.onSubmit} disabled={this.state.beneficiary.length === 0 || this.inviteAndBlankOS()} t={this.props.t}/>
          <View>
            <HashingStatus done={requestState === RequestState.Completed} isFaucet={this.isFaucet()} dollarTxHash={dollarTxHash} goldTxHash={goldTxHash} escrowTxHash={escrowTxHash} t={this.props.t}/>
          </View>
        </View>
      </View>);
    }
}
function send(beneficiary, kind, captchaToken, os) {
    const route = kind === RequestType.Invite ? "/invite" : "/faucet";
    return postForm(route, { captchaToken, beneficiary, mobileOS: os });
}
const styles = StyleSheet.create({
    error: {
        borderColor: colors.error,
        borderWidth: 1,
    },
    radios: {
        marginStart: 20,
    },
    recaptcha: {
        height: 80,
    },
});
export default withNamespaces(NameSpaces.faucet)(RequestFunds);
//# sourceMappingURL=RequestFunds.jsx.map