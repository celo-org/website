import * as React from "react";
import { StyleSheet } from "react-native-web";
import shuffleSeed from "shuffle-seed";
import VECTORS from "src/community/connect/RingOfCoinVectors";
import { Path } from "src/shared/svg";
import { baseCoinStyle, baseCoinStyleLight, colors } from "src/styles";
import { randomIntegerInRange } from "src/utils/utils";
const COLORS = [colors.greenScreen, colors.blueScreen, colors.redScreen, colors.purpleScreen];
const STILL_COLORS = [colors.lightBlue, colors.redScreen, colors.purple, colors.greenScreen];
const DURATION_MS = 1700;
const PAUSE = 200;
const SPACE_BETWEEN = 4;
const PRELIMINARY = 20;
const PEAK = 60;
const BEAT_COUNT = 4;
const MAX_DISTANCE = VECTORS.length - 1;
const JUMP_THIRD = Math.floor(MAX_DISTANCE / 3);
const JUMP_HALF = Math.floor(MAX_DISTANCE / 2);
const WAIT_TO_PLAY_MS = 400;
export default class FullCircle extends React.PureComponent {
    clock;
    state = {
        lastPlayingIndex: randomIntegerInRange(0, VECTORS.length - 1),
        playingIndexes: new Set(),
        beatCycleIndex: 0,
        duration: DURATION_MS,
        color: colors.greenScreen,
    };
    componentDidMount = () => {
        if (!this.props.stillMode) {
            if (this.props.init) {
                this.props.init();
            }
            this.clock = setTimeout(() => this.setPlaying(), WAIT_TO_PLAY_MS);
        }
        else {
            this.setStill();
        }
    };
    componentWillUnmount = () => {
        clearTimeout(this.clock);
    };
    setStill = () => {
        this.setState(() => {
            const nextRingIndex = 50;
            return {
                playingIndexes: new Set(getTogetherIndexes(nextRingIndex)),
                beatCycleIndex: 0,
                lastPlayingIndex: nextRingIndex,
                duration: 1000000,
                color: pickRandom(COLORS),
            };
        });
    };
    setPlaying = () => {
        this.setState(setFrame);
        this.clock = setTimeout(this.setPlaying, this.state.duration + PAUSE);
    };
    getColor = (colorArray, colorIndex) => {
        return isTogetherBeat(this.state.beatCycleIndex) ? colorArray[colorIndex] : this.state.color;
    };
    render() {
        let colorIndex = -1;
        const colorArray = this.props.stillMode
            ? STILL_COLORS
            : shuffleSeed.shuffle(COLORS, this.state.lastPlayingIndex);
        return (<svg width="100%" height="100%" viewBox="0 0 717 750" fill="none">
        {VECTORS.map((path, index) => {
                const playing = this.state.playingIndexes.has(index);
                if (playing) {
                    colorIndex++;
                }
                const style = ringStyle({
                    color: playing ? this.getColor(colorArray, colorIndex) : "transparent",
                    duration: this.state.duration,
                    lightBackground: this.props.lightBackground,
                    playing,
                    stillMode: this.props.stillMode,
                });
                return <Path key={path} d={path} style={style}/>;
            })}
      </svg>);
    }
}
function setFrame(state) {
    const lastPlayingIndex = state.lastPlayingIndex;
    const beatCycleIndex = state.beatCycleIndex + 1;
    const isNowTogetherBeat = isTogetherBeat(beatCycleIndex);
    const nextRingIndex = nextSoloIndex(lastPlayingIndex, isNowTogetherBeat);
    const nextRingIndexes = isNowTogetherBeat ? getTogetherIndexes(nextRingIndex) : [nextRingIndex];
    let newColor = !isNowTogetherBeat ? pickRandom(COLORS) : state.color;
    while (!isNowTogetherBeat && newColor === state.color) {
        newColor = pickRandom(COLORS);
    }
    return {
        playingIndexes: new Set(nextRingIndexes),
        beatCycleIndex,
        lastPlayingIndex: nextRingIndex,
        duration: isNowTogetherBeat ? DURATION_MS * 2 : DURATION_MS,
        color: newColor,
    };
}
function pickRandom(array) {
    return array[randomIntegerInRange(0, array.length - 1)] || pickRandom(array);
}
function getKeyframes({ color }) {
    const fullOn = {
        opacity: 0.95,
        fill: color,
        stroke: color,
    };
    const strokeFull = {
        stroke: color,
    };
    const normal = {
        stroke: colors.screenGray,
        fill: "transparent",
    };
    return [
        {
            "0%": normal,
            [`${PRELIMINARY}%`]: strokeFull,
            [`${PEAK}%`]: fullOn,
            "100%": normal,
        },
    ];
}
const SOLO_JUMP_DISTANCES = [
    -JUMP_THIRD + 5,
    JUMP_THIRD + SPACE_BETWEEN,
    JUMP_HALF + 3,
    JUMP_HALF + JUMP_THIRD - 7,
    -(JUMP_HALF + JUMP_THIRD),
];
const TOGETHER_JUMP_DISTANCES = [JUMP_HALF, JUMP_THIRD + SPACE_BETWEEN * 2];
function nextSoloIndex(last, isTogether) {
    const possibleDistancesToNextIndex = isTogether ? TOGETHER_JUMP_DISTANCES : SOLO_JUMP_DISTANCES;
    let nextIndex = last + pickRandom(possibleDistancesToNextIndex);
    if (nextIndex > MAX_DISTANCE) {
        nextIndex = nextIndex - MAX_DISTANCE;
    }
    if (nextIndex < 0) {
        nextIndex = nextIndex + MAX_DISTANCE - 1;
    }
    return nextIndex;
}
function getTogetherIndexes(initial) {
    let base = initial;
    if (base + SPACE_BETWEEN * 2 > VECTORS.length - 1) {
        base = initial - SPACE_BETWEEN * 2;
    }
    else if (base - SPACE_BETWEEN < 0) {
        base = base + SPACE_BETWEEN;
    }
    return [base - SPACE_BETWEEN, base, base + SPACE_BETWEEN, base + SPACE_BETWEEN * 2];
}
function isTogetherBeat(beat) {
    return beat % BEAT_COUNT === 0;
}
function ringStyle({ color, playing, duration, lightBackground, stillMode }) {
    const styleArray = [
        styles.normal,
        stillMode
            ? { stroke: "#CFCFCF", mixBlendMode: "multiply" }
            : lightBackground
                ? baseCoinStyleLight
                : baseCoinStyle,
    ];
    if (stillMode && playing) {
        styleArray.push({
            opacity: 0.9,
            fill: color,
            stroke: color,
            mixBlendMode: "multiply",
        });
    }
    else if (playing) {
        styleArray.push(styles.animatedBase, {
            animationDuration: `${duration}ms`,
            animationKeyframes: getKeyframes({ color }),
        });
    }
    return styleArray;
}
const styles = StyleSheet.create({
    animatedBase: {
        animationIterationCount: 1,
        animationTimingFunction: "ease-in",
        willChange: "fill",
    },
});
//# sourceMappingURL=FullCircle.jsx.map