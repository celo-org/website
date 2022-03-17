import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"

export interface CicoProvider {
  restricted?: string
  population?: string
  country: string
  "CICO Provider": string
  "Payment Type": string[]
  "CICO Type": string
  "Celo Assets": string[]
  "Security Review": string
  "Legal Review": string
  "Usability Review": string
  paid: string
}

function CicoPage(props: I18nProps & CicoProvider) {
  console.log(props, "this is props")
  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default withNamespaces(NameSpaces.common)(CicoPage)
