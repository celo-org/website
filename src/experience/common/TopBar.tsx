import * as React from "react"
import Hamburger from "src/header/Hamburger"
import { css } from "@emotion/react"
import { useBooleanToggle } from "src/hooks/useBooleanToggle"
import { useScreenSize } from "src/layout/ScreenSize"
import LogoLightBg from "src/logos/LogoLightBg"
import RingsGlyph from "src/logos/RingsGlyph"
import links from "src/shared/menu-items"
import MobileMenu from "src/shared/MobileMenu"
import Navigation, { NavigationTheme } from "src/shared/Navigation"
import { flex, flexRow, fonts, standardStyles, WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles"
import { colors } from "src/colors"
import { useRouter } from "next/router"
interface Props {
  current: string
  kitName?: string
}

const KITS = [links.BRAND, links.EVENTS_KIT, links.GRANT_KIT, links.MERCHANTS]

export default function TopBar({ current, kitName }: Props) {
  const { isMobile } = useScreenSize()
  const router = useRouter()
  const [showingKits, toggleKits] = useBooleanToggle()

  React.useEffect(() => {
    function close() {
      if (showingKits) {
        toggleKits()
      }
    }
    router?.events?.on("routeChangeComplete", close)

    return () => {
      router?.events?.off("routeChangeComplete", close)
    }
  }, [router, showingKits, toggleKits])

  return (
    <div css={rootCss}>
      <div css={containerCss}>
        <div css={rowVerticalCenterCss}>
          <a href={links.HOME.link} css={touchableRowCss}>
            {isMobile ? <RingsGlyph height={30} /> : <LogoLightBg height={30} />}
          </a>
          <a href={current} css={css(kitBrandCss, touchableRowCss)}>
            <p css={titleCss}>{kitName}</p>
          </a>
        </div>
        <div css={rowVerticalCenterCss}>
          {isMobile ? (
            <Hamburger
              onPress={toggleKits}
              isOpen={showingKits}
              color={colors.dark}
              css={hamburgerCss}
            />
          ) : (
            <div css={kitsCss}>
              <Kits current={current} />
            </div>
          )}
          {showingKits && (
            <div css={kitsMobileShownCss}>
              <MobileMenu currentPage={current} menu={KITS} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

const Kits = React.memo(({ current }: { current: string }) => {
  const { isTablet } = useScreenSize()
  const displayedKits = isTablet ? KITS.filter((kit) => kit.link !== current) : KITS
  return (
    <>
      {displayedKits.map((kit) => {
        return (
          <Navigation
            key={kit.link}
            style={navLinkStyle}
            text={kit.name}
            link={kit.link}
            selected={kit.link === current}
            theme={NavigationTheme.LIGHT}
          />
        )
      })}
    </>
  )
})

const rootCss = css(flex, standardStyles.centered)

const hamburgerCss = css({
  margin: 0,
  zIndex: 100,
  [WHEN_TABLET_AND_UP]: {
    display: "none",
  },
})

const touchAbleCss = css({
  opacity: 1,
  transitionDuration: "250ms",
  transitionProperty: "opacity",
  "&:active, &:focus": {
    opacity: 0.85,
  },
})

const titleCss = css(fonts.h3, {
  marginLeft: 15,
  lineHeight: "initial", // fixes the vertical alignment
})
const containerCss = css(flexRow, {
  maxWidth: 1600,
  backgroundColor: colors.white,
  justifyContent: "space-between",
  padding: 20,
  alignItems: "center",
  width: "100%",
  flex: 1,
  [WHEN_MOBILE]: {
    padding: "10px 15px",
  },
})

const rowVerticalCenterCss = css(flexRow, {
  alignContent: "center",
})

const touchableRowCss = css(touchAbleCss, rowVerticalCenterCss)
const kitsCss = css(flexRow, {
  alignItems: "center",
  margin: "0px 30px",
})
const kitsMobileShownCss = css({
  zIndex: 10,
  position: "fixed",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  padding: "20px 0px",
  borderWidth: 1,
  width: "100%",
  backgroundColor: colors.white,
  justifyContent: "space-around",
})
const navLinkStyle = {
  marginBottom: 0,
  marginHorizontal: 15,
}

const kitBrandCss = css({
  textDecoration: "none",
})
