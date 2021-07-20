import { css } from "@emotion/react"
import * as React from "react"
import { flex, flexRow, gridRow, WHEN_MOBILE, WHEN_TABLET_AND_UP } from "src/estyles"
import { useTranslation } from "src/i18n"
import Button, { BTN, SIZE } from "src/shared/Button.3"
import MENU from "src/shared/menu-items"
import { colors } from "src/styles"
import { GridRow } from "src/layout/Grid2"
import { LogoGallery } from "src/utils/contentful"

export default function Press(props: LogoGallery) {
  const { t } = useTranslation("home")
  return (
    <div css={backgroundCss}>
      <GridRow columns={1} css={containercss}>
        <div css={logoContainerCss}>
          {props.list?.map(({ sys, fields }) => {
            const file = fields?.image?.fields?.file
            const sizes = file?.details?.image
            const ratio = sizes.width / sizes.height
            return (
              <a key={sys.id} href={fields.url} target={"_blank"} rel="noopener">
                <picture>
                  <source srcSet={`${file?.url}?fm=webp 2x`} type="image/webp" />
                  <source srcSet={`${file?.url} 2x`} />
                  <source srcSet={`${file?.url}?fm=webp&h=24`} type="image/webp" />
                  <img
                    alt={fields.image?.fields?.description}
                    loading={"lazy"}
                    height={24}
                    width={24 * ratio}
                    css={css(logoCss)}
                    src={file?.url}
                  />
                </picture>
              </a>
            )
          })}
        </div>
        <div css={links}>
          <Button
            text={t("recentNews")}
            kind={BTN.NAKED}
            size={SIZE.normal}
            href={MENU.PRESS.link}
            align={"center"}
          />
        </div>
      </GridRow>
    </div>
  )
}

const backgroundCss = css(flex, {
  [WHEN_MOBILE]: {
    opacity: 0.9,
    paddingTop: 16,
    paddingBottom: 40,
    backgroundColor: colors.darkTransparent,
    zIndex: 10,
    boxShadow: `-1px 5px 22px 7px ${colors.darkTransparent}`,
  },
  [WHEN_TABLET_AND_UP]: {
    width: "100%",
    backgroundColor: colors.dark,
    background:
      "linear-gradient(180deg, rgba(46, 51, 56, 0.1) 1%, rgba(46, 51, 56, 0.6) 20%, #2E3338 48.13%)",
    zIndex: 20,
    opacity: 1,
    paddingTop: 60,
    paddingBottom: 60,
  },
})

const containercss = css({
  alignItems: "center",
  justifyContent: "center",
})

const links = css(flex, {
  paddingTop: 28,
})

const logoCss = css({
  objectFit: "contain",
  marginTop: 8,
  marginBottom: 8,
  marginLeft: "5vw",
  marginRight: "5vw",
  cursor: "pointer",
  [WHEN_TABLET_AND_UP]: {
    marginLeft: 20,
    marginRight: 20,
  },
  [WHEN_MOBILE]: {
    height: 20,
    width: 104,
    marginLeft: 12,
    marginRight: 12,
    marginTop: 12,
    marginBottom: 12,
  },
})

const logoContainerCss = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center",
  alignContent: "center",
  justifyContent: "center",
  [WHEN_MOBILE]: {
    display: "none",
  },
})

