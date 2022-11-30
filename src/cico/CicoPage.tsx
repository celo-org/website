import * as React from "react"
import { NameSpaces, withNamespaces, useTranslation } from "src/i18n"
import { css } from "@emotion/react"
import Chevron, { Direction } from "src/icons/chevron"
import { colors } from "src/colors"
import { buttonCss } from "src/contentful/grid2-cells/Playlist"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import {
  flex,
  whiteText,
  jost,
  fonts,
  garamond,
  WHEN_MOBILE,
  WHEN_TABLET,
  flexRow,
  WHEN_DESKTOP,
} from "src/estyles"
import debounce from "lodash.debounce"
import { Entry } from "contentful"
import TextInput from "../reskin/components/TextInput"
import Button, { BTN, SIZE } from "../shared/Button.4"
import { useState } from "react"

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
  content: Entry<GridRowContentType>
  data: Record<string, CicoProvider[]>
}

function CicoPage(props: Props & ContentfulPage<GridRowContentType>) {
  const sections = props.sections.filter((section) => section.fields?.id !== "celo-ramps")
  const items = sections.map((section) => pageSwitch(section, true))
  const onOffRampsSection = props.sections.find((section) => {
    return section?.fields?.id === "celo-ramps"
  })
  items.splice(
    items.length - 3,
    0,
    <CoutriesReturned content={onOffRampsSection} data={props.data} />
  )
  return <div css={rootCss}>{props.sections ? items : <></>}</div>
}

const rootCss = css(flex, {
  backgroundColor: colors.dark,
})

function CoutriesReturned(props: Props) {
  const { t } = useTranslation(NameSpaces.cico)
  const [search, setSearch] = React.useState("")
  const [expandedIndex, setBlurbIndex] = React.useState(null)
  const { data, content } = props
  const title = content.fields.cells[0].fields.title
  const subTitle = content.fields.cells[0].fields?.subTitle.content[0].content[0].value
  const toggle = (num: number) => (expandedIndex === num ? setBlurbIndex(null) : setBlurbIndex(num))
  const numberOfCountriesPerPage = 12
  const maxPage = Object.keys(data).length / numberOfCountriesPerPage
  const [currentPage, setCurrentPage] = useState(1)

  const showingCountries = React.useMemo(() => {
    return Object.keys(data)
      .filter((title) => title.toLowerCase().includes(search.toLowerCase()))
      .sort()
      .slice(0, numberOfCountriesPerPage * currentPage)
  }, [currentPage, data, numberOfCountriesPerPage, search])

  const loadMoreCountries = () => {
    if (currentPage + 1 < maxPage) {
      setCurrentPage(currentPage + 1)
    } else {
      setCurrentPage(maxPage)
    }
  }

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
      setCurrentPage(1)
    }
  }, [debouncedChangeHandler])

  return (
    <section css={displayCountry}>
      <h2 css={titleCss}>{title}</h2>
      <div css={sectionContainer}>
        <div css={inputContainer}>
          <p css={subTitleCss}>{subTitle}</p>
          <TextInput
            chevronColor={colors.dark}
            placeholder={t("placeholder")}
            onChange={debouncedChangeHandler}
          />
        </div>
        <div>
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
          {currentPage !== maxPage && (
            <div css={loadMoreCss}>
              <Button
                align={"center"}
                size={SIZE.normal}
                kind={BTN.PRIMARY}
                text="Load More"
                onPress={loadMoreCountries}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

const displayCountry = css(jost, whiteText, flex, {
  paddingTop: 320,
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "center",
  width: "100%",
  backgroundColor: colors.baseTan,
  "h1, h2, h3, h4, h5, p": colors.dark,
  [WHEN_MOBILE]: {
    paddingTop: 80,
  },
})
const sectionContainer = css({
  margin: "0px 100px",
  justifyContent: "center",
  padding: "0px 12px 80px",
  maxWidth: 1104,
  width: "100%",
  display: "grid",
  gridTemplateColumns: "30% 70%",
  gap: 16,
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
const titleCss = css(fonts.h1, {
  fontSize: 72,
  marginBottom: 108,
  [WHEN_MOBILE]: {
    fontSize: 36,
    marginBottom: 24,
  },
})

const subTitleCss = css(fonts.h4, {
  fontSize: 20,
  [WHEN_TABLET]: {
    padding: "0 32px",
  },
  [WHEN_MOBILE]: {
    padding: "0 32px",
  },
})

const inputContainer = css(flex, {
  [WHEN_TABLET]: {
    alignItems: "center",
    padding: "0 32px",
  },
  [WHEN_MOBILE]: {
    alignItems: "center",
    padding: "0 32px",
  },
})

const loadMoreCss = css({
  marginTop: 80,
  "& > div": {
    alignItems: "flex-start",
  },
})
const tableTitle = css({
  borderBottom: `1px solid ${colors.grayHeavy}`,
  padding: "20px 0px",
  textAlign: "start",
  h2: fonts.h2,
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
        <h3 css={css(fonts.h2, countryCss)}>{newString}</h3>
        <Chevron
          color={colors.black}
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
  padding: "60px 10px",
  width: "100%",
})

const countryContainer = css(jost, {
  justifyContent: "center",
  alignContent: "center",
  borderBottom: `1px solid ${colors.transparentGray}`,
  opacity: 0.5,
  "&:hover": {
    background:
      "radial-gradient(57.57% 111.11% at 50% 155.56%, #E6E3D5 0%, rgba(230, 227, 213, 0) 100%)",
    opacity: 1,
  },
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
  border: `1px solid ${colors.dark}`,
})
const countriesHeaderCell = css(countriesCells, whiteText, {
  border: `1px solid ${colors.dark}`,
  color: colors.dark,
  [WHEN_MOBILE]: {
    color: colors.dark,
  },
})
const countryCss = css({
  fontSize: 26,
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
  border: `1px solid ${colors.dark}`,
  color: colors.black,
})

export default withNamespaces(NameSpaces.cico)(CicoPage)
