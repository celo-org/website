import { css } from "@emotion/react"
import Script from "next/script"
import { useLayoutEffect, useState } from "react"
import { colors } from "src/colors"
import {
  inputStyle,
  errorStyle,
  inputDarkStyle,
  WHEN_MOBILE,
  WHEN_TABLET,
  inter,
} from "src/estyles"
import { fonts } from "src/estyles"
import { HubFormFieldsType } from "src/utils/contentful"

export default function HubspotForm({ hubspotFormId, darkMode }: HubFormFieldsType) {
  const target = `form-${hubspotFormId}`

  const [scriptsLoaded, setScriptsLoaded] = useState(false)

  useLayoutEffect(() => {
    // @ts-expect-error
    if (scriptsLoaded || window.hbspt) {
      // @ts-expect-error
      window.hbspt?.forms?.create({
        region: "na1",
        portalId: "8568019",
        formId: hubspotFormId,
        target: `#${target}`,
        css: "",
        cssRequired: "",
        errorClass: "contact-error",
        errorMessageClass: "contact-error-message",
        cssClass: "celo-hbspt",
        onFormReady: function ($form) {
          const inputs = $form.querySelectorAll(".field")

          for (let i = 0; i < inputs.length; i++) {
            let currentEl = null
            const label = inputs[i].getElementsByTagName("label")[0]
            if (inputs[i].getElementsByTagName("input").length !== 0) {
              currentEl = inputs[i].getElementsByTagName("input")
            } else {
              currentEl = inputs[i].getElementsByTagName("textarea")
            }
            if (label) {
              currentEl[0].placeholder = label.innerText
              label.style.display = "none"
            }
          }
        },
      })
    }
  }, [scriptsLoaded, hubspotFormId, target])

  return (
    <>
      <Script
        key="hubspot-scripts"
        async={true}
        src={"//js.hsforms.net/forms/v2.js"}
        onLoad={() => {
          setScriptsLoaded(true)
        }}
      />
      <span id={target} css={css(style, darkMode && styleDark)} />
    </>
  )
}

const styleDark = css({
  "input, textarea": inputDarkStyle,
  ".legal-consent-container": {
    color: colors.placeholderDarkMode,
  },
})

const style = css({
  width: "100%",
  display: "inline-block",
  img: {
    display: "none",
  },
  ".grecaptcha-badge": {
    display: "none",
  },
  "#email-b4dd2ae2-68e9-4662-bfd3-b2860162a5aa": inputStyle,
  "#hsForm_b4dd2ae2-68e9-4662-bfd3-b2860162a5aa input[type=submit]": {
    display: "none",
  },
  ".celo-hbspt": {
    width: "100%",
  },
  ".celo-hbspt *": {
    boxSizing: "border-box",
  },
  ".celo-hbspt fieldset": css({
    border: 0,
    padding: 0,
    margin: 0,
    maxWidth: "100%",
    [WHEN_TABLET]: {
      marginRight: "0 !important",
      width: "100% !important",
    },
    [WHEN_MOBILE]: {
      float: "none",
      width: "100%",
    },
  }),
  ".celo-hbspt fieldset.form-columns-2 .hs-form-field": {
    width: "50%",
    float: "left",
    [WHEN_TABLET]: {
      float: "none",
      width: "100%",
    },
    [WHEN_MOBILE]: {
      float: "none",
      width: "100%",
    },
  },
  ".celo-hbspt .field": {
    marginBottom: 32,
  },
  ".celo-hbspt .input": {
    marginRight: 26,
  },
  ".celo-hbspt .hs-input": css(inputStyle, inter, {
    fontSize: 14,
    borderColor: "rgba(0, 0, 0, 0.2)",
  }),
  ".hs-custom-style fieldset textarea": css({
    lineHeight: "14px !important",
    height: 62,
    overflowY: "hidden",
  }),
  ".celo-hbspt .contact-error": css({
    borderColor: colors.errorInput,
  }),
  ".celo-hbspt .hs-error-msg": {
    color: colors.errorInput,
  },
  "input[type='checkbox']": { flexBasis: 0 },
  // label: css({display: 'none'}),
  "input.hs-button": css(fonts.navigation, {
    backgroundColor: colors.primaryYellow,
    color: colors.black,
    padding: "24px 64px",
    borderRadius: 70,
    width: "fit-content",
    border: `1px solid ${colors.outlineGray}`,
    marginTop: 32,
    "&:hover": {
      backgroundColor: colors.black,
      color: colors.white,
    },
    "&:active": {
      backgroundColor: colors.black,
      color: colors.white,
    },
  }),
  ul: { listStyleType: "none" },
  ".hs-error-msg": errorStyle,
  ".legal-consent-container": fonts.legal,
  a: { color: colors.greenUI },
})
