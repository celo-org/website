import {css} from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { getPageBySlug, ContentfulPage, GridRowContentType, SectionType } from 'src/utils/contentful'
import { flex } from 'src/estyles'
import { GridRow } from 'src/layout/Grid2'
import OpenGraph from 'src/header/OpenGraph'
import {renderNode} from "src/experience/contentful/nodes"
import { cellSwitch } from "./cellSwitch"

type Props = ContentfulPage<GridRowContentType | SectionType>

export default function PublicSectorPage(props: Props) {
  return <>
      <OpenGraph title={props.title} description={props.description}  path={props.slug}/>
      <div css={rootCss}>
          {props.sections.map(section => {
            if (section.sys.contentType.sys.id === 'grid-row') {
              const fields = section.fields as GridRowContentType
              return (
                <GridRow key={section.sys.id} id={fields.id} columns={fields.columns} css={css(fields.cssStyle)}>
                  {fields.cells.map((cell) => cellSwitch(cell, fields.columns))}
                </GridRow>
              )
            } else  {
              const fields = section.fields as SectionType

              return <GridRow key={section.sys.id} id={fields.slug} columns={1}>
                  {documentToReactComponents(fields.contentField, {renderNode})}
              </GridRow>
            }
          })}
      </div>
  </>
}

const rootCss = css(flex, {
  marginTop: 100
})

export async function getServerSideProps() {
  const page = await getPageBySlug("public-sector", {locale: 'en-US'}, true)
  return {props: page }
}
