import * as React from "react";
import * as ReactDOM from "react-dom";
export class Portal extends React.Component {
    element;
    componentDidMount() {
        this.element = document.querySelector(this.props.selector);
        this.forceUpdate();
    }
    render() {
        if (this.element === undefined) {
            return null;
        }
        return ReactDOM.createPortal(this.props.children, this.element);
    }
}
//# sourceMappingURL=Portal.jsx.map