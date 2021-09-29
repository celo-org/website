import * as React from "react";
import { colors } from "src/styles";
export var Direction;
(function (Direction) {
    Direction[Direction["down"] = 0] = "down";
    Direction[Direction["left"] = 90] = "left";
    Direction[Direction["up"] = 180] = "up";
})(Direction || (Direction = {}));
export default function Triangle({ direction = Direction.down, color = colors.dark }) {
    return (<svg width="14" height="14" viewBox="0 0 14 8" fill="none" transform={`rotate(${direction})`}>
      <title>triangle</title>
      <path fillRule="evenodd" clipRule="evenodd" d="M7 8L0 0H14L7 8Z" fill={color}/>
    </svg>);
}
//# sourceMappingURL=Triangle.jsx.map