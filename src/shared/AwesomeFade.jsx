import { keyframes } from "@emotion/react";
import * as React from "react";
import Reveal from "react-awesome-reveal";
export var Direction;
(function (Direction) {
    Direction[Direction["X"] = 0] = "X";
    Direction[Direction["Y"] = 1] = "Y";
})(Direction || (Direction = {}));
export default React.memo(function AwesomeFade({ children, reverse, delay, distance, direction, duration, fraction, }) {
    return (<Reveal keyframes={React.useMemo(() => getKeyFrames(distance, direction, reverse), [direction, distance, reverse])} triggerOnce={false} delay={delay} duration={duration} fraction={fraction}>
      {children}
    </Reveal>);
});
function getKeyFrames(distance, direction, reverse) {
    let from = `translate3d(0, ${distance}, 0)`;
    if (direction === Direction.X) {
        from = `translate3d(${distance}, 0, 0)`;
    }
    const to = `translate3d(0, 0, 0)`;
    return keyframes `
      from {
        opacity: ${+reverse};
        transform: ${reverse ? to : from};
      } to {
        opacity: ${+!reverse};
        transform: ${reverse ? from : to};
      }
  `;
}
//# sourceMappingURL=AwesomeFade.jsx.map