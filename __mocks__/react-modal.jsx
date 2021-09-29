import * as React from 'react';
export default class MockReactModal extends React.Component {
    static setAppElement() {
        return null;
    }
    render() {
        return <div id={this.props.id}>{this.props.isOpen && this.props.children}</div>;
    }
}
//# sourceMappingURL=react-modal.jsx.map