import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import { EXAMPLE_ADDRESS, RequestState } from "src/fauceting/utils";
import Checkmark from "src/icons/Checkmark";
import Button, { BTN, SIZE } from "src/shared/Button.3";
import Spinner from "src/shared/Spinner";
import { colors, fonts, standardStyles as std, textStyles } from "src/styles";
const BAD_STATES = new Set([RequestState.Failed, RequestState.Invalid]);
export function ContextualInfo({ requestState, t, isFaucet }) {
    const contextStyle = [
        fonts.micro,
        !isFaucet && textStyles.readingOnDark,
        BAD_STATES.has(requestState) && textStyles.error,
    ];
    const text = isFaucet ? faucetText({ requestState, t }) : inviteText({ requestState, t });
    return <Text style={contextStyle}>{text}</Text>;
}
export function HashingStatus({ isFaucet, dollarTxHash, goldTxHash, escrowTxHash, t, done, }) {
    return (<View style={isFaucet ? [std.row, styles.statusesContainerTicker] : styles.statusesContainerLog}>
      {[
            goldTxHash && isFaucet && t("cGLDsent"),
            dollarTxHash && t("cUSDsent"),
            escrowTxHash && t("walletBuilt"),
        ]
            .filter((x) => !!x)
            .map((message) => (<View key={message} style={[isFaucet ? styles.ticker : styles.log, std.fadeInitial, done && std.fadeIn]}>
            <Text style={[fonts.h6, !isFaucet && textStyles.invert]}>
              <Checkmark size={12} color={colors.primary}/> {message}
            </Text>
          </View>))}
    </View>);
}
export function ButtonWithFeedback({ requestState, isFaucet, t, onSubmit, captchaOK, disabled, }) {
    const isNotStarted = requestState === RequestState.Initial || requestState === RequestState.Invalid;
    const isInvalid = requestState === RequestState.Invalid;
    const isStarted = requestState === RequestState.Working;
    const isEnded = requestState === RequestState.Completed || requestState === RequestState.Failed;
    const icon = isStarted && <Spinner color={colors.primary} size="small"/>;
    return (<Button disabled={isInvalid || !captchaOK || isStarted || isEnded || disabled} kind={isNotStarted ? BTN.PRIMARY : BTN.SECONDARY} text={buttonText({ requestState, t, isFaucet })} onPress={onSubmit} onDarkBackground={!isFaucet} iconLeft={icon} align={"flex-start"} style={!isFaucet && isEnded && [textStyles.invert, styles.message]} size={isFaucet ? SIZE.normal : SIZE.big}/>);
}
function buttonText({ requestState, t, isFaucet }) {
    switch (requestState) {
        case RequestState.Working:
            return "";
        case RequestState.Completed:
            return isFaucet ? t("faucetDone") : t("inviteDone");
        default:
            return t("getStarted");
    }
}
function faucetText({ requestState, t }) {
    return ({
        [RequestState.Failed]: t("faucetError"),
        [RequestState.Invalid]: t("invalidAddress"),
    }[requestState] || `eg. ${EXAMPLE_ADDRESS}`);
}
function inviteText({ requestState, t }) {
    return RequestState.Failed === requestState ? t("inviteError") : "";
}
const styles = StyleSheet.create({
    log: {
        marginLeft: 10,
        marginTop: 20,
    },
    ticker: {
        marginLeft: 20,
        justifyContent: "center",
        height: "100%",
    },
    statusesContainerLog: {
        position: "absolute",
        width: "100%",
        marginTop: 10,
    },
    statusesContainerTicker: {
        alignContent: "center",
        height: "100%",
    },
    message: {
        lineHeight: 20,
    },
});
//# sourceMappingURL=MicroComponents.jsx.map