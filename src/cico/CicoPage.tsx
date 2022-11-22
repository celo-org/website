import * as React from "react"
import { NameSpaces, withNamespaces, useTranslation } from "src/i18n"
import { css } from "@emotion/react"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"
import { buttonCss } from "src/contentful/grid2-cells/Playlist"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import { flex, whiteText, jost, fonts, garamond, WHEN_MOBILE, WHEN_TABLET } from "src/estyles"
import debounce from "lodash.debounce"

export interface CicoProvider {
  country?: string
  cicoProvider?: string
  paymentType?: PaymentType
  cicoType?: string
  celoAssets?: CeloAssets
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
  const items = props.sections.map((section) => pageSwitch(section, true))
  items.splice(items.length - 2, 0, <CoutriesReturned data={props.data} />)
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
      .filter((title) => title.toLowerCase().includes(search.toLowerCase()))
      .sort()
  }, [data, search])

  const debouncedChangeHandler = React.useMemo(
    () =>
      debounce(
        (e: { target: { value: React.SetStateAction<string> } }) => setSearch(e.target.value),
        250
      ),
    [setSearch]
  )

  React.useEffect(() => {
    return () => {
      debouncedChangeHandler.cancel()
    }
  }, [debouncedChangeHandler])

  return (
    <section css={displayCountry}>
      <div css={sectionContainer}>
        <input
          css={inputCss}
          placeholder={t("placeholder")}
          type="text"
          onChange={debouncedChangeHandler}
        />
        <div>
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
  [WHEN_MOBILE]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  [WHEN_TABLET]: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
})
const inputCss = css(garamond, {
  [WHEN_MOBILE]: {
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px 30px",
  },
  [WHEN_TABLET]: {
    justifyContent: "center",
    alignItems: "center",
    margin: "0px 0px 30px",
  },
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
  marginRight: 70,
})
const tableTitle = css({
  borderBottom: `1px solid ${colors.grayHeavy}`,
  padding: "20px 0px",
  textAlign: "start",
  [WHEN_MOBILE]: {
    padding: "20px 16px",
    margin: "0px 10px",
  },
})

const showingCountriesContainer = css({
  maxHeight: `calc(100vh - 50px)`,
  overflowY: "scroll",
  [WHEN_MOBILE]: {
    padding: "0px 20px",
  },
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
  const { t } = useTranslation(NameSpaces.cico)
  let newString = title
  if (newString.includes(", T")) {
    const str = newString.split(",")
    newString = `${str[1]} ${str[0]}`
  }
  return (
    <div key={index} css={countryContainer}>
      <button css={css(buttonCss, headerContainer)} onClick={() => toggle(index)}>
        <h3>{newString}</h3>
        <Chevron
          color={colors.white}
          direction={expandedIndex === index ? Direction.up : Direction.down}
        />
      </button>
      <div css={expandedIndex === index ? toggleContent : displayNone}>
        <table css={countriesTable}>
          <thead>
            <tr css={countriesHeader}>
              <th css={countriesHeaderCell}>{t("tableHeaderTitle.cicoProvider")}</th>
              <th css={countriesHeaderCell}>{t("tableHeaderTitle.cicoType")}</th>
              <th css={countriesHeaderCell}>{t("tableHeaderTitle.celoAssets")}</th>
              <th css={countriesHeaderCell}>{t("tableHeaderTitle.paymentType")}</th>
            </tr>
          </thead>
          {countryData.map((country) => {
            return (
              <>
                <CicoProvider
                  key={country.cicoProvider}
                  cicoProvider={country.cicoProvider}
                  cicoType={country.cicoType}
                  celoAssets={country.celoAssets}
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
  padding: "30px 10px",
  width: "100%",
})

const countryContainer = css(jost, {
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
const toggleContent = css({
  display: "flex",
  justifyContent: "center",
})
const displayNone = css({
  display: "none",
})

const CicoProvider = React.memo(function _CicoProvider({
  cicoProvider,
  cicoType,
  celoAssets,
  paymentType,
}: CicoProvider) {
  function format(prop: CeloAssets | PaymentType) {
    return Object.values(prop).join(", ")
  }

  return (
    <>
      <tbody>
        <tr>
          <td css={countriesBody}>{!cicoProvider ? "N/A" : cicoProvider}</td>
          <td css={countriesBody}>{!cicoType ? "N/A" : cicoType}</td>
          <td css={countriesBody}>{!celoAssets ? "N/A" : format(celoAssets)}</td>
          <td css={countriesBody}>{!paymentType ? "N/A" : format(paymentType)}</td>
        </tr>
      </tbody>
    </>
  )
})

const countriesBody = css(countriesCells, {
  border: `1px solid ${colors.grayHeavy}`,
})

export default withNamespaces(NameSpaces.cico)(CicoPage)
