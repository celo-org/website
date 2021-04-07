import {css} from "@emotion/react"
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Entry } from 'contentful'
import { getPageBySlug, ContentfulPage, GridRowContentType, SectionType, CellContentType,
  FreeContentType, RoledexContentType, PlaylistContentType } from 'src/utils/contentful'
import { flex } from 'src/estyles'
import { GridRow } from 'src/layout/Grid2'
import OpenGraph from 'src/header/OpenGraph'
import Blurb, {Props as BlurbProps} from "./Blurb"
import {renderNode} from "src/experience/contentful/nodes"
import { FreeContent } from "src/contentful/FreeContent"
import Roledex from "src/public-sector/Roledex"
import PlayList from "src/contentful/Playlist"

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

function cellSwitch(entry: Entry<CellContentType>, columns: number) {
  if (entry) {
    switch (entry.sys.contentType.sys.id) {
      case "roledex":
        const roledex = entry.fields as RoledexContentType
          return <Roledex key={entry.sys.id}
                  title={roledex.title}
                  sheets={roledex.sheets}
          />
      case "freeContent":
        const freeContent = entry.fields as FreeContentType
        return <FreeContent
                key={entry.sys.id}
                colSpan={columns}
                body={freeContent.body}
                cssStyle={freeContent.cssStyle}
                backgroundColor={freeContent.backgroundColor}
                />
      case  "proposition":
        const blurbProp = entry.fields as BlurbProps
        return <Blurb
                  key={entry.sys.id}
                  title={blurbProp.title}
                  titleType={blurbProp.titleType}
                  body={blurbProp.body}
                  link={blurbProp.link}
                  icon={blurbProp.icon}
                />
      case "youTubePlayist":
      const  playlist = entry.fields as PlaylistContentType
      return <PlayList key={entry.sys.id} title={playlist.title } description={playlist.description} listId={playlist.listId} />
    }
  }
  return null
}

export async function getServerSideProps() {
  const page = await getPageBySlug("public-sector", {locale: 'en-US'}, true)
  return {props: page }
}
