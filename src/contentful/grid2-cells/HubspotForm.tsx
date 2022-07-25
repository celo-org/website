import { css } from "@emotion/react"
import Script from "next/script"
import { useLayoutEffect, useState } from "react"
import { colors } from "src/colors"
import { inputStyle, labelStyle, errorStyle, inputDarkStyle } from "src/estyles"
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
  "input, textarea": inputStyle,
  "input[type='checkbox']": { flexBasis: 0 },
  label: css(labelStyle, { flexDirection: "row" }),
  "input.hs-button": css(fonts.navigation, {
    backgroundColor: colors.primary,
    color: colors.white,
    width: "fit-content",
    border: "none",
    "&:hover": {
      backgroundColor: colors.primaryHover,
    },
    "&:active": {
      backgroundColor: colors.primaryPress,
    },
  }),
  ul: { "list-style-type": "none" },
  ".hs-error-msg": errorStyle,
  ".legal-consent-container": fonts.legal,
  a: { color: colors.greenUI },
})
