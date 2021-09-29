import * as React from "react";
import { G, Path } from "src/shared/svg";
import { colors } from "src/styles";
export default class HollowCoin extends React.PureComponent {
    static defaultProps = { color: colors.primary };
    render() {
        const { size, color } = this.props;
        const isSmall = size < 20;
        return (<svg width={size * 0.88} height={size} viewBox={isSmall ? "0 0 12 15" : "0 0 88 100"} fill="none">
        <G style={{ mixBlendMode: "normal" }}>
          {isSmall ? (<Path d="M0.694644 8.03832L0.694854 8.03733C1.11106 6.0762 2.01314 4.31934 3.15316 2.97222C4.29262 1.62577 5.67668 0.756708 6.97518 0.535182L6.99246 0.532234L7.00949 0.528084C7.08947 0.50859 7.14342 0.507067 7.2886 0.507067H7.30252L7.31641 0.506293C8.43398 0.444037 9.44602 0.844847 10.2113 1.6515C11.3029 2.84313 11.7636 4.74522 11.3503 6.96114L11.3497 6.96425C11.0041 8.88501 10.1393 10.6528 8.99112 11.9944C7.84052 13.3387 6.43203 14.226 5.00847 14.4498C3.7403 14.6396 2.60967 14.2904 1.79643 13.4367L1.79645 13.4366L1.79296 13.433C0.645198 12.252 0.211033 10.2946 0.694644 8.03832Z" strokeWidth="1" stroke={color}/>) : (<Path d="M5.05541 46.8176L5.05519 46.8182C-0.0716798 61.7215 0.691052 76.1547 7.38233 86.3371C12.0282 93.4733 19.3353 97.8371 27.9214 98.6172C28.7591 98.6999 29.6324 98.7404 30.683 98.7404C40.457 98.7404 51.0909 94.0999 60.6551 85.8269C70.2531 77.5534 78.1624 66.1433 82.9433 53.6829L82.9438 53.6814C88.7689 38.424 88.1489 23.7157 80.9633 13.4331C75.6706 5.85078 67.3704 1.68823 57.6557 1.68823C46.9978 1.68823 36.0457 6.59958 26.6862 14.6547C17.3193 22.7162 9.48183 33.979 5.05541 46.8176Z" stroke={color} strokeWidth="2"/>)}
        </G>
      </svg>);
    }
}
//# sourceMappingURL=HollowOval.jsx.map