import { css, keyframes } from "@emotion/react"
import CoverContent from "src/home/CoverContent"
import { colors } from "src/styles"
import celoAsStarsMobileLong from "src/home/celo-sky-mobile.svg"
import celoAsStarsMobileShort from "src/home/celo-sky-mobile-short.svg"
import celoAsStarsTablet from "src/home/celo-sky-tablet.svg"
import celoAsStarsDesktop from "src/home/celo-sky-desktop.svg"
import * as React from "react"
import examplePhones from "src/home/example-phones.svg"
import Stats from "./stats/Stats"
import { flex, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET, WHEN_LONG_PHONE } from "src/estyles"
import { useScreenSize } from "src/layout/ScreenSize"
import { NameSpaces, useTranslation } from "src/i18n"
import Press from "src/press/Press"
import { Document } from "@contentful/rich-text-types"
import { LogoGallery } from "src/utils/contentful"

interface Props {
  title: string
  subtitle: Document
  press: LogoGallery
}

export default function Cover(props: Props) {
  const { isDesktop, isTablet, bannerHeight } = useScreenSize()
  const { t } = useTranslation(NameSpaces.home)
  return (
    <div
      css={css(rootCss, {
        paddingTop: bannerHeight,
        [WHEN_MOBILE]: {
          paddingTop: 0,
        },
      })}
    >
      <div css={css(backgroundArea, { height: `calc(100% - ${bannerHeight}px)` })} />
      <div css={useableArea}>
        <CoverContent title={props.title} subtitle={props.subtitle} />
        {(isDesktop || isTablet) && (
          <picture>
            <object
              title={t("coverPhonesImage")}
              aria-label={t("coverPhonesImage")}
              type="image/svg+xml"
              data={examplePhones.src}
              width={1016}
              height={524}
            />
          </picture>
        )}
      </div>
      <Press {...props.press} />

      {isDesktop && <Stats />}
    </div>
  )
}
const backgroundDesktopSize = { width: "100%" }

const rootCss = css(flex, {
  overflow: "hidden",
  position: "relative",
  alignSelf: "center",
  alignItems: "center",
  backgroundColor: colors.dark,
  width: "100%",
  maxWidth: "100vw",
  [WHEN_MOBILE]: {
    justifyContent: "center",
    minHeight: `calc(100vh)`,
  },
  ["@media (max-height: 568px)"]: {
    justifyContent: "flex-end",
    paddingBottom: 30,
  },
  [WHEN_TABLET]: {
    paddingTop: 60,
    width: "100vw",
    height: "100vh",
    minHeight: 1068,
  },
  [WHEN_DESKTOP]: {
    paddingTop: 0,
    paddingBottom: 24,
  },
})

const starKeyFrames = keyframes`
  from {
    opacity: 0.1;
    transform: scale(1.02);
  }

  25% {
    opacity: 0.5
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
`
const backgroundArea = css({
  top: 0,
  position: "absolute",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  animationIterationCount: 1,
  animationFillMode: "both",
  animationDelay: "50ms",
  animationDuration: "6s",
  animationName: starKeyFrames,
  animationTimingFunction: "ease-in-out",
  opacity: 0.1,
  width: "100%",
  backgroundColor: colors.dark,
  [WHEN_LONG_PHONE]: {
    backgroundImage: `url(${celoAsStarsMobileLong.src})`,
    top: 0,
    minHeight: "100vh",
  },
  [WHEN_MOBILE]: {
    backgroundImage: `url(${celoAsStarsMobileShort.src})`,
    top: 0,
    minHeight: "100vh",
  },
  [WHEN_TABLET]: {
    width: "100vw",
    minHeight: "100vh",
    backgroundImage: `url(${celoAsStarsTablet.src})`,
    backgroundPosition: "bottom",
    top: 0,
  },
  [WHEN_DESKTOP]: {
    width: backgroundDesktopSize.width,
    backgroundImage: `url(${celoAsStarsDesktop.src})`,
  },
})

const useableArea = css(flex, {
  alignItems: "center",
  zIndex: 10,
  [WHEN_DESKTOP]: {
    width: backgroundDesktopSize.width,
    zIndex: 20,
    paddingTop: 48,
  },
  [WHEN_TABLET]: {
    paddingTop: 72,
  },
  [WHEN_MOBILE]: {
    paddingTop: 16,
    paddingBottom: 16,
  },
})
