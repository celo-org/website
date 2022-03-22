import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { css } from "@emotion/react"
import { containerCss } from "src/press/PressPage"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"
import { buttonCss } from "src/contentful/grid2-cells/Playlist"

export interface CicoProvider {
  restricted?: string
  population?: string
  country?: string
  cicoProvider?: string
  paymentType?: string[]
  cicoType?: string
  celoAssets?: CeloAssets
  securityReview?: string
  legalReview?: string
  usabilityReview?: string
  paid?: string
}
interface CeloAssets {
  assets: string[]
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
              <div css={headerContainer}>
                <h1>{title}</h1>
                <button css={buttonCss}>
                  <Chevron color={colors.greenUI} direction={Direction.down} />
                </button>
              </div>
              <div>
                <table css={countriesTable}>
                  <thead css={countriesHeader}>
                    <tr>
                      <th css={countriesHeader}>CICO Provider</th>
                      <th css={countriesHeader}>CICO Type</th>
                      <th css={countriesHeader}>Restricted</th>
                      <th css={countriesHeader}>Paid</th>
                      <th css={countriesHeader}>Celo Assets</th>
                    </tr>
                  </thead>
                  {byCountries[title].map(
                    (country: {
                      restricted: string
                      paid: string
                      cicoProvider: string
                      cicoType: string
                      celoAssets: CeloAssets
                    }) => {
                      debugger
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
                    }
                  )}
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
        <td css={countriesBody}>{!cicoProvider ? "N/A" : cicoProvider}</td>
        <td css={countriesBody}>{!cicoType ? "N/A" : cicoType}</td>
        <td css={countriesBody}>{!restricted ? "N/A" : restricted}</td>
        <td css={countriesBody}>{!paid ? "N/A" : paid}</td>
        <td css={countriesBody}>{!celoAssets ? "N/A" : celoAssets}</td>
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

const countriesTable = css({
  border: "1px solid black",
})
const countriesCells = css({
  padding: 16,
  textAlign: "center",
})
const countriesHeader = css(countriesCells, {
  border: "2px solid black",
})
const countriesBody = css(countriesCells, {
  border: "1px solid black",
})
const headerContainer = css({
  display: "flex",
})

export default withNamespaces(NameSpaces.common)(CicoPage)
