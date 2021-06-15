import { render } from "@testing-library/react"
import * as React from "react"
import i18nForTests from "src/utils/i18nForTests"
interface Props {
  children?: React.ReactNode
}
import { I18nextProvider } from "react-i18next"



export function TestProvider({ children }: Props) {
  return <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>
}

// https://github.com/testing-library/react-testing-library/issues/470
// an issue with muted on video causing a rerender, this seems to be be best solution for now
export const renderIgnoringUnstableFlushDiscreteUpdates = (component: React.ReactElement) => {
  // tslint:disable: no-console
  const originalError = console.error
  const error = jest.fn()
  console.error = error
  const result = render(component)
  expect(error).toHaveBeenCalledTimes(1)
  expect(error).toHaveBeenCalledWith(
    "Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s",
    expect.any(String)
  )
  console.error = originalError
  // tslint:enable: no-console
  return result
}
