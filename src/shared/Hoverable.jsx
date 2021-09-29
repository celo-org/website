import * as React from "react";
export default class Hoverable extends React.Component {
    isHoverEnabled = true;
    constructor(props) {
        super(props);
        this.state = { isHovered: false, showHover: true };
    }
    checkIfHoverEnabled = () => {
        const HOVER_THRESHOLD_MS = 1000;
        let lastTouchTimestamp = 0;
        function enableHover() {
            if (this.isHoverEnabled || Date.now() - lastTouchTimestamp < HOVER_THRESHOLD_MS) {
                return;
            }
            this.isHoverEnabled = true;
        }
        function disableHover() {
            lastTouchTimestamp = Date.now();
            if (this.isHoverEnabled) {
                this.isHoverEnabled = false;
            }
        }
        window.document.addEventListener("touchstart", disableHover, true);
        window.document.addEventListener("touchmove", disableHover, true);
        window.document.addEventListener("mousemove", enableHover, true);
    };
    onMouseEnter = () => {
        if (this.isHoverEnabled && !this.state.isHovered) {
            const { onHoverIn } = this.props;
            if (onHoverIn) {
                onHoverIn();
            }
            this.setState((state) => ({ ...state, isHovered: true }));
        }
    };
    onMouseLeave = () => {
        if (this.state.isHovered) {
            const { onHoverOut } = this.props;
            if (onHoverOut) {
                onHoverOut();
            }
            this.setState((state) => ({ ...state, isHovered: false }));
        }
    };
    onPressIn = () => {
        if (this.props.onPressDown) {
            this.props.onPressDown();
        }
        this.onGrant();
    };
    onPressOut = () => {
        if (this.props.onPressUp) {
            this.props.onPressUp();
        }
        this.onRelease();
    };
    onGrant = () => {
        this.setState((state) => ({ ...state, showHover: false }));
    };
    onRelease = () => {
        this.setState((state) => ({ ...state, showHover: true }));
    };
    render() {
        const isHovering = this.state.showHover && this.state.isHovered;
        const { children } = this.props;
        const child = getChild(children, isHovering);
        return React.cloneElement(React.Children.only(child), {
            onMouseEnter: this.onMouseEnter,
            onMouseLeave: this.onMouseLeave,
            onResponderGrant: this.onGrant,
            onResponderRelease: this.onRelease,
            onPressIn: this.onPressIn,
            onPressOut: this.onPressOut,
            onMouseDown: this.onPressIn,
            onMouseUp: this.onPressOut,
            onClick: this.props.onPress,
        });
    }
}
function isFunction(thing) {
    return typeof thing === "function";
}
function getChild(children, isHovering) {
    if (isFunction(children)) {
        const kids = children;
        return kids(isHovering);
    }
    else {
        return children;
    }
}
//# sourceMappingURL=Hoverable.jsx.map