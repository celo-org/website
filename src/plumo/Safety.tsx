import { css } from "@emotion/react"
import * as React from "react"
import { colors } from "src/styles"

interface State {
  hasError: boolean
  error: string
}

interface Props {
  children: React.ReactNode
}

export default class Safety extends React.Component<Props, State> {
  state: State = { hasError: false, error: "" }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.info(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <pre css={errorStyle}>{this.state.error.toString()}</pre>
    }

    return this.props.children
  }
}

const errorStyle = css({
  color: colors.error,
})
