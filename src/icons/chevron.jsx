import * as React from "react";
export var Direction;
(function (Direction) {
    Direction[Direction["right"] = 0] = "right";
    Direction[Direction["down"] = 90] = "down";
    Direction[Direction["left"] = 180] = "left";
    Direction[Direction["up"] = 270] = "up";
})(Direction || (Direction = {}));
export default class Chevron extends React.PureComponent {
    static defaultProps = {
        size: 14,
        direction: Direction.right,
    };
    render() {
        return (<svg width={this.props.size} height={this.props.size} viewBox="0 0 8 12" fill="none" transform={`rotate(${this.props.direction})`}>
        <path opacity={this.props.opacity || 1} fillRule="evenodd" clipRule="evenodd" d="M1.19997 0L1.13249e-05 1.19996L4.80011 6.00006L0 10.8002L1.19996 12.0001L7.19977 6.00032L7.19953 6.00007L7.19979 5.99981L1.19997 0Z" fill={this.props.color}/>
      </svg>);
    }
}
//# sourceMappingURL=chevron.jsx.map