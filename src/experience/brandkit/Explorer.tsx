import { debounce } from "debounce"
import FuzzySearch from "fuzzy-search"
import * as React from "react"
import Search, { useSearch } from "src/experience/brandkit/Search"
import { AssetTypes } from "src/experience/brandkit/tracking"
import IconShowcase from "src/experience/common/Showcase"
import { NameSpaces, useTranslation } from "src/i18n"
import { fonts } from "src/estyles"
import { colors } from "src/colors"
import { IconData, Props } from "./IconsPage"
import NewShowcase from "src/experience/common/NewShowcase"
import { css } from "@emotion/react"

export function Explorer({ icons }: Props) {
  const { t } = useTranslation(NameSpaces.brand)
  const { query, onQueryChange } = useSearch()
  const visibleIcons = useVisibleIconIDs(query, icons)
  return (
    <div css={rootStyle}>
      <Search value={query} onChange={onQueryChange} />
      <span aria-hidden={!query} css={css(matchingCss, query && matchingVisible)}>
        {visibleIcons.size === 0
          ? t("icons.matching_0")
          : t("icons.matching", { count: visibleIcons.size })}
      </span>
      <div css={flexWrap}>
        {icons
          .sort((a, b) => (Number(a.series) > Number(b.series) ? -1 : 1))
          .map((icon) => (
            <div
              key={icon.id}
              aria-testId={icon.id}
              css={css(containerStyle, !visibleIcons.has(icon.id) && offScreenStyle)}
            >
              {icon.series == "2" ? (
                <NewShowcase
                  key={icon.id}
                  name={icon.name}
                  preview={icon.preview}
                  tags={icon.tags}
                  uri={icon.uri}
                  assetType={AssetTypes.icon}
                />
              ) : (
                <IconShowcase
                  key={icon.id}
                  ratio={1}
                  description={icon.description}
                  name={icon.name}
                  preview={icon.preview}
                  uri={icon.uri}
                  loading={false}
                  assetType={AssetTypes.icon}
                  size={160}
                />
              )}
            </div>
          ))}
      </div>
    </div>
  )
}

export default Explorer

const rootStyle = css({
  minHeight: "100vh",
})

const flexWrap = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
})

const matchingCss = css(fonts.h6, {
  marginLeft: 10,
  marginRight: 10,
  color: colors.primaryPress,
  opacity: 0,
  transitionDuration: "200ms",
  transitionProperty: "opacity",
})

const matchingVisible = css({
  opacity: 1,
})

const containerStyle = css({
  width: 260,
})

const offScreenStyle = css({
  display: "none",
})

function useVisibleIconIDs(query: string, initial: IconData[]): Set<string> {
  const [results, setResult] = React.useState(null)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(
    debounce(() => {
      setResult(toIDSet(search(query, initial)))
    }, 50),
    [initial, query]
  )

  return results || toIDSet(initial)
}

const FIELDS = ["name", "description", "tags"]

function search(query: string, icons: IconData[]) {
  const searcher = new FuzzySearch(icons, FIELDS)
  const result = searcher.search(query)
  return result
}

function toIDSet(initial: IconData[]): Set<string> {
  return new Set(initial.map((icon) => icon.id))
}
