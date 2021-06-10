import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Entry } from "contentful"
import {
  getPageBySlug,
  ContentfulPage,
  GridRowContentType,
  SectionType,
  CellContentType,
  FreeContentType,
  RoledexContentType,
  PlaylistContentType,
  CoverContentType,
  FormContentType,
} from "src/utils/contentful"
import { flex, WHEN_MOBILE } from "src/estyles"
import { GridRow } from "src/layout/Grid2"
import OpenGraph from "src/header/OpenGraph"
import Blurb, { Props as BlurbProps } from "src/contentful/grid2-cells/Blurb"
import { renderNode } from "src/contentful/nodes/nodes"
import { FreeContent } from "src/contentful/grid2-cells/FreeContent"
import Roledex from "src/contentful/grid2-cells/Roledex"
import PlayList from "src/contentful/grid2-cells/Playlist"
import Form from "src/contentful/grid2-cells/Form"
type Props = ContentfulPage<GridRowContentType | SectionType>

import { BUTTON } from "src/contentful/nodes/embeds/BUTTON"
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY"
import { TABLE } from "src/contentful/nodes/embeds/TABLE"
import { BLOCKS, INLINES, Block } from "@contentful/rich-text-types"
import Cover from "src/contentful/Cover"

const EMBEDDABLE = {
  ...BUTTON,
  ...GALLARY,
  ...TABLE,
}

function embedded(node: Block) {
  const contentType = node.data?.target?.sys?.contentType?.sys?.id
  const renderer = EMBEDDABLE[contentType]

  if (renderer) {
    return renderer(node.data.target)
  } else {
    console.info(contentType)
    return null
  }
}

const OPTIONS = {
  renderNode: {
    ...renderNode,
    [BLOCKS.EMBEDDED_ENTRY]: embedded,
    [INLINES.EMBEDDED_ENTRY]: embedded,
  },
}

export default function PublicSectorPage(props: Props) {
  return (
    <>
      <OpenGraph
        image={props.openGraph?.fields?.file?.url}
        title={props.title}
        description={props.description}
        path={props.slug}
      />
      <div css={rootCss}>{props.sections.map(pageSwitch)}</div>
    </>
  )
}

const rootCss = css(flex, {})

function pageSwitch(
  section: Entry<GridRowContentType | SectionType | CoverContentType | FormContentType>
) {
  switch (section.sys.contentType.sys.id) {
    case "cover":
      const coverFields = section.fields as CoverContentType
      return (
        <Cover
          key={section.sys.id}
          darkMode={coverFields.darkMode}
          illoFirst={coverFields.illoFirst}
          title={coverFields.title}
          subTitle={coverFields.subTitle}
          links={coverFields.links}
          imageDesktop={coverFields.imageDesktop}
          imageMobile={coverFields.imageMobile}
        />
      )
    case "grid-row":
      const gridFields = section.fields as GridRowContentType
      return (
        <GridRow
          key={section.sys.id}
          darkMode={gridFields.darkMode}
          id={gridFields.id}
          columns={gridFields.columns}
          css={css(sectionsCss, gridFields.cssStyle)}
        >
          {gridFields.cells.map((cell) => cellSwitch(cell, gridFields.darkMode))}
        </GridRow>
      )
    default:
      const sectionfields = section.fields as SectionType
      return (
        <GridRow key={section.sys.id} id={sectionfields.slug} columns={1}>
          {documentToReactComponents(sectionfields.contentField, OPTIONS)}
        </GridRow>
      )
  }
}

function cellSwitch(entry: Entry<CellContentType>, darkMode: boolean) {
  if (entry) {
    switch (entry.sys.contentType.sys.id) {
      case "roledex":
        const roledex = entry.fields as RoledexContentType
        return <Roledex key={entry.sys.id} title={roledex.title} sheets={roledex.sheets} />
      case "freeContent":
        const freeContent = entry.fields as FreeContentType
        return (
          <FreeContent
            key={entry.sys.id}
            colSpan={freeContent.colSpan}
            body={freeContent.body}
            darkMode={darkMode}
            cssStyle={freeContent.cssStyle}
            backgroundColor={freeContent.backgroundColor}
          />
        )
      case "form":
        const formFields = entry.fields as FormContentType
        return (
          <Form
            key={entry.sys.id}
            route={formFields.route}
            layout={formFields.layout}
            fields={formFields.fields}
            colSpan={formFields.colSpan}
            submitText={formFields.submitText}
          />
        )
      case "proposition":
        const blurbProp = entry.fields as BlurbProps
        return (
          <Blurb
            key={entry.sys.id}
            title={blurbProp.title}
            titleType={blurbProp.titleType}
            body={blurbProp.body}
            darkMode={darkMode}
            link={blurbProp.link}
            icon={blurbProp.icon}
          />
        )
      case "youTubePlayist":
        const playlist = entry.fields as PlaylistContentType
        return (
          <PlayList
            key={entry.sys.id}
            media={playlist.media}
            title={playlist.title}
            description={playlist.description}
            listId={playlist.listId}
          />
        )
    }
  }
  return null
}

const sectionsCss = css({
  paddingTop: 80,
  paddingBottom: 80,
  [WHEN_MOBILE]: {
    paddingTop: 24,
    paddingBottom: 24,
  },
})

export async function getServerSideProps({ params }) {
  console.info(params)
  const page = await getPageBySlug("demo", { locale: "en-US" }, true)
  return { props: page }
}
