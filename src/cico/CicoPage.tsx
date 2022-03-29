import * as React from "react"
import { NameSpaces, withNamespaces, useTranslation } from "src/i18n"
import { css } from "@emotion/react"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"
import { buttonCss } from "src/contentful/grid2-cells/Playlist"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import { flex, whiteText, fonts } from "src/estyles"
import { responsePathAsArray } from "graphql"

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
  data: Record<string, CicoProvider[]>
}

function CicoPage(props: Props & ContentfulPage<GridRowContentType>) {
  const items = props.sections.map(pageSwitch)
  items.splice(items.length, 0, <CoutriesReturned data={props.data} />)
  return <div css={rootCss}>{props.sections ? items : <></>}</div>
}

const rootCss = css(flex, {
  backgroundColor: colors.dark,
})

const countryContainer = css({
  justifyContent: "center",
  alignContent: "center",
})

function CoutriesReturned(props: Props) {
  const { t } = useTranslation(NameSpaces.cico)
  const [search, setSearch] = React.useState("")
  const [expandedIndex, setBlurbIndex] = React.useState(null)
  const { data } = props
  const toggle = (num: number) => (expandedIndex === num ? setBlurbIndex(null) : setBlurbIndex(num))

  const showingCountries = React.useMemo(() => {
    return Object.keys(data)
      .filter((title) => title.toLowerCase().includes(search))
      .sort()
  }, [data, search])

  return (
    <div css={displayCountry}>
      <div css={searchContainer}>
        <input placeholder="search" type="text" onChange={(e) => setSearch(e.target.value)} />
      </div>
      <div css={countriesContainer}>
        <div>
          <h1>{t("celoRamps.countries")}</h1>
        </div>
        <div>
          {showingCountries.map((title, index) => {
            return (
              <CountryTable
                key={title}
                index={index}
                title={title}
                toggle={toggle}
                expandedIndex={expandedIndex}
                countryData={data[title]}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

const displayCountry = css(whiteText, {
  display: "grid",
  gridTemplateColumns: "repeat(4, 1fr)",
  backgroundColor: colors.dark,
  "h1, h2, h3, h4, p": whiteText,
  margin: "0px 100px",
})
const countriesContainer = css({
  // display: "grid",
  gridColumn: "2 / span 3",
})
const searchContainer = css({
  textAlign: "center",
  paddingTop: 10,
  paddingBottom: 10,
  gridColumn: "1 / span 1",
})
interface CountryTableProps {
  index: number
  title: string
  toggle: (num: number) => void
  expandedIndex: any
  countryData: CicoProvider[]
}

function CountryTable({
  index,
  title,
  toggle,
  countryData,
  expandedIndex,
}: CountryTableProps): JSX.Element {
  return (
    <div key={index} css={countryContainer}>
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
          {countryData.map((country) => {
            return (
              <>
                <CicoProvider
                  key={country.cicoProvider}
                  restricted={country.restricted}
                  cicoProvider={country.cicoProvider}
                  cicoType={country.cicoType}
                  celoAssets={country.celoAssets}
                  population={country.population}
                  paymentType={country.paymentType}
                />
              </>
            )
          })}
        </table>
      </div>
    </div>
  )
}

const CicoProvider = React.memo(function _CicoProvider({
  restricted,
  cicoProvider,
  cicoType,
  celoAssets,
  paymentType,
}: CicoProvider) {
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
})

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
  justifyContent: "center",
  alignItems: "center",
})
const toggleContent = css({
  display: "flex",
  justifyContent: "center",
})
const displayNone = css({
  display: "none",
})

export default withNamespaces(NameSpaces.cico)(CicoPage)
