import * as React from "react";
export default React.memo(function Download({ color, size }) {
    return (<svg width={size} height={size} viewBox="0 0 10 13" fill="none">
      <path d="M0 12H10" stroke={color} strokeWidth="1.5"/>
      <path d="M5 0V9" stroke={color} strokeWidth="1.5"/>
      <path d="M1 5L5 9L9 5" stroke={color} strokeWidth="1.5"/>
    </svg>);
});
//# sourceMappingURL=Download.jsx.map