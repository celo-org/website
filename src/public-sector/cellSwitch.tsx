import { Entry } from "contentful"
import { FreeContent } from "src/contentful/grid2-cells/FreeContent"
import Roledex from "src/contentful/grid2-cells/Roledex"
import PlayList from "src/contentful/grid2-cells/Playlist"
import Blurb, { Props as BlurbProps } from "src/contentful/grid2-cells/Blurb"
import {
  CellContentType,
  FreeContentType,
  RoledexContentType,
  PlaylistContentType,
  FormContentType,
  HeadingContentType,
  PictureType,
  IframeContentType,
} from "src/utils/contentful"
import Form from "src/contentful/grid2-cells/Form"
import { Heading } from "src/contentful/grid2-cells/Heading"
import * as React from "react"
import Picture from "./Picture"

export function cellSwitch(entry: Entry<CellContentType>, darkMode: boolean, columns?: number) {
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
            listStyleImage={freeContent.listStyleImage}
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
            isNaturalSize={blurbProp.isNaturalSize}
          />
        )
      case "picture":
        const picture = entry.fields as PictureType
        return <Picture key={entry.sys.id} {...picture} />
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
      case "heading":
        const heading = entry.fields as HeadingContentType
        return (
          <Heading
            key={entry.sys.id}
            darkMode={darkMode}
            span={columns}
            title={heading.title}
            displayTitleH1={heading.displayTitleH1}
            subTitle={heading.subTitle}
            titleCss={heading.titleCss}
            subTitleCss={heading.subTitleCss}
            cssStyle={heading.cssStyle}
            image={heading.image}
          />
        )
      case "iFrameEmbed": 
      const iframe = entry.fields as IframeContentType
      return (
        <iframe src={iframe.url} height="500" width="100%"/>  
      )
    }
  }
  return null
}
