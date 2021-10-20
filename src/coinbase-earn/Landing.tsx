import * as React from "react"
import Cover from "src/coinbase-earn/Cover"
import learnLogo from "src/coinbase-earn/Learn_Light.png"
import lesson1Image from "src/coinbase-earn/lesson1.jpg"
import lesson2Image from "src/coinbase-earn/lesson2.jpg"
import lesson3Image from "src/coinbase-earn/lesson3.jpg"
import OpenGraph from "src/header/OpenGraph"
import { Adventure } from "src/home/Adventure"
import { NameSpaces, useTranslation } from "src/i18n"
import nonProfitIMG from "src/icons/non-profit-light-bg.png"
import sendToPhoneImg from "src/icons/sent-to-phone_light-bg.png"
import valora from "src/icons/valora-icon.png"
import { Cell, GridRow, Spans } from "src/layout/Grid2"
import { useScreenSize } from "src/layout/ScreenSize"
import AspectRatio from "src/shared/AspectRatio"
import pagePaths from "src/shared/menu-items"
import {
  fonts,
  standardStyles,
  textStyles,
  WHEN_DESKTOP,
  WHEN_MOBILE,
  WHEN_TABLET,
  WHEN_TABLET_AND_UP,
} from "src/estyles"
import { colors } from "src/colors"
import { css } from "@emotion/react"
import Image from "next/image"

const subTitleCss = css(fonts.h4, {
  [WHEN_TABLET_AND_UP]: css(textStyles.center, standardStyles.elementalMarginBottom),
})

const mainTitleCss = css(fonts.h1, {
  [WHEN_MOBILE]: { marginTop: 5 },
  [WHEN_TABLET_AND_UP]: css(textStyles.center, standardStyles.elementalMarginBottom),
})

export default function Landing() {
  const [t] = useTranslation(NameSpaces.cbe)
  const { isMobile } = useScreenSize()
  return (
    <div css={rootCss}>
      <OpenGraph title={t("pageTitle")} description={t("description")} path={pagePaths.CBE.link} />
      <Cover />
      <GridRow columns={1} css={titleAreaCss}>
        <h4 css={subTitleCss}>{t("subTitle")}</h4>
        <h1 css={mainTitleCss}>{t("mainTitle")}</h1>
      </GridRow>
      <GridRow columns={3} css={adventureAreaCss}>
        <Adventure
          source={sendToPhoneImg}
          title={t("adventure1.title")}
          text={t("adventure1.text")}
          link={{ href: "https://valoraapp.co/3j0mTjS", text: t("adventure1.link") }}
        />
        <Adventure
          source={nonProfitIMG}
          title={t("adventure2.title")}
          text={t("adventure2.text")}
          link={{ href: "https://valoraapp.co/3l5XLtC", text: t("adventure2.link") }}
        />
        <Adventure
          source={valora}
          title={t("adventure3.title")}
          text={t("adventure3.text")}
          link={{ href: "https://valoraapp.com", text: t("adventure3.link") }}
          imageCss={valoraCss}
        />
      </GridRow>
      <GridRow columns={1} css={standardStyles.elementalMarginBottom}>
        <Cell span={Spans.one} css={!isMobile && standardStyles.centered}>
          <Image src={learnLogo} css={logoCss} width={239} height={77} />
          <h4 css={fonts.h4}>{t("sequenceTitle")}</h4>
        </Cell>
      </GridRow>
      <GridRow columns={3}>
        <ContentPreview
          title={t("lesson1")}
          time={t("minutes", { count: 3 })}
          href={"https://coinbase.com/earn/celo/lesson/1"}
          src={lesson1Image}
        />
        <ContentPreview
          title={t("lesson2")}
          time={t("minutes", { count: 2 })}
          href={"https://coinbase.com/earn/celo/lesson/2"}
          src={lesson2Image}
        />
        <ContentPreview
          title={t("lesson3")}
          time={t("minutes", { count: 3 })}
          href={"https://coinbase.com/earn/celo/lesson/3"}
          src={lesson3Image}
        />
      </GridRow>
    </div>
  )
}

interface ContentPreviewProps {
  title: string
  time: string
  href: string
  src: StaticImageData
}

function ContentPreview({ title, time, href, src }: ContentPreviewProps) {
  return (
    <Cell span={Spans.one}>
      <a href={href} target={"_blank"} rel="noreferrer">
        <AspectRatio ratio={612 / 343} style={{ marginBottom: 15 }}>
          <img css={standardStyles.image} src={src.src} />
        </AspectRatio>
      </a>
      <a target="_blank" rel="noopenner noreferrer" href={href} css={fonts.h6}>
        {title}
      </a>
      <h6 css={minutesCss}>{time}</h6>
    </Cell>
  )
}

const adventureAreaCss = css({
  [WHEN_DESKTOP]: standardStyles.blockMargin,
  [WHEN_TABLET]: standardStyles.blockMarginBottomTablet,
  [WHEN_MOBILE]: standardStyles.blockMarginBottomMobile,
})

const titleAreaCss = css(standardStyles.centered, {
  [WHEN_DESKTOP]: standardStyles.blockMarginTop,
  [WHEN_TABLET]: standardStyles.blockMarginTopTablet,
  [WHEN_MOBILE]: standardStyles.elementalMarginTop,
})

const rootCss = css({
  alignItems: "center",
})

const logoCss = css({ width: 239, height: 77 })

const valoraCss = css({
  height: 70,
  width: 70,
  [WHEN_DESKTOP]: { marginTop: 30, height: 70, width: 70 },
})

const minutesCss = css(fonts.h6, { color: colors.grayHeavy, marginTop: 2 })
