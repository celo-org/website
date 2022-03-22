import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { css } from "@emotion/react"
import { containerCss } from "src/press/PressPage"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"

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

  return (
    <div css={containerCss}>
      {Object.keys(byCountries)
        .sort()
        .map((title) => {
          return (
            <>
              <h1>{title}</h1>
              <div css={countryContainer}>
                <table css={countriesTable}>
                  <thead>
                    <tr>
                      <th css={contriesCells}>CICO Provider</th>
                      <th css={contriesCells}>CICO Type</th>
                      <th css={contriesCells}>Restricted</th>
                      <th css={contriesCells}>Paid</th>
                      <th css={contriesCells}>Celo Assets</th>
                    </tr>
                  </thead>
                  {byCountries[title].map((country) => {
                    console.log(country.celoAssets, "this is how it looks like ")
                    return (
                      <>
                        <Countries
                          restricted={country.restricted}
                          paid={country.paid}
                          cicoProvider={country.cicoProvider}
                          cicoType={country.cicoType}
                          celoAssets={country.celoAssets}
                        />
                      </>
                    )
                  })}
                </table>
              </div>
            </>
          )
        })}
    </div>
  )
}

export function Countries({ restricted, paid, cicoProvider, cicoType, celoAssets }: CicoProvider) {
  return (
    <tbody>
      <tr>
        <td css={contriesCells}>{!cicoProvider ? "N/A" : cicoProvider}</td>
        <td css={contriesCells}>{!cicoType ? "N/A" : cicoType}</td>
        <td css={contriesCells}>{!restricted ? "N/A" : restricted}</td>
        <td css={contriesCells}>{!paid ? "N/A" : paid}</td>
        <td css={contriesCells}>{!celoAssets ? "N/A" : celoAssets}</td>
      </tr>
    </tbody>
  )
}

function ToggleButton() {
  const [open, setOpen] = React.useState(false)
  const toggleSort = () => (open === true ? setOpen(false) : setOpen(true))
  return (
    <button onClick={toggleSort}>
      {" "}
      <Chevron color={colors.dark} direction={open ? Direction.up : Direction.down} />{" "}
    </button>
  )
}

const countryContainer = css({
  border: "1px solid blue",
  display: "flex",
  flexDirection: "row",
})

const countriesTable = css({
  border: "1px solid black",
})
const contriesCells = css({
  padding: 20,
  textAlign: "center",
})

export default withNamespaces(NameSpaces.common)(CicoPage)
