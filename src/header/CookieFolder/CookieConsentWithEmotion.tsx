import { css, keyframes } from "@emotion/react"
import { Trans, NameSpaces } from "src/i18n"
import { flex, WHEN_MOBILE, jost } from "src/estyles"
import { colors } from "src/colors"
import * as React from "react"

interface Props {
  onAgree: () => void
  onDisagree: () => void
}

export function CookieConsentWithEmotion({ onAgree, onDisagree }: Props) {
  return (
    <div css={cookieRoot}>
      <div css={container}>
        <div css={textDiv}>
          <p css={infoMessageTextPrefix}>
            <Trans ns={NameSpaces.common} i18nKey={"cookies.allowTrack"}>
              <a css={link} href={"/"} />
            </Trans>{" "}
            <br css={breakMobile} />
            <Trans ns={NameSpaces.common} i18nKey={"cookies.understandMore"}>
              <a css={link} href={"/terms"} />
            </Trans>
          </p>
        </div>
        <div css={cookieButtons}>
          <button css={singleButton} onClick={onDisagree}>
            <Trans ns={NameSpaces.common} i18nKey={"cookies.cookiesDisagree"} />
          </button>
          <button css={agreeButton} onClick={onAgree}>
            <Trans ns={NameSpaces.common} i18nKey={"cookies.cookiesAgree"} />
          </button>
        </div>
      </div>
    </div>
  )
}

const slideUp = keyframes`
    from {
        transform: translateY(100%);
        opacity: 0.5;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
`

const cookieRoot = css(flex, {
  bottom: 0,
  position: "fixed",
  backgroundColor: colors.navyBlue,
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 20,
  transitionProperty: "transform, opacity",
  animationDuration: "800ms",
  animationName: slideUp,
})

const container = css(flex, {
  width: "100%",
  maxWidth: 1080,
  padding: 12,
  justifyContent: "space-between",
  flexDirection: "row",
  alignItems: "center",
  [WHEN_MOBILE]: {
    flexDirection: "column",
  },
})

const breakMobile = css({
  [WHEN_MOBILE]: {
    display: "none",
  },
})

const cookieButtons = css(flex, {
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  paddingLeft: 16,
  paddingRight: 16,
  [WHEN_MOBILE]: {
    flexDirection: "column-reverse",
  },
})

const singleButton = css(flex, jost, {
  color: colors.white,
  backgroundColor: colors.navyBlue,
  border: colors.navyBlue,
  fontStyle: "normal",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  height: 34,
  width: 148,
  position: "static",
  fontWeight: 500,
  borderRadius: 6,
  cursor: "pointer",
})

const agreeButton = css(singleButton, {
  border: `2px solid ${colors.white}`,
})

const link = css({
  textDecorationLine: "underline",
  cursor: "pointer",
  color: colors.white,
})

const infoMessageTextPrefix = css(jost, {
  textAlign: "start",
  fontStyle: "normal",
  fontWeight: 500,
  fontSize: 14,
  color: colors.white,
  marginLeft: 16,
  [WHEN_MOBILE]: {
    textAlign: "center",
    marginLeft: 0,
  },
})

const textDiv = css(flex, {
  fontSize: 14,
  [WHEN_MOBILE]: {
    maxWidth: 350,
  },
})

export default CookieConsentWithEmotion
