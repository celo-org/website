import lottie from "lottie-web";
import * as React from "react";
export default class LottieBase extends React.Component {
    elementRef = React.createRef();
    animation;
    componentDidMount = () => {
        this.animation = lottie.loadAnimation({
            container: this.elementRef.current,
            renderer: "svg",
            loop: this.props.loop,
            autoplay: this.props.autoPlay,
            animationData: this.props.data,
            path: this.props.path ? `/lottieFiles/${this.props.path}` : undefined,
            rendererSettings: {
                progressiveLoad: true,
            },
        });
        if (this.props.onReady && this.animation.addEventListener) {
            this.animation.addEventListener("DOMLoaded", this.props.onReady);
        }
        if (this.props.onLooped && this.animation.addEventListener) {
            this.animation.addEventListener("loopComplete", this.onLoop);
        }
    };
    onLoop = (data) => {
        this.props.onLooped(data);
    };
    componentWillUnmount = () => {
        this.animation.destroy();
    };
    render() {
        return <span ref={this.elementRef} style={expand}/>;
    }
}
const expand = { width: "100%", height: "100%" };
//# sourceMappingURL=LottieBase.jsx.map