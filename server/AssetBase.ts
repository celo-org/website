import { Attachment, FieldSet, Table } from "airtable"
import getConfig from "next/config"
import AssetProps from "src/../fullstack/AssetProps"
import { fetchCached, MINUTE } from "./cache"
import airtableInit, { getWidthAndHeight } from "./airtable"

const ASSSET_FIELD_LIGHT = "Assets (on light bg)"
const ASSSET_FIELD_DARK = "Assets (on dark bg)"

interface Fields extends FieldSet {
  Name: string
  Description: string
  [ASSSET_FIELD_LIGHT]?: Attachment[]
  [ASSSET_FIELD_DARK]?: Attachment[]
  Preview?: Attachment[]
  Zip: Attachment[]
  Terms: boolean
  Tags?: string[]
  Order: number
  series: "1" | "2"
}

export enum AssetSheet {
  Tags = "Tags",
  Icons = "Icons",
  Illustrations = "Illustrations",
  AbstractGraphics = "Abstract Graphics",
}

export default async function combineTagsWithAssets(sheet: AssetSheet) {
  const [tags, assets] = await Promise.all([getTags(), getAssets(sheet)])
  return assets.map((record) => normalize(record.fields, record.id, tags))
}

async function getAssets(sheet: AssetSheet) {
  return fetchCached(`brand-assets-${sheet}`, "en", 2 * MINUTE, () => fetchAssets(sheet))
}

async function getTags() {
  return fetchCached(`brand-assets-tags`, "en", 2 * MINUTE, fetchTags)
}

async function fetchTags(): Promise<Record<string, Tag>> {
  const tags = {}
  await getAirtable(AssetSheet.Tags)
    .select({
      pageSize: 100,
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((tag) => (tags[tag.id] = tag.fields))
      fetchNextPage()
    })

  return tags
}

async function fetchAssets(sheet: AssetSheet) {
  const assets = []

  const selector =
    process.env.DEPLOY_ENV === "production"
      ? { filterByFormula: `AND(${IS_APROVED}, ${TERMS_SIGNED})` }
      : {}

  await getAirtable(sheet)
    .select({
      pageSize: 100,
      ...selector,
      sort: [{ field: "Order", direction: "asc" }],
    })
    .eachPage((records, fetchNextPage) => {
      records.forEach((r) => assets.push(r))
      fetchNextPage()
    })
  return assets
}

function getAirtable(sheet: AssetSheet): Table<Fields> {
  return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_BRANDKIT_ID)(sheet) as Table<Fields>
}

const IS_APROVED = "Approved=1"
const TERMS_SIGNED = "Terms=1"

interface Tag {
  Name: string
}

function normalize(asset: Fields, id: string, tags: Record<string, Tag>): AssetProps {
  return {
    name: asset.Name,
    description: asset.Description,
    preview: getPreview(asset),
    uri: getURI(asset),
    tags: (asset.Tags || []).map((tagID) => tags[tagID].Name),
    id,
    series: asset.series,
    ...getWidthAndHeight(asset.Preview),
  }
}
export const _normalize = normalize

function getPreview(asset: Fields) {
  const previewField = asset.Preview || asset[ASSSET_FIELD_LIGHT]
  if (previewField && previewField[0]?.type === "image/svg+xml") {
    return (previewField && previewField[0]?.url) || ""
  }
  return (
    (previewField &&
      previewField[0] &&
      previewField[0].thumbnails &&
      previewField[0].thumbnails.large.url) ||
    ""
  )
}

function getURI(asset: Fields) {
  return (asset.Zip && asset.Zip[0] && asset.Zip[0].url) || ""
}
