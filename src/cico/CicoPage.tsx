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
                <table>
                  <thead>
                    <tr>
                      <th>
                        Restricted
                        <ToggleButton />
                      </th>
                      <th>
                        Paid <ToggleButton />
                      </th>
                      <th>
                        CICO Provider <ToggleButton />
                      </th>
                      <th>
                        CICO Type <ToggleButton />
                      </th>
                    </tr>
                  </thead>
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
                </table>
              </div>
            </>
          )
        })}
    </div>
  )
}

export function Countries({ restricted, paid, cicoProvider, cicoType }: CicoProvider) {
  return (
    <tbody>
      <tr>
        <td>{restricted}</td>
        <td>{paid}</td>
        <td>{!cicoProvider ? "null" : cicoProvider}</td>
        <td>{!cicoType ? "N/A" : cicoType}</td>
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

export default withNamespaces(NameSpaces.common)(CicoPage)
