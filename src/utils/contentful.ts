import { Document } from "@contentful/rich-text-types"
import { CSSObject } from "@emotion/react"
import { Asset, createClient, Entry, EntryCollection } from "contentful"
import getConfig from "next/config"
import { Page as SideBarEntry } from "src/experience/common/Sidebar"
import { Props as BlurbProps } from "src/contentful/grid2-cells/Blurb"
import { BTN } from "src/shared/Button.3"
import { fetchCached, MINUTE } from "src/../server/cache"
import { i18nLocaleToContentfulLocale } from "server/i18nSetup"

function initialize() {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
  const isPreview = publicRuntimeConfig.ENV === "development"
  return createClient({
    space: serverRuntimeConfig.CONTENTFUL_SPACE_ID,
    accessToken: isPreview
      ? serverRuntimeConfig.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : serverRuntimeConfig.CONTENTFUL_ACCESS_TOKEN,
    host: isPreview ? "preview.contentful.com" : undefined,
  })
}

interface Kit {
  name: string
  slug: string
  metaDescription: string
  ogImage: Asset
  pages_: any[]
}

interface InternalKit {
  kitName: string
  metaDescription: string
  ogImage: Asset
  pageID: string
  sidebar: SideBarEntry[]
}

export async function getKit(kitSlug: string, pageSlug: string, { locale }): Promise<InternalKit> {
  return fetchCached(`kit:${kitSlug}:${pageSlug || "home"}`, locale, 3 * MINUTE, () =>
    fetchKit(kitSlug, pageSlug, { locale })
  )
}

async function fetchKit(kitSlug: string, pageSlug: string, { locale }): Promise<InternalKit> {
  const kit = await initialize().getEntries<Kit>({
    content_type: "kit",
    "fields.slug": kitSlug,
    locale: i18nLocaleToContentfulLocale(locale),
  })

  const data = kit.items[0].fields

  const homePageSlug = kitSlug === "merchant" ? "index" : kitSlug

  const actualPageSlug = !pageSlug ? homePageSlug : pageSlug

  // get first page if we cant find so that at least we render a page in the kit
  let pageID = data.pages_.find((p) => p.fields.slug === actualPageSlug)?.sys?.id

  if (!pageID && !pageSlug) {
    pageID = data.pages_[0].sys.id
  }

  return {
    kitName: data.name,
    metaDescription: data.metaDescription,
    ogImage: data.ogImage,
    pageID,
    sidebar: data.pages_.map((page) => {
      return {
        title: page.fields.title,
        href: `${addLocale(locale)}/experience/${kitSlug}${
          page.fields.slug === kitSlug || page.fields.slug === "index" ? "" : "/" + page.fields.slug
        }`,
        sections: [],
      }
    }),
  }
}

export async function getValidKitSlugs() {
  return fetchCached(`valid-kit-slugs`, "root", 6 * MINUTE, fetchValidKitSlugs)
}

async function fetchValidKitSlugs(): Promise<Record<string, Set<string>>> {
  const kits = await initialize().getEntries<Kit>({
    content_type: "kit",
    locale: "en-US",
  })

  return kits.items.reduce((sum, item) => {
    return {
      ...sum,
      [item.fields.slug]: new Set(item.fields.pages_.map((page) => page.fields.slug)),
    }
  }, {})
}

export interface SectionType {
  name: string
  contentField: Document
  slug: string
}

export interface ContentfulButton {
  name: string
  href: string
  assetLink?: Asset
  words: string
  kind: BTN
}

export interface InfoSheetContentType {
  title: string
  heading: string
  body: Document
  buttons: Entry<ContentfulButton>[]
}

export interface RoledexContentType {
  title: string
  sheets: Entry<InfoSheetContentType>[]
}

export type InputTypes = "tel" | "email" | "multiline" | "url" | "text"

interface FieldContentType {
  name: string
  placeholder?: string
  label?: string
  required?: boolean
  type?: InputTypes
}

