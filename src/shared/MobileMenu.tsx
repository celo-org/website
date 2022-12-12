import { css } from "@emotion/react"
import * as React from "react"
import { flex, flexRow, fonts, gtAlpina, inter, WHEN_MOBILE } from "src/estyles"
import { NameSpaces, useTranslation } from "src/i18n"
import Button, { BTN } from "src/shared/Button.4"
import { MenuLink } from "src/shared/menu-items"
import { SquarePixel } from "../reskin/SquarePixel"
import { colors } from "../colors"
import useWindowDimension from "../hooks/useWindowDimension"
import Chevron from "../icons/chevron"
import ArrowRight from "../icons/ArrowRight"
import HubspotForm from "../contentful/grid2-cells/HubspotForm"
import { DESKTOP_BREAKPOINT, TABLET_BREAKPOINT } from "./Styles"

interface Props {
  currentPage: string
  menu: MenuLink[]
  isOpen?: boolean
}

export default function MobileMenu({ currentPage, menu, isOpen }: Props) {
  const { t } = useTranslation(NameSpaces.common)
  const squarePixelRotationOption = {
    transform: `rotateY(${isOpen ? "0deg" : "90deg"})`,
    transition: "width 400ms ease-out, transform 400ms ease-in",
    transitionDelay: isOpen ? "600ms" : "0ms",
  }
  const { width } = useWindowDimension()
  let squarePixelWidth
  if (width >= DESKTOP_BREAKPOINT) {
    squarePixelWidth = width / 8
  } else if (width < DESKTOP_BREAKPOINT && width > TABLET_BREAKPOINT) {
    squarePixelWidth = width / 3
  } else if (width <= TABLET_BREAKPOINT) {
    squarePixelWidth = width / 2
  }
  const squarePixelHeight = 260

  return (
    <div css={styles.root}>
      <div
        css={css(styles.menu, {
          opacity: isOpen ? 1 : 0,
          ...(width > TABLET_BREAKPOINT
            ? {
                paddingTop: isOpen ? 140 : 200,
                paddingLeft: 50,
              }
            : {
                paddingTop: 140,
                paddingLeft: isOpen ? 50 : 200,
              }),
          maxWidth: "100%",
          width: squarePixelWidth * 3,
          transition: `all 400ms ease-in-out ${isOpen ? "1000ms" : "0ms"}`,
        })}
      >
        {menu.map((item) => {
          const linkIsToCurrentPage = currentPage === item.link
          const btnKind = linkIsToCurrentPage ? BTN.TERTIARY : BTN.NAV

          return (
            <>
              <div key={item.name} css={styles.menuItem}>
                <Button
                  href={item.link}
                  text={t(item.name)}
                  kind={btnKind}
                  key={item.name}
                  align={"center"}
                  cssStyle={btnStyle}
                />
                <div css={chevronContainer}>
                  <Chevron color={colors.black} size={"0.75em"} />
                </div>
              </div>
            </>
          )
        })}
        <div css={emailCtaContainer}>
          <div css={emailCtaDetails}>
            <ArrowRight />
            <p css={emailCtaText}>{t("footerEmailText")}</p>
          </div>
          <HubspotForm hubspotFormId="b4dd2ae2-68e9-4662-bfd3-b2860162a5aa" />
        </div>
      </div>
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: 0,
          ...(width > 576
            ? { left: 0 }
            : { right: squarePixelWidth, ...squarePixelRotationOption }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight,
          ...(width > 576
            ? { left: 0, ...squarePixelRotationOption }
            : { right: squarePixelWidth }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight * 2,
          ...(width > 576 ? { left: 0 } : { right: squarePixelWidth }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight * 3,
          ...(width > 576 ? { left: 0 } : { right: squarePixelWidth }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: 0,
          ...(width > 576 ? { left: squarePixelWidth } : { right: 0 }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight,
          ...(width > 576 ? { left: squarePixelWidth } : { right: 0 }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight * 2,
          ...(width > 576
            ? { left: squarePixelWidth }
            : { right: 0, ...squarePixelRotationOption }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight * 3,
          ...(width > 576
            ? { left: squarePixelWidth, ...squarePixelRotationOption }
            : { right: 0 }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          ...(width > 576
            ? {
                top: 0,
                left: squarePixelWidth * 2,
              }
            : {
                top: squarePixelHeight * 4,
                right: squarePixelWidth,
              }),
          ...squarePixelRotationOption,
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          ...(width > 576
            ? {
                top: squarePixelHeight,
                left: squarePixelWidth * 2,
              }
            : {
                top: squarePixelHeight * 4,
                right: 0,
              }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight * 2,
          left: squarePixelWidth * 2,
          ...(width <= 576 && { display: "none" }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
      <SquarePixel
        width={isOpen ? squarePixelWidth : 0}
        height={squarePixelHeight}
        options={{
          top: squarePixelHeight * 3,
          left: squarePixelWidth * 2,
          ...(width <= 576 && { display: "none" }),
        }}
        backgroundColor={{ desktop: colors.primaryYellow }}
      />
    </div>
  )
}

const styles = {
  root: css(flex, {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
    flex: 1,
    paddingBottom: 30,
    paddingRight: 20,
    paddingLeft: 20,
  }),
  rings: css(flex, {
    paddingTop: 30,
    paddingBottom: 30,
    justifyContent: "center",
    alignItems: "center",
  }),
  menu: css(flex, {
    position: "absolute",
    left: 0,
    alignItems: "flex-start",
    zIndex: 888,
    paddingRight: 100,
    flexDirection: "column",
    justifyContent: "space-around",
    [WHEN_MOBILE]: {
      paddingRight: 50,
    },
  }),
  menuItem: css(flex, {
    flexDirection: "row",
    padding: "24px 0",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px solid ${colors.transparentGray}`,
    overflow: "hidden",
    "&:hover > div:last-child": {
      opacity: 1,
      marginRight: 0,
    },
  }),
}

const btnStyle = css(gtAlpina, {
  fontWeight: 200,
  fontSize: 32,
  alignItems: "center" as const,
})

const chevronContainer = css({
  border: `1px solid ${colors.transparentGray}`,
  padding: "17.5px 21px",
  borderRadius: 70,
  opacity: 0,
  marginRight: 50,
  transition: "all 400ms ease-in-out",
})

const emailCtaContainer = css({
  paddingTop: 44,
})

const emailCtaDetails = css(flexRow, {
  alignItems: "center",
  marginBottom: 22,
})

const emailCtaText = css(fonts.h3, inter, {
  marginLeft: 24,
})
