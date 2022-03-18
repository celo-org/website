import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { css } from "@emotion/react"
import { containerCss } from "src/press/PressPage"
import cicoDatabase from "pages/api/cico-database"

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

  // console.log(byCountries, "this is countries")
  return (
    <div css={containerCss}>
      {Object.keys(byCountries).map((title) => {
        return (
          <>
            <h1>{title}</h1>
            <div css={countryContainer}>
              {byCountries[title].map((country) => {
                return (
                  <>
                    <Countries
                      restricted={country.restricted}
                      paid={country.paid}
                      cicoProvider={country.cicoProvider}
                      cicoType={country.cicoType}
                    />
                  </>
                )
              })}
            </div>
          </>
        )
      })}
    </div>
  )
}

export function Countries({ restricted, paid, cicoProvider, cicoType }: CicoProvider) {
  return (
    <div css={dataContainer}>
      <p>{restricted}</p>
      <p>{paid}</p>
      <p>{!cicoProvider ? "null" : cicoProvider}</p>
      <p>{!cicoType ? "N/A" : cicoType}</p>
    </div>
  )
}

const dataContainer = css({
  border: "1px solid green",
  maxWidth: 400,
  padding: 20,
  margin: 20,
})

const countryContainer = css({
  border: "1px solid blue",
  display: "flex",
  flexDirection: "row",
})

export default withNamespaces(NameSpaces.common)(CicoPage)