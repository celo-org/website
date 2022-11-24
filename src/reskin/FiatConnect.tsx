import * as React from "react"
import { css } from "@emotion/react"
import { colors } from "src/colors"
import { flex, WHEN_MOBILE } from "../estyles"
import FiatConnectLogo from "../logos/FiatConnectLogo"
import { GridRowContentType } from "../utils/contentful"
import { cellSwitch } from "../public-sector/cellSwitch"

interface Props {
  gridFields: GridRowContentType
}

export function FiatConnect(props: Props) {
  const { gridFields } = props
  console.log(gridFields)
  return (
    <div css={mainCss}>
      <div css={wrapperCss}>
        <div css={contentCss}>
          {gridFields.cells?.map((cell) =>
            cellSwitch(cell, gridFields.darkMode, gridFields.columns)
          )}
        </div>
        <div css={fiatLogoCss}>
          <FiatConnectLogo />
        </div>
        <div css={backgroundPixel({ top: 0, right: 0 })}></div>
        <div css={backgroundPixel({ bottom: 0, left: 0 })}></div>
      </div>
    </div>
  )
}

const mainCss = css(flex, {
  position: "relative",
  flexDirection: "row",
  backgroundColor: colors.fig,
  justifyContent: "center",
  [WHEN_MOBILE]: {
    flexDirection: "column",
  },
})

const wrapperCss = css(flex, {
  flexDirection: "row",
  alignItems: "center",
  [WHEN_MOBILE]: {
    flexDirection: "column",
  },
})

const contentCss = css(flex, {
  paddingLeft: 104,
  paddingTop: 104,
  paddingBottom: 104,
  flex: 1,
  [WHEN_MOBILE]: {
    alignItems: "flex-start",
    padding: "118.5px 32px 90px 32px",
  },
})

const fiatLogoCss = css(flex, {
  flex: 1,
  alignItems: "center",
  [WHEN_MOBILE]: {
    marginBottom: 118.5,
  },
})

const backgroundPixel = (options, backgroundColor = colors.baseTan) => {
  return css({
    [WHEN_MOBILE]: {
      width: 86,
      height: 86,
      backgroundColor,
      border: `1px solid ${backgroundColor}`,
      position: "absolute",
      ...options,
    },
  })
}
