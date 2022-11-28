import Chevron from "../../icons/chevron"
import { colors } from "../../colors"
import * as React from "react"
import { useRef } from "react"
import { css, SerializedStyles } from "@emotion/react"
import { flexRow, garamond, WHEN_MOBILE, WHEN_TABLET } from "../../estyles"

interface Props {
  customCss?: SerializedStyles
  chevronColor: colors
  placeholder: string
  onChange: () => void
}

export default function TextInput(props: Props) {
  const { chevronColor, customCss, placeholder, onChange } = props
  const inputEl = useRef(null)

  const focusOnInput = () => {
    inputEl.current.focus()
  }

  return (
    <div css={inputContainer} onClick={focusOnInput}>
      <input
        ref={inputEl}
        css={css(inputCss, customCss)}
        placeholder={placeholder}
        type="text"
        onChange={onChange}
      />
      <Chevron color={chevronColor} size={"0.75em"} />
    </div>
  )
}

const inputContainer = css(flexRow, {
  alignItems: "center",
  justifyContent: "space-between",
  border: `1px solid ${colors.transparentGray}`,
  borderRadius: 70,
  paddingLeft: 24,
  paddingRight: 30,
  marginTop: 25,
  width: 294,
  "&:hover": {
    cursor: "text",
  },
  "&:focus-within": {
    borderColor: colors.black,
  },
})

const inputCss = css(garamond, {
  [WHEN_MOBILE]: {
    justifyContent: "center",
    alignItems: "center",
  },
  [WHEN_TABLET]: {
    justifyContent: "center",
    alignItems: "center",
  },
  border: "none",
  // border: `1px inset ${colors.transparentGray}`,
  height: 54,
  fontSize: 20,
  backgroundColor: "transparent",
  ["::placeholder"]: {
    color: colors.placeholderDarkMode,
    fontSize: 14,
  },
  "&:active, &:focus": {
    border: "none",
    outline: "none",
  },
})
