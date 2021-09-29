import * as React from "react";
import { StyleSheet, TextInput as RNTextInput, } from "react-native";
export class TextInput extends React.PureComponent {
    state = { focused: false };
    onFocus = (e) => {
        this.setState({ focused: true });
        if (this.props.onFocus) {
            this.props.onFocus(e);
        }
    };
    onBlur = (e) => {
        this.setState({ focused: false });
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }
    };
    render() {
        const { style, focusStyle, ...props } = this.props;
        const currentStyle = this.state.focused ? StyleSheet.flatten([style, focusStyle]) : style;
        return (<RNTextInput {...props} onFocus={this.onFocus} onBlur={this.onBlur} style={currentStyle}/>);
    }
}
export default TextInput;
//# sourceMappingURL=TextInput.jsx.map