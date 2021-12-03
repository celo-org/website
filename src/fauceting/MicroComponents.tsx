import * as React from "react"
import { StyleSheet } from "react-native"
import { EXAMPLE_ADDRESS, RequestState } from "src/fauceting/utils"
import { I18nProps } from "src/i18n"
import Checkmark from "src/icons/Checkmark"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import Spinner from "src/shared/Spinner"
import { textStyles } from "src/styles"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import { useTranslation } from "react-i18next"
import { flexRow } from "src/estyles"
import { fonts, textStyles as etextStyles } from "src/estyles"

interface InfoProps {
  requestState: RequestState
  t: I18nProps["t"]
  isFaucet: boolean
}

const BAD_STATES = new Set([RequestState.Failed, RequestState.Invalid])

export function ContextualInfo({ requestState, t, isFaucet }: InfoProps) {
  const contextStyle = [
    fonts.micro,
    !isFaucet && etextStyles.readingOnDark,
    BAD_STATES.has(requestState) && etextStyles.error,
  ]

  const text = isFaucet ? faucetText({ requestState, t }) : inviteText({ requestState, t })

  return <span css={contextStyle}>{text}</span>
}

interface HashProps {
  isFaucet: boolean
  dollarTxHash: string | null
  goldTxHash: string | null
  escrowTxHash: string | null
  done: boolean
}

export function HashingStatus({
  isFaucet,
  dollarTxHash,
  goldTxHash,
  escrowTxHash,
  done,
}: HashProps) {
  const { t } = useTranslation("faucet")
  return (
    <div css={isFaucet ? statusesContainerTickerCss : hashingStatusCss}>
      {[
        goldTxHash && isFaucet && t("cGLDsent"),
        dollarTxHash && t("cUSDsent"),
        escrowTxHash && t("walletBuilt"),
      ]
        .filter((x) => !!x)
        .map((message) => (
          <div key={message} css={[isFaucet ? tickerCss : logCss, done && doneCss]}>
            <h6 css={fonts.h6}>
              <Checkmark size={12} color={colors.primary} /> {message}
            </h6>
          </div>
        ))}
    </div>
  )
}

const hashingStatusCss = css({
  position: "absolute",
  width: "100%",
  marginTop: 10,
})

const statusesContainerTickerCss = css(flexRow, {
  alignContent: "center",
  height: "100%",
})

const tickerCss = css({
  marginLeft: 20,
  justifyContent: "center",
  height: "100%",
  transitionDuration: "1s",
  transitionProperty: "opacity",
  opacity: 0,
})

const logCss = css({
  marginLeft: 10,
  marginTop: 20,
  transitionDuration: "1s",
  transitionProperty: "opacity",
  opacity: 0,
})

const doneCss = css({
  opacity: 1,
})

interface ButtonProps {
  requestState: RequestState
  isFaucet: boolean
  t: I18nProps["t"]
  onSubmit: () => void
  captchaOK: boolean
  disabled?: boolean
}

export function ButtonWithFeedback({
  requestState,
  isFaucet,
  t,
  onSubmit,
  captchaOK,
  disabled,
}: ButtonProps) {
  const isNotStarted =
    requestState === RequestState.Initial || requestState === RequestState.Invalid
  const isInvalid = requestState === RequestState.Invalid
  const isStarted = requestState === RequestState.Working
  const isEnded = requestState === RequestState.Completed || requestState === RequestState.Failed
  const icon = isStarted && <Spinner color={colors.primary} size="small" />

  return (
    <Button
      disabled={isInvalid || !captchaOK || isStarted || isEnded || disabled}
      kind={isNotStarted ? BTN.PRIMARY : BTN.SECONDARY}
      text={buttonText({ requestState, t, isFaucet })}
      onPress={onSubmit}
      onDarkBackground={!isFaucet}
      iconLeft={icon}
      align={"flex-start"}
      style={!isFaucet && isEnded && [textStyles.invert, styles.message]}
      size={isFaucet ? SIZE.normal : SIZE.big}
    />
  )
}

interface TextFuncArgs {
  t: I18nProps["t"]
  requestState: RequestState
  isFaucet?: boolean
}

function buttonText({ requestState, t, isFaucet }: TextFuncArgs) {
  switch (requestState) {
    case RequestState.Working:
      return ""
    case RequestState.Completed:
      return isFaucet ? t("faucetDone") : t("inviteDone")
    default:
      return t("getStarted")
  }
}

function faucetText({ requestState, t }: TextFuncArgs) {
  return (
    {
      [RequestState.Failed]: t("faucetError"),
      [RequestState.Invalid]: t("invalidAddress"),
    }[requestState] || `eg. ${EXAMPLE_ADDRESS}`
  )
}

function inviteText({ requestState, t }: TextFuncArgs) {
  return RequestState.Failed === requestState ? t("inviteError") : ""
}

const styles = StyleSheet.create({
  message: {
    lineHeight: 20,
  },
})
