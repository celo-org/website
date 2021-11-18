import * as React from "react"
import { ErrorDisplay, ErrorKeys } from "src/forms/ErrorDisplay"
import Form from "src/forms/Form"
import { emailIsValid } from "src/forms/emailIsValid"
import SubmitButton from "src/forms/SubmitButton"
import SuccessDisplay from "src/forms/SuccessDisplay"
import { NameSpaces, useTranslation } from "src/i18n"
import { useScreenSize } from "src/layout/ScreenSize"
import { SIZE } from "src/shared/Button.3"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import {
  flex,
  WHEN_TABLET_AND_UP,
  WHEN_MOBILE,
  fonts,
  inputStyle,
  inputDarkStyle,
} from "src/estyles"

const NEWSLETTER_LIST = "1"
export const DEVELOPER_LIST = "10"

interface OwnProps {
  submitText: string
  placeholder?: string
  route?: string
  listID?: string
  isDarkMode?: boolean
}

const blankForm = { email: "", fullName: "", list: "" /* mielpoto: ""*/ }

type Props = OwnProps

// return array of all invalid fields
const validateFields = ({ email }: { email: string }) => {
  // check email is present and within  and has a @ char that is the second character or greater
  if (emailIsValid(email)) {
    return []
  } else {
    return ["email"]
  }
}

const emailErrorStyle = (errors: string[]) => {
  if (errors.includes("email")) {
    return { borderColor: colors.error }
  }
  return {}
}

export default React.memo(function EmailForm({
  isDarkMode,
  submitText,
  placeholder,
  listID = NEWSLETTER_LIST,
  route,
}: Props) {
  const inputTheme = isDarkMode ? styles.inputDarkMode : styles.inputLightMode
  const { isMobile } = useScreenSize()
  const { t } = useTranslation(NameSpaces.common)

  return (
    <Form route={route} blankForm={{ ...blankForm, list: listID }} validateWith={validateFields}>
      {({ formState, onInput, onSubmit }) => {
        const borderStyle = emailErrorStyle(formState.errors)
        const hasError = !!formState.apiError || !!formState.errors.length
        const errorKey = formState.apiError || ErrorKeys.email
        const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
          onInput({ name: "email", newValue: event.target.value })
        }
        // const onHoneyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //   onInput({ name: "mielpoto", newValue: event.target.value })
        // }

        return (
          <>
            <div css={styles.feedback}>
              {!isMobile && <ErrorDisplay isShowing={hasError} field={errorKey} />}
            </div>
            <div css={styles.container}>
              <input
                css={css(
                  styles.input,
                  inputTheme,
                  borderStyle,
                  isDarkMode ? inputDarkStyle : inputStyle
                )}
                onChange={onChange}
                placeholder={placeholder || t("common:email") + "*"}
                name="email"
                type="email"
                value={formState.form.email}
                required={true}
              />
              {/* <input
                onChange={onHoneyChange}
                name="mielpoto"
                type="text"
                required={true}
                value={formState.form.mielpoto}
              /> */}
              {isMobile && (
                <div css={!!formState.errors.length && styles.feedbackMobile}>
                  <ErrorDisplay isShowing={hasError} field={errorKey} />
                </div>
              )}
              <SubmitButton
                isLoading={formState.isLoading}
                onPress={onSubmit}
                text={submitText}
                size={SIZE.fullWidth}
                style={!isMobile && submitBtnDesktop}
              />
            </div>
            <div css={styles.success}>
              <SuccessDisplay isShowing={formState.isComplete} message={t("common:shortSuccess")} />
            </div>
          </>
        )
      }}
    </Form>
  )
})

const submitBtnDesktop = {
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  marginVertical: 5,
  paddingHorizontal: 40,
  minWidth: 100,
  maxHeight: 60,
}

const borderWidth = 1
const borderRadius = 3

const styles = {
  container: css(flex, {
    flexDirection: "row",
    width: "100%",
    [WHEN_MOBILE]: {
      flexDirection: "column",
      margin: "5px 0px",
      paddingBottom: 15,
    },
  }),
  submitText: css({
    color: colors.white,
  }),
  input: css(fonts.body, {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 13,
    paddingBottom: 15,
    borderRadius,
    borderWidth,
    outlineStyle: "none",
    [WHEN_TABLET_AND_UP]: {
      borderTopRightRadius: 0,
      borderBottomRightRadius: 0,
      borderRightWidth: 0,
      marginRight: 0,
      marginBottom: 4,
    },
  }),
  inputLightMode: css({
    borderColor: colors.gray,
    color: colors.dark,
  }),
  inputDarkMode: css({
    borderColor: colors.gray,
    color: colors.white,
  }),
  feedback: css({
    alignSelf: "flex-start",
    paddingLeft: 8,
  }),
  feedbackMobile: css({
    marginBottom: 5,
  }),
  success: css({
    marginTop: 10,
  }),
}
