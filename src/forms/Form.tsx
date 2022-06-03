import * as React from "react"
import { ErrorKeys } from "src/forms/ErrorDisplay"
import { postForm } from "src/forms/postForm"
import ReCAPTCHA from "react-google-recaptcha"
interface State {
  isComplete: boolean
  isLoading: boolean
  form: FormState
  errors: string[]
  apiError?: ErrorKeys
  //newly added by henrynunez112/formBots
  captchaOK?: boolean
}

type FormField = string

export type FormState = Record<FormField, any>

interface NativeEvent {
  target: { name: string; value: string | boolean }
}

interface ChildArguments {
  onSubmit: (any?: any) => Promise<void>
  onInput: ({ name, newValue }) => void
  onCheck: (event: { nativeEvent: NativeEvent }) => void
  onSelect: (key: string) => (event) => void
  onCaptcha: (value: string | null) => void
  resetCaptcha: (any?: any) => void
  getCaptchaToken: (any?: any) => void
  formState: State
}

interface Props {
  route: string
  blankForm: FormState
  validateWith?: (form: FormState) => string[]
  children: (methods: ChildArguments) => React.ReactNode
}

export default class Form extends React.Component<Props, State> {
  private recaptchaRef = React.createRef<ReCAPTCHA>()
  constructor(props, context) {
    super(props, context)
    this.state = {
      form: props.blankForm,
      isComplete: false,
      isLoading: false,
      errors: [],
    }
  }

  postForm = async () => {
    this.setState({ isLoading: true })
    const response = await postForm(this.props.route, this.form())
    const apiError =
      response.status === 429
        ? ErrorKeys.pleaseWait
        : !response.ok
        ? ErrorKeys.unknownError
        : undefined
    this.setState({
      isComplete: response.ok,
      form: response.ok ? this.props.blankForm : this.state.form,
      isLoading: false,
      errors: [],
      apiError,
    })
  }

  validates = () => {
    if (!this.props.validateWith) {
      return true
    }

    const errors = this.props.validateWith(this.form())

    this.setState({ errors, isComplete: false, isLoading: false })
    return errors.length === 0
  }

  onSubmit = () => {
    if (this.validates()) {
      return this.postForm()
    }
  }
  onCaptcha = (value: string | null) => {
    this.setState({ captchaOK: !!value })
  }

  resetCaptcha = () => {
    this.recaptchaRef.current.reset()
  }

  getCaptchaToken = () => {
    return this.recaptchaRef.current.getValue()
  }

  form = () => {
    return { ...this.state.form }
  }

  onInput = ({ name, newValue: value }) => {
    this.clearError(name)

    this.updateForm(name, value)
  }

  onCheck = ({ nativeEvent }) => {
    const field = nativeEvent.target.name || nativeEvent.target.htmlFor
    this.updateForm(field, !this.state.form[field])
  }

  clearError = (field: string) => {
    this.setState((state) => {
      return { ...state, errors: state.errors.filter((error) => error !== field) }
    })
  }

  onSelect = (key) => (event: { target: { value: string } }) => {
    this.updateForm(key, event.target.value)
  }

  updateForm = (key, value) => {
    this.setState((state) => ({
      ...state,
      isComplete: false,
      form: { ...state.form, [key]: value },
    }))
  }

  render() {
    return this.props.children({
      onSubmit: this.onSubmit,
      onInput: this.onInput,
      onCheck: this.onCheck,
      onSelect: this.onSelect,
      onCaptcha: this.onCaptcha,
      resetCaptcha: this.resetCaptcha,
      getCaptchaToken: this.getCaptchaToken,
      formState: { ...this.state },
    })
  }
}
