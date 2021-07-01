import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { cellSwitch } from "./cellSwitch"
import { Entry } from "contentful"
import {
  ContentfulPage,
  GridRowContentType,
  SectionType,
  CoverContentType,
  FormContentType,
} from "src/utils/contentful"
import { flex, WHEN_DESKTOP, WHEN_MOBILE } from "src/estyles"
import { GridRow } from "src/layout/Grid2"
import OpenGraph from "src/header/OpenGraph"
import { renderNode } from "src/contentful/nodes/nodes"
import { BUTTON } from "src/contentful/nodes/embeds/BUTTON"
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY"
import { TABLE } from "src/contentful/nodes/embeds/TABLE"
import { BLOCKS, INLINES, Block } from "@contentful/rich-text-types"
import Cover from "src/contentful/Cover"
import { ROW } from "src/contentful/nodes/embeds/ROW"

type Props = ContentfulPage<GridRowContentType | SectionType>

const EMBEDDABLE = {
  ...BUTTON,
  ...GALLARY,
  ...TABLE,
  ...ROW,
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
          css={css(
            sectionsCss,
            gridFields.cssStyle,
            gridFields.desktopCss && { [WHEN_DESKTOP]: gridFields.desktopCss }
          )}
        >
          {gridFields.cells.map((cell) =>
            cellSwitch(cell, gridFields.darkMode, gridFields.columns)
          )}
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

const sectionsCss = css({
  paddingTop: 80,
  paddingBottom: 80,
  [WHEN_MOBILE]: {
    paddingTop: 24,
    paddingBottom: 24,
  },
})
