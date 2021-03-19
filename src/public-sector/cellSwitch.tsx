import { Entry } from 'contentful'
import { CellContentType, FreeContentType } from 'src/utils/contentful'
import Blurb, { Props as BlurbProps } from "./Blurb"
import { FreeContent } from "./FreeContent"

export function cellSwitch(entry: Entry<CellContentType>, columns: number, darkMode: boolean) {
  if (entry) {
    switch (entry.sys.contentType.sys.id) {
      case "freeContent":
        const freeContent = entry.fields as FreeContentType
        return <FreeContent
          colSpan={freeContent.colSpan || columns}
          body={freeContent.body}
          cssStyle={freeContent.cssStyle}
          darkMode={darkMode}
          backgroundColor={freeContent.backgroundColor} />
      case "proposition":
        const blurbProp = entry.fields as BlurbProps
        return <Blurb
          key={entry.sys.id}
          title={blurbProp.title}
          titleType={blurbProp.titleType}
          body={blurbProp.body}
          darkMode={blurbProp.darkMode || darkMode}
          link={blurbProp.link}
          icon={blurbProp.icon} />
    }
  }
  return null
}
