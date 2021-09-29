import * as React from "react";
import { ScreenSizeContext, ScreenSizes } from "src/layout/ScreenSize";
export default class Responsive extends React.Component {
    getStyle = (screen) => {
        if (screen === ScreenSizes.DESKTOP) {
            if (this.props.large) {
                return { style: this.props.large };
            }
            else if (this.props.medium) {
                return { style: this.props.medium };
            }
        }
        else if (screen === ScreenSizes.TABLET) {
            if (this.props.medium) {
                return { style: this.props.medium };
            }
            else {
                return undefined;
            }
        }
        return undefined;
    };
    render() {
        return (<ScreenSizeContext.Consumer>
        {({ screen }) => {
                const style = this.getStyle(screen);
                return React.Children.map(this.props.children, (child) => {
                    if (child) {
                        return React.cloneElement(child, style);
                    }
                });
            }}
      </ScreenSizeContext.Consumer>);
    }
}
//# sourceMappingURL=Responsive.jsx.map