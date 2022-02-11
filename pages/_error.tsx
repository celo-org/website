import { css } from "@emotion/react"
import * as React from "react"
import Rise from "src/join/Rise"
import Button, { BTN, SIZE } from "src/shared/Button.4"
import { fonts, standardStyles, textStyles } from "src/estyles"
import { colors } from "src/colors"

export default class Error extends React.PureComponent {
  render() {
    return (
      <div>
        <Rise willFall={true} />
        <div css={container}>
          <div css={[error, background]}>
            <h1 css={[fonts.h1, superLarge, textStyles.center, background]}>404</h1>
            <p css={[fonts.h4, textStyles.center, standardStyles.blockMarginBottomTablet]}>
              We can't find the page you are looking for
            </p>
            <Button text={"Go Home"} kind={BTN.PRIMARY} href="/" align={"center"} size={SIZE.big} />
          </div>
        </div>
      </div>
    )
  }
}

const container = css({
  width: "100%",
  height: "100%",
  maxWidth: "100vw",
  maxHeight: "100vh",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "3%",
  display: "flex",
})

const background = css({
  backgroundColor: colors.white,
  borderRadius: 50,
  boxShadow: `0 0 5px 10px ${colors.white}`,
})

const superLarge = css({
  fontSize: "120px",
  lineHeight: "120px",
})

const error = css({
  alignSelf: "center",
  justifyContent: "center",
})
