import * as React from "react";
import LazyLoad from "react-lazyload";
import { StyleSheet } from "react-native";
import ringPaths from "src/community/connect/QuarterRingOfVectors";
import { ScreenSizes, withScreenSize } from "src/layout/ScreenSize";
import { Path } from "src/shared/svg";
import { baseCoinStyle, colors } from "src/styles";
class QuarterCircle extends React.PureComponent {
    getHeight = () => {
        return {
            [ScreenSizes.MOBILE]: 520,
            [ScreenSizes.TABLET]: 630,
            [ScreenSizes.DESKTOP]: 770,
        }[this.props.screen];
    };
    render() {
        const height = this.getHeight();
        const width = 1.3 * height;
        return (<LazyLoad unmountIfInvisible={true} height={height}>
        <svg height={height} width={width} viewBox="0 0 950 750" fill="none">
          <mask id="mask0" y="0" width={width * 2} height={height}>
            <rect width={width * 2} height={height} fill={"#000"}/>
          </mask>
          <g>
            {ringPaths.map((d, index) => {
                const style = [styles.base, baseCoinStyle];
                if (ANIMATED[index]) {
                    style.push(styles.animationBase);
                    style.push(pathStyle(index));
                }
                return <Path key={d} d={d} style={style}/>;
            })}
          </g>
        </svg>
      </LazyLoad>);
    }
}
export default withScreenSize(QuarterCircle);
const START_INDEX = 24;
const DISTANCE = 3;
const END_INDEX = START_INDEX + 2 * DISTANCE;
const ANIMATED = {
    [START_INDEX]: true,
    [START_INDEX + DISTANCE]: true,
    [END_INDEX]: true,
};
const DURATION = 1200;
const DELAY = 800;
const standard = {
    stroke: colors.screenGray,
    fill: "transparent",
};
const outline = {
    stroke: colors.purpleScreen,
};
const full = {
    fill: colors.purpleScreen,
    stroke: colors.purpleScreen,
};
function pathStyle(index) {
    const internalIndex = (index - START_INDEX) / DISTANCE;
    return {
        animationDelay: `${DELAY + DURATION * internalIndex * 1.5}ms`,
        animationKeyframes: [
            {
                "0%": standard,
                "50%": outline,
                "100%": index === END_INDEX ? full : standard,
            },
        ],
    };
}
const styles = StyleSheet.create({
    base: {
        fill: "transparent",
    },
    animationBase: {
        animationFillMode: "both",
        animationDuration: `${DURATION}ms`,
        animationIterationCount: 1,
        animationTimingFunction: "ease-in",
    },
});
//# sourceMappingURL=QuarterCircle.jsx.map