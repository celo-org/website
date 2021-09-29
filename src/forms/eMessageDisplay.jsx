import { css } from "@emotion/react";
import * as React from "react";
import { fonts } from "src/estyles";
export default React.memo(({ children, isShowing, className }) => {
    return (<div css={isShowing ? containerCss : containerCollapsed}>
      <span aria-hidden={!isShowing} role="alert" className={className} css={isShowing ? showingText : hidingText}>
        {children}
      </span>
    </div>);
});
const cssText = css(fonts.h6, {
    display: "inline-block",
    transitionProperty: "opacity",
    transitionDuration: "700ms",
});
const showingText = css(cssText, {
    opacity: 100,
});
const hidingText = css(cssText, {
    opacity: 0,
});
const containerCss = css({
    marginTop: 8,
    marginBottom: 8,
    height: "auto",
    maxHeight: 80,
    transitionProperty: "max-height",
    transitionDuration: "600ms",
});
const containerCollapsed = css({
    maxHeight: 0,
});
//# sourceMappingURL=eMessageDisplay.jsx.map