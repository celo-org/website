import { Document } from '@contentful/rich-text-types'
import { CSSObject } from '@emotion/react'
import { Asset, createClient, Entry, EntryCollection } from 'contentful'
import getConfig from 'next/config'
import { Page as SideBarEntry } from 'src/experience/common/Sidebar'
import  {Props as BlurbProps} from "src/public-sector/Blurb"
import { BTN } from 'src/shared/Button.3'

function intialize() {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
  const isPreview = publicRuntimeConfig.ENV === 'development'
  return createClient({
    space: serverRuntimeConfig.CONTENTFUL_SPACE_ID,
    accessToken: isPreview
      ? serverRuntimeConfig.CONTENTFUL_PREVIEW_ACCESS_TOKEN
      : serverRuntimeConfig.CONTENTFUL_ACCESS_TOKEN,
    host: isPreview ? 'preview.contentful.com' : undefined,
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
  const kit = await intialize().getEntries<Kit>({
    content_type: 'kit',
    'fields.slug': kitSlug,
    locale,
  })

  const data = kit.items[0].fields

  const homePageSlug = kitSlug === 'merchant' ? 'index' : kitSlug

  const actualPageSlug = !pageSlug ? homePageSlug : pageSlug

  const pageID = data.pages_.find((p) => p.fields.slug === actualPageSlug)?.sys?.id

  return {
    kitName: data.name,
    metaDescription: data.metaDescription,
    ogImage: data.ogImage,
    pageID,
    sidebar: data.pages_.map((page) => {
      return {
        title: page.fields.title,
        href: `/experience/${kitSlug}${
          page.fields.slug === kitSlug || page.fields.slug === 'index' ? '' : '/' + page.fields.slug
        }${addLocale(locale)}`,
        sections: [],
      }
    }),
  }
}


export interface SectionType { name: string; contentField: Document; slug: string }


export interface ContentfulButton {
  name: string
  href: string
  assetLink?: Asset
  words: string
  kind: BTN
}

export interface FreeContentType {
  backgroundColor: string
  colSpan?: 1 | 2 | 3 |4
  cssStyle: CSSObject
  body: Document
}

export type CellContentType = BlurbProps | FreeContentType

export interface GridRowContentType {
  id: string
  cells: Entry<CellContentType>[]
  cssStyle?: CSSObject
  columns: 1 | 2 | 3 | 4
  darkMode?: boolean
}



export interface ContentfulPage<T> {
  title: string
  slug: string
  description: string
  sections: Entry<T>[]
}

export async function getPageBySlug(slug: string, { locale }, showSysData?: boolean) {
  const pages = await intialize().getEntries<ContentfulPage<SectionType| GridRowContentType>>({
    content_type: 'page',
    'fields.slug': slug,
    include: 5,
    locale,
  })
  return processPages<SectionType| GridRowContentType>(pages, showSysData)
}

export async function getPageById<T>(id: string, { locale }) {
  const pages = await intialize().getEntries<ContentfulPage<T>>({
    content_type: 'page',
    'sys.id': id,
    include: 5,
    locale,
  })
  return processPages<T>(pages)
}

function processPages<T>(pages: EntryCollection<ContentfulPage<T>>, showSysData?: boolean) {
  const data = pages.items[0].fields
  const sections = showSysData ? data.sections : (data.sections || []).map((section) => section.fields)
  return { ...data, sections, updatedAt: pages.items[0].sys.updatedAt }
}

export function addLocale(locale) {
  if (locale === 'en-US') {
    return ''
  } else {
    return `?locale=${locale}`
  }
}

interface FAQItem {
  question: string
  answer: Document
}

interface FAQcollection {
  title: string
  list: Entry<FAQItem>[]
}

export async function getFAQ({ locale }) {
  const result = await intialize().getEntries<FAQcollection>({
    locale,
    content_type: 'faq',
    include: 3,
    'fields.key': 'celoFAQ',
  })
  const faqPage = result.items[0]
  return faqPage
}