export interface FormContentType {
  fields: Entry<FieldContentType>[]
  colSpan: number
  layout?: { grid: string[][] }
  submitText: string
  route: string
}

export interface EditorialType {
  title: Document
  button: Entry<ContentfulButton>
  image: Asset
}

export interface ThumbnailType {
  title: string
  link: string
  image: Asset
}
export interface FreeContentType {
  backgroundColor: string
  colSpan?: 1 | 2 | 3 | 4
  rowSpan?: number
  cssStyle: CSSObject
  listStyleImage?: Asset
  body: Document
}

export interface PlaylistContentType {
  title: string
  description: Document
  listId?: string
  media?: Entry<ThumbnailType>[]
}

export interface PictureType {
  description: string
  desktop: Asset
  mobile: Asset
  objectFit: "cover" | "contain"
  span: 1 | 2 | 3 | 4
  cssStyle?: CSSObject
}

export interface HeadingContentType {
  title: string
  displayTitleH1?: boolean
  subTitle: Document
  titleCss?: CSSObject
  subTitleCss?: CSSObject
  cssStyle?: CSSObject
  image?: Asset
}

export interface IframeContentType {
  url: string
  height: number
}

export type CellContentType =
  | BlurbProps
  | FormContentType
  | HeadingContentType
  | RoledexContentType
  | PlaylistContentType
  | PictureType
  | FreeContentType
  | IframeContentType
  | EditorialType

export interface GridRowContentType {
  id: string
  cells: Entry<CellContentType>[]
  cssStyle?: CSSObject
  desktopCss?: CSSObject
  columns: 1 | 2 | 3 | 4
  darkMode?: boolean
}

export interface CoverContentType {
  title?: string
  superSize: boolean
  subTitle: Document
  links?: Entry<ContentfulButton>[]
  imageDesktop: Asset
  imageMobile: Asset
  darkMode?: boolean
  illoFirst?: boolean
  verticalPosition: "centered" | "flushBottomText"
  imageFit: "contain" | "overflow"
  resolution: 1 | 2
}

export interface ContentfulPage<T> {
  title: string
  slug: string
  description: string
  sections: Entry<T>[]
  openGraph?: Asset
  darkNav: boolean
  className?: string
}

export interface GalleryItem {
  url: string
  image: Asset
  title?: string
}

export interface LogoGallery {
  name: string
  list: Entry<GalleryItem>[]
  cssStyle?: any
}

export async function getPageBySlug(slug: string, { locale }, showSysData?: boolean) {
  return fetchCached(`page-slug:${slug}`, locale, 2 * MINUTE, () =>
    fetchPageBySlug(slug, { locale }, showSysData)
  )
}

async function fetchPageBySlug(slug: string, { locale }, showSysData?: boolean) {
  const pages = await initialize().getEntries<ContentfulPage<SectionType | GridRowContentType>>({
    content_type: "page",
    "fields.slug": slug,
    include: 5,
    locale: i18nLocaleToContentfulLocale(locale),
  })
  return processPages<SectionType | GridRowContentType>(pages, showSysData)
}

export async function getPageById<T>(id: string, { locale }) {
  return fetchCached(`page-by-id:${id}`, locale, 2 * MINUTE, () => fetchPageById<T>(id, { locale }))
}

export async function fetchPageById<T>(id: string, { locale }) {
  const pages = await initialize().getEntries<ContentfulPage<T>>({
    content_type: "page",
    "sys.id": id,
    include: 5,
    locale: i18nLocaleToContentfulLocale(locale),
  })
  return processPages<T>(pages)
}

function processPages<T>(pages: EntryCollection<ContentfulPage<T>>, showSysData?: boolean) {
  const data = pages?.items[0]?.fields

  if (!data) {
    return null
  }

  const sections = showSysData
    ? data.sections
    : (data.sections || []).map((section) => section.fields)
  return { ...data, sections, updatedAt: pages.items[0].sys.updatedAt }
}

export function addLocale(locale) {
  if (locale === "en-US" || locale == "en") {
    return ""
  } else {
    return `/${locale}`
  }
}
