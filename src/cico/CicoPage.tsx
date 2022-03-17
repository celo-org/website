import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"

function CicoPage(props: I18nProps) {
  console.log(props, "this is props")
  return (
    <div>
      <h1>hello world</h1>
    </div>
  )
}

export default withNamespaces(NameSpaces.common)(CicoPage)
