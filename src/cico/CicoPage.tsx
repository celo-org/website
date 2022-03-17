import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { css } from "@emotion/react"
import { containerCss } from "src/press/PressPage"

export interface CicoProvider {
  restricted?: string
  population?: string
  country?: string
  cicoProvider?: string
  paymentType?: string[]
  cicoType?: string
  celoAssets?: string[]
  securityReview?: string
  legalReview?: string
  usabilityReview?: string
  paid?: string
}

interface Props {
  data: CicoProvider[]
}

function CicoPage(props: I18nProps & Props) {
  const { data } = props
  const byCountries = data.reduce((countries, provider) => {
    const country = provider.country
    if (countries[country] == null) countries[country] = []
    countries[country].push(provider)
    return countries
  }, {})

  console.log(byCountries, "this is countries")
  return (
    <div css={containerCss}>
      {Object.keys(byCountries).map((title) => {
        return (
          <>
            <h4>{title}</h4>
            {byCountries[title].map((country) => {
              // console.log(country, "this is country")
              return (
                <>
                  <Countries country={country.country} />
                </>
              )
            })}
          </>
        )
      })}
    </div>
  )
}

export function Countries({ country }: CicoProvider) {
  debugger
  return (
    <div>
      <h4>{country}</h4>
    </div>
  )
}

export default withNamespaces(NameSpaces.common)(CicoPage)
