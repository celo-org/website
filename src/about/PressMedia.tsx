import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import BookLayout from "src/layout/BookLayout"
import Button, { BTN } from "src/shared/Button.4"
import { fonts } from "src/estyles"
import { css } from "@emotion/react"

export default withNamespaces(NameSpaces.about)(function PressAndMedia({ t }: I18nProps) {
  return (
    <BookLayout label={t("Press and Media")} endBlock={true}>
      <span css={[fonts.body, press]}>
        {t("pressText")}{" "}
        <Button kind={BTN.INLINE} text={"press@celo.org"} href="mailto:press@celo.org" />.
      </span>
    </BookLayout>
  )
})

const press = css({
  a: fonts.body,
})
