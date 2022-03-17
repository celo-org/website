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

interface Props {
  data: CicoProvider[]
}

function CicoPage(props: I18nProps & Props) {
  const { data } = props

  console.log(data, "this is cico")
  return (
    <div>
      <h1></h1>
    </div>
  )
}

export default withNamespaces(NameSpaces.common)(CicoPage)
