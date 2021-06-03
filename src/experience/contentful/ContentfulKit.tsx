import * as React from "react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES, Document } from "@contentful/rich-text-types"
import Page from "src/experience/common/Page"
import { embedded } from "src/contentful/nodes/embedded"

import { Page as SideBarEntry } from "src/experience/common/Sidebar"
import { renderNode } from "src/contentful/nodes/nodes"

export interface Props {
  kitName: string
  metaDescription: string
  path: string
  ogImage: string
  sidebar: SideBarEntry[]
  sections: {
    name: string
    contentField: Document
    slug: string
  }[]
}

const OPTIONS = {
  renderNode: {
    ...renderNode,
    [BLOCKS.EMBEDDED_ENTRY]: embedded,
    [INLINES.EMBEDDED_ENTRY]: embedded,
  },
}

export default function ContentfulKit({
  kitName,
  metaDescription,
  path,
  sidebar,
  sections,
  ogImage,
}: Props) {
  const children = sections.map((section) => {
    return {
      id: section.slug,
      children: documentToReactComponents(section.contentField, OPTIONS),
    }
  })

  return (
    <Page
      pages={sidebar}
      sections={children}
      title={`${kitName}`}
      kitName={kitName}
      path={`/experience/${path}`}
      metaDescription={metaDescription}
      ogImage={ogImage}
    />
  )
}
