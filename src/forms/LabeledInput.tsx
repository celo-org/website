import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { ErrorDisplay, ErrorKeys, getErrorTransKey } from "src/forms/ErrorDisplay"
import { TextInput } from "src/forms/TextInput"
import { fonts, standardStyles, textStyles } from "src/styles"
import { colors } from "src/colors"
import { css } from "@emotion/react"
interface LabelProps {
  name: string
  multiline?: boolean
  allErrors?: string[]
  displayErrorAs?: ErrorKeys
  value: string
  label: string
  onInput: (x?: unknown) => void
  isDarkMode?: boolean
}

export function LabeledInput({
  name,
  multiline,
  allErrors,
  displayErrorAs,
  value,
  onInput,
  label,
  isDarkMode,
}: LabelProps) {
  const hasError = React.useMemo(() => allErrors && allErrors.includes(name), [allErrors, name])

  const onChange = (newValue) => {
    return onInput({ name, newValue })
  }

  return (
    <div css={containerCss}>
      <View style={styles.labelBox}>
        <Text accessibilityRole={"label"} style={[fonts.a, textStyles.medium, styles.label]}>
          {label}
        </Text>
      </View>
      <TextInput
        accessibilityLabel={label}
        multiline={multiline}
        numberOfLines={3}
        style={[
          standardStyles.input,
          fonts.p,
          styles.input,
          isDarkMode && standardStyles.inputDarkMode,
          hasError && styles.errorBorder,
        ]}
        focusStyle={isDarkMode ? standardStyles.inputDarkFocused : standardStyles.inputFocused}
        name={name}
        value={value}
        onChangeText={onChange}
      />
      {allErrors && (
        <ErrorDisplay isShowing={hasError} field={getErrorTransKey(displayErrorAs || name)} />
      )}
    </div>
  )
}

const containerCss = css({
  marginBottom: 10,
})

export const styles = StyleSheet.create({
  errorBorder: {
    borderColor: colors.error,
  },
  input: {
    marginVertical: 0,
  },
  label: {
    color: colors.secondary,
    lineHeight: 20,
  },
  labelBox: {
    marginBottom: 5,
  },
})
