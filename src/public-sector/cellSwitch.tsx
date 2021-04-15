import { Entry } from 'contentful'
import { FreeContent } from "src/contentful/grid2-cells/FreeContent"
import Roledex from "src/contentful/grid2-cells/Roledex"
import PlayList from "src/contentful/grid2-cells/Playlist"
import Blurb, {Props as BlurbProps} from "src/contentful/grid2-cells/Blurb"
import {  CellContentType, FreeContentType, RoledexContentType, PlaylistContentType } from 'src/utils/contentful'

export function cellSwitch(entry: Entry<CellContentType>, columns: number, darkMode: boolean) {
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
                colSpan={freeContent.colSpan || columns}
                body={freeContent.body}
                darkMode={darkMode}
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
                  darkMode={darkMode}
                  link={blurbProp.link}
                  icon={blurbProp.icon}
                />
      case "youTubePlayist":
      const  playlist = entry.fields as PlaylistContentType
      return <PlayList key={entry.sys.id} media={playlist.media} title={playlist.title } description={playlist.description} listId={playlist.listId} />
    }
  }
  return null
}
