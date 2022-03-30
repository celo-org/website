import * as React from "react"
import { NameSpaces, withNamespaces, useTranslation } from "src/i18n"
import { css } from "@emotion/react"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"
import { buttonCss } from "src/contentful/grid2-cells/Playlist"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import { flex, whiteText, jost, fonts, garamond } from "src/estyles"
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
    <section css={displayCountry}>
      <div css={sectionContainer}>
        <input
          css={inputCss}
          placeholder={t("placeholder")}
          type="text"
          onChange={(e) => setSearch(e.target.value)}
        />
        <div css={countriesContainer}>
          <div css={tableTitle}>
            <h2>{t("celoRamps.countries")}</h2>
          </div>
          <div css={showingCountriesContainer}>
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
    </section>
  )
}

const displayCountry = css(fonts, jost, whiteText, flex, {
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",
  width: "100%",
  backgroundColor: colors.dark,
  "h1, h2, h3, h4, h5, p": whiteText,
})
const sectionContainer = css({
  margin: "0px 100px",
  justifyContent: "center",
  padding: "0px 12px 80px",
  maxWidth: 1104,
  width: "100%",
  display: "grid",
  gridTemplateColumns: "30% 70%",
})
const countriesContainer = css({})
const inputCss = css(garamond, {
  border: `1px inset ${colors.placeholderGray}`,
  width: 224,
  height: 54,
  borderRadius: "3px",
  fontSize: 20,
  ["::placeholder"]: {
    color: colors.placeholderDarkMode,
    fontSize: 20,
    paddingLeft: 5,
  },
  marginTop: 80,
  marginLeft: 30,
})
const tableTitle = css({
  borderBottom: `1px solid ${colors.grayHeavy}`,
  padding: "20px 0px",
  textAlign: "start",
})

const showingCountriesContainer = css({
  maxHeight: `calc(100vh - 50px)`,
  overflowY: "scroll",
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
  const newString = title
  if (newString.includes(", The")) {
    debugger
    newString.split(" , ").reverse().join(" ")
  }
  return (
    <div key={index} css={countryContainer}>
      <div css={headerContainer}>
        <h3>{newString}</h3>
        <button css={buttonCss} onClick={() => toggle(index)}>
          <Chevron color={colors.white} direction={Direction.down} />
        </button>
      </div>
      <div css={expandedIndex === index ? toggleContent : displayNone}>
        <table css={countriesTable}>
          <thead>
            <tr css={countriesHeader}>
              <th css={countriesHeaderCell}>CICO Provider</th>
              <th css={countriesHeaderCell}>CICO Type</th>
              <th css={countriesHeaderCell}>Celo Assets</th>
              <th css={countriesHeaderCell}>Payment Type</th>
              <th css={countriesHeaderCell}>Restricted</th>
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

const headerContainer = css({
  display: "flex",
  textAlign: "start",
  justifyContent: "space-between",
  padding: "30px 0px",
})

const countryContainer = css({
  justifyContent: "center",
  alignContent: "center",
  borderBottom: `1px solid ${colors.grayHeavy}`,
})
const countriesTable = css({
  border: `1px solid ${colors.grayHeavy}`,
  width: "100%",
  borderCollapse: "collapse",
})
const countriesCells = css({
  padding: 16,
  textAlign: "center",
})
const countriesHeader = css(countriesCells, {
  border: `1px solid ${colors.grayHeavy}`,
  backgroundColor: `rgba(171, 173, 175, 0.3)`,
})
const countriesHeaderCell = css(countriesCells, whiteText, {
  border: `1px solid ${colors.grayHeavy}`,
})

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

const countriesBody = css(countriesCells, {
  border: `1px solid ${colors.grayHeavy}`,
})
const toggleContent = css({
  display: "flex",
  justifyContent: "center",
})
const displayNone = css({
  display: "none",
})

export default withNamespaces(NameSpaces.cico)(CicoPage)
