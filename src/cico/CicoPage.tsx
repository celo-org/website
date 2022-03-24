import * as React from "react"
import { I18nProps, NameSpaces, withNamespaces } from "src/i18n"
import { css } from "@emotion/react"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"
import { buttonCss } from "src/contentful/grid2-cells/Playlist"
import { IndexedData } from "@hubspot/api-client/lib/codegen/cms/site_search/api"

export interface CicoProvider {
  restricted?: string
  population?: number
  country?: string
  cicoProvider?: string
  paymentType?: PaymentType
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
interface PaymentType {
  payment: string[]
}

interface Props {
  data: CicoProvider[]
}

function CicoPage(props: I18nProps & Props) {
  const [expandedIndex, setBlurbIndex] = React.useState(null)
  const toggle = (num: number) => (expandedIndex === num ? setBlurbIndex(null) : setBlurbIndex(num))
  const { data } = props
  const byCountries = data.reduce((countries, provider) => {
    const country = provider.country
    if (countries[country] == null) countries[country] = []
    countries[country].push(provider)
    return countries
  }, {})
  return (
    <div css={containerCss}>
      <div></div>
      {Object.keys(byCountries)
        .sort()
        .map((title, index) => {
          return (
            <>
              <div css={headerContainer}>
                <h1>{title}</h1>
                <button css={buttonCss} onClick={() => toggle(index)}>
                  <Chevron color={colors.greenUI} direction={Direction.down} />
                </button>
              </div>
              <div css={expandedIndex === index ? toggleContent : displayNone}>
                <table css={countriesTable}>
                  <thead css={countriesHeader}>
                    <tr>
                      <th css={countriesHeader}>CICO Provider</th>
                      <th css={countriesHeader}>CICO Type</th>
                      <th css={countriesHeader}>Celo Assets</th>
                      <th css={countriesHeader}>Payment Type</th>
                      <th css={countriesHeader}>Restricted</th>
                    </tr>
                  </thead>
                  {byCountries[title].map(
                    (country: {
                      restricted: string
                      cicoProvider: string
                      cicoType: string
                      celoAssets: CeloAssets
                      population?: number
                      paymentType?: PaymentType
                    }) => {
                      return (
                        <>
                          <CicoProvider
                            restricted={country.restricted}
                            cicoProvider={country.cicoProvider}
                            cicoType={country.cicoType}
                            celoAssets={country.celoAssets}
                            population={country.population}
                            paymentType={country.paymentType}
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

const containerCss = {
  marginTop: 75,
  paddingTop: 75,
  minHeight: 450,
}

export function CicoProvider({
  restricted,
  paid,
  cicoProvider,
  cicoType,
  celoAssets,
  population,
  paymentType,
}: CicoProvider) {
  const newPopulation = !population ? "N/A" : population.toLocaleString("en-US")
  return (
    <>
      <tbody>
        <tr>
          <td css={countriesBody}>{!cicoProvider ? "N/A" : cicoProvider}</td>
          <td css={countriesBody}>{!cicoType ? "N/A" : cicoType}</td>
          <td css={countriesBody}>{!celoAssets ? "N/A" : celoAssets}</td>
          <td css={countriesBody}>{!paymentType ? "N/A" : paymentType}</td>
          <td css={countriesBody}>{!restricted ? "N/A" : restricted}</td>
        </tr>
      </tbody>
    </>
  )
}

// function ToggleButton() {
//   const [open, setOpen] = React.useState(false)
//   const toggleSort = () => (open === true ? setOpen(false) : setOpen(true))
//   return (
//     <button onClick={toggleSort}>
//       {" "}
//       <Chevron color={colors.dark} direction={open ? Direction.up : Direction.down} />{" "}
//     </button>
//   )
// }

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
const toggleContent = css({
  display: "flex",
})
const displayNone = css({
  display: "none",
})

export default withNamespaces(NameSpaces.common)(CicoPage)
