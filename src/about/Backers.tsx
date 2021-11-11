import * as React from "react"
import backerList from "src/about/backers/backers"
import { I18nProps, withNamespaces } from "src/i18n"
import BookLayout from "src/layout/BookLayout"
import { ScreenProps, withScreenSize } from "src/layout/ScreenSize"
import { hashNav } from "src/shared/menu-items"
import { GridRow } from "src/layout/Grid2"
import { textStyles } from "src/styles"
import { fonts, standardStyles, WHEN_DESKTOP, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
import { css } from "@emotion/react"
export class Backers extends React.Component<I18nProps & ScreenProps> {
  render() {
    const { t } = this.props
    return (
      <>
        <BookLayout startBlock={true} label={t("celoBackers")} nativeID={hashNav.about.backers}>
          <span css={fonts.body}>{t("celoBackersText", { count: 80 })}</span>
        </BookLayout>
        <GridRow columns={4} css={row}>
          {backerList.map((backer) =>
            backer.photo ? (
              <img src={backer.photo} css={backerStyles} key={backer.name} />
            ) : (
              <h4 css={[fonts.h4, name, textStyles.center]} key={backer.name}>
                {backer.name}
              </h4>
            )
          )}
        </GridRow>
      </>
    )
  }
}

const backerStyles = css({
  height: "60px",
  objectFit: "contain",
  flexDirection: "column",
  marginTop: "30px",
  marginBottom: "30px",
  marginRight: "5px",
  marginLeft: "5px",
  width: "100%",
})

const row = css({
  display: "flex",
  justifyContent: "center",
  marginTop: "40px",
  [WHEN_DESKTOP]: standardStyles.sectionMarginBottom,
  [WHEN_TABLET]: standardStyles.sectionMarginBottomTablet,
  [WHEN_MOBILE]: standardStyles.sectionMarginBottomMobile,
})

const name = css({
  fontSize: "22px",
  textAlign: "center",
  marginTop: "35px",
  marginBottom: "35px",
})

export default withScreenSize(withNamespaces("about")(Backers))
