import { css } from "@emotion/react"
import { documentToReactComponents } from "@contentful/rich-text-react-renderer"
import { Entry } from "contentful"
import {
  getPageBySlug,
  ContentfulPage,
  GridRowContentType,
  SectionType,

  CoverContentType,
  FormContentType,
} from "src/utils/contentful"
import { flex, WHEN_MOBILE } from "src/estyles"
import { GridRow } from "src/layout/Grid2"
import OpenGraph from "src/header/OpenGraph"
import { renderNode } from "src/contentful/nodes/nodes"
type Props = ContentfulPage<GridRowContentType | SectionType>
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { NameSpaces } from "src/i18n"
import { BUTTON } from "src/contentful/nodes/embeds/BUTTON"
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY"
import { TABLE } from "src/contentful/nodes/embeds/TABLE"
import { BLOCKS, INLINES, Block } from "@contentful/rich-text-types"
import Cover from "src/contentful/Cover"
import { cellSwitch } from "src/public-sector/cellSwitch"

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
          verticalPosition={coverFields.verticalPosition}
          superSize={coverFields.superSize}
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
  return {
    props: {
      ...page,
      ...(await serverSideTranslations("en", [NameSpaces.common, NameSpaces.dev])),
    },
  }
}
