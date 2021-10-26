import * as React from "react"
import FullCircle from "src/community/connect/FullCircle"
import OpenGraph from "src/header/OpenGraph"
import LogoCombinedColor from "src/logos/LogoDarkBg"
import { colors } from "src/colors"
import preview from "src/community/connect/preview.jpg"
import { css } from "@emotion/react"
export default class CommunityDemo extends React.PureComponent {
  render() {
    return (
      <>
        <OpenGraph
          path="/animation/community"
          title={"Celo Community Animation Demo"}
          description={"Rising Coins"}
          image={preview.src}
        />
        <div css={fullScreen}>
          <FullCircle lightBackground={false} />
          <div css={logo}>
            <a href={"/"}>
              <LogoCombinedColor height={40} />
            </a>
          </div>
        </div>
      </>
    )
  }
}

const fullScreen = css({
    width: "100vw",
    height: "100vh",
    minWidth: "100%",
    backgroundColor: colors.dark,
    justifyContent: "space-evenly",
    alignItems: "center",
    paddingTop: "5vh",
    paddingHorizontal: "2vw",
    paddingBottom: "0",
  })
const logo = css({ marginVertical: "5vh"})
