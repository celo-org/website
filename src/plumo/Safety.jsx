import { css } from "@emotion/react";
import * as React from "react";
import { colors } from "src/styles";
export default class Safety extends React.Component {
    state = { hasError: false, error: "" };
    static getDerivedStateFromError(error) {
        return { hasError: true, error: error };
    }
    componentDidCatch(error, errorInfo) {
        console.info(error, errorInfo);
    }
    render() {
        if (this.state.hasError) {
            return <pre css={errorStyle}>{this.state.error.toString()}</pre>;
        }
        return this.props.children;
    }
}
const errorStyle = css({
    color: colors.error,
});
//# sourceMappingURL=Safety.jsx.map