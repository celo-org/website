import * as React from "react";
import { ErrorKeys } from "src/forms/ErrorDisplay";
import { postForm } from "src/forms/postForm";
export default class Form extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            form: props.blankForm,
            isComplete: false,
            isLoading: false,
            errors: [],
        };
    }
    postForm = async () => {
        this.setState({ isLoading: true });
        const response = await postForm(this.props.route, this.form());
        const apiError = response.status === 429
            ? ErrorKeys.pleaseWait
            : !response.ok
                ? ErrorKeys.unknownError
                : undefined;
        this.setState({
            isComplete: response.ok,
            form: response.ok ? this.props.blankForm : this.state.form,
            isLoading: false,
            errors: [],
            apiError,
        });
    };
    validates = () => {
        if (!this.props.validateWith) {
            return true;
        }
        const errors = this.props.validateWith(this.form());
        this.setState({ errors, isComplete: false, isLoading: false });
        return errors.length === 0;
    };
    onSubmit = () => {
        if (this.validates()) {
            return this.postForm();
        }
    };
    form = () => {
        return { ...this.state.form };
    };
    onInput = ({ name, newValue: value }) => {
        this.clearError(name);
        this.updateForm(name, value);
    };
    onCheck = ({ nativeEvent }) => {
        const field = nativeEvent.target.name || nativeEvent.target.htmlFor;
        this.updateForm(field, !this.state.form[field]);
    };
    clearError = (field) => {
        this.setState((state) => {
            return { ...state, errors: state.errors.filter((error) => error !== field) };
        });
    };
    onSelect = (key) => (event) => {
        this.updateForm(key, event.target.value);
    };
    updateForm = (key, value) => {
        this.setState((state) => ({
            ...state,
            isComplete: false,
            form: { ...state.form, [key]: value },
        }));
    };
    render() {
        return this.props.children({
            onSubmit: this.onSubmit,
            onInput: this.onInput,
            onCheck: this.onCheck,
            onSelect: this.onSelect,
            formState: { ...this.state },
        });
    }
}
//# sourceMappingURL=Form.jsx.map