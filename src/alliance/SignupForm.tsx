import * as React from "react"
import { NewMember } from "src/alliance/AllianceMember"
import { ErrorDisplay } from "src/forms/ErrorDisplay"
import FormContainer from "src/forms/Form"
import { emailIsValid, hasField } from "src/forms/emailIsValid"
import { Form } from "src/forms/FormComponents"
import { LabeledInput } from "src/forms/LabeledInput"
import SubmitButton from "src/forms/SubmitButton"
import SuccessDisplay from "src/forms/SuccessDisplay"
import { NameSpaces, useTranslation } from "src/i18n"
import { useScreenSize } from "src/layout/ScreenSize"
import { SIZE } from "src/shared/Button.3"
import { standardStyles } from "src/styles"
import { css } from "@emotion/react"
import { flex, flexRow, WHEN_DESKTOP, WHEN_MOBILE, honeypotCss } from "src/estyles"

const BLANK_FORM: NewMember = {
  name: "",
  email: "",
  contribution: "",
  subscribe: false,
  mielpoto: "",
}

function validateWith(fields: NewMember) {
  return Object.keys(fields).filter((key) => {
    if (key === "email") {
      return !emailIsValid(fields[key])
    } else if (key === "subscribe" || key === "contribution") {
      return false
    } else if (key === "mielpoto") {
      return false
    } else {
      return !hasField(fields[key])
    }
  })
}

export default function SignupForm() {
  const { t } = useTranslation(NameSpaces.alliance)
  const { isMobile } = useScreenSize()
  return (
    <FormContainer route="/api/alliance" blankForm={BLANK_FORM} validateWith={validateWith}>
      {({ formState, onInput, onSubmit }) => (
        <Form>
          <div css={rootCss}>
            <div css={desktopRow}>
              <div css={inputContainerCss}>
                <LabeledInput
                  isDarkMode={true}
                  label={t("form.name")}
                  onInput={onInput}
                  allErrors={formState.errors}
                  name="name"
                  value={formState.form.name}
                />
              </div>
              <div css={inputContainerCss}>
                <LabeledInput
                  isDarkMode={true}
                  label={t("form.email")}
                  onInput={onInput}
                  allErrors={formState.errors}
                  name="email"
                  value={formState.form.email}
                />
              </div>
            </div>
            <div css={inputContainerCss}>
              <LabeledInput
                isDarkMode={true}
                label={t("form.contribution")}
                onInput={onInput}
                name="contribution"
                value={formState.form.contribution}
              />
            </div>
            <div css={honeypotCss}>
              <LabeledInput
                isDarkMode={true}
                label={t("form.mielpoto")}
                onInput={onInput}
                name="mielpoto"
                value={formState.form.mielpoto}
              />
            </div>
          </div>
          <div css={buttonContainerCss}>
            <SubmitButton
              isLoading={formState.isLoading}
              text={t("form.btn")}
              onDarkBackground={true}
              onPress={onSubmit}
              style={buttonText}
              size={isMobile ? SIZE.fullWidth : SIZE.big}
            />
            <SuccessDisplay
              css={successCss}
              isShowing={formState.isComplete}
              message={t("common:applicationSubmitted")}
            />
          </div>

          <div css={standardStyles.centered}>
            <ErrorDisplay isShowing={!!formState.apiError} field={formState.apiError} />
          </div>
        </Form>
      )}
    </FormContainer>
  )
}

const rootCss = css(flex, {
  margin: 20,
})

const desktopRow = css(flex, {
  [WHEN_DESKTOP]: flexRow,
})

const buttonText = {
  fontSize: 20,
}

const inputContainerCss = css(flex, {
  flex: 1,
  marginLeft: 5,
  marginRight: 5,
})

const buttonContainerCss = css(flex, {
  alignItems: "center",
  justifyContent: "center",
  padding: "15px 20px",
  [WHEN_MOBILE]: {
    alignItems: "stretch",
  },
})

const successCss = css({
  textAlign: "center",
  marginTop: 15,
  color: "white",
  alignSelf: "center",
})
