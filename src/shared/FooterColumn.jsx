import * as React from 'react';
import { StyleSheet } from "react-native";
import Button, { BTN } from 'src/shared/Button.3';
import { fonts as oldFonts, textStyles } from "src/styles";
import { css } from "@emotion/react";
import { WHEN_MOBILE, fonts, whiteText } from "src/estyles";
export default React.memo(function FooterColumn({ heading, links, className, darkMode }) {
    return (<div css={rootStyle} className={className}>
      <h6 css={css(headingStyle, darkMode && whiteText)}>
        {heading}
      </h6>
      {links.map(({ name, link, icon }) => (<div css={linkContainerCss} key={link}>
          <Button target="_blank" iconLeft={icon} kind={BTN.INLINE} text={name} href={link} style={[styles.link, oldFonts.legal, darkMode && textStyles.invert]}/>
        </div>))}
    </div>);
});
const rootStyle = css({
    paddingLeft: 25,
    paddingRight: 25,
    [WHEN_MOBILE]: {
        marginTop: 35,
        width: "50%",
        paddingLeft: 10,
        paddingRight: 10,
    },
});
const linkContainerCss = css({
    marginTop: 8,
    marginBottom: 8,
});
const headingStyle = css(fonts.h6, {
    marginBottom: 20,
});
const styles = StyleSheet.create({
    link: {
        textDecorationLine: "none",
        display: "inline-flex",
        alignItems: "center",
    },
});
//# sourceMappingURL=FooterColumn.jsx.map