import { Entry } from "contentful"
import { FreeContent } from "src/contentful/grid2-cells/FreeContent"
import Blurb, { Props as BlurbProps } from "src/contentful/grid2-cells/Blurb"
import { CellContentType, FreeContentType } from "src/utils/contentful"

export function cellSwitch(entry: Entry<CellContentType>, darkMode: boolean) {
  if (entry) {
    switch (entry.sys.contentType.sys.id) {
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
    }
  }
  return null
}
