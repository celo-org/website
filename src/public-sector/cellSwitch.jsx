import { FreeContent } from "src/contentful/grid2-cells/FreeContent";
import Roledex from "src/contentful/grid2-cells/Roledex";
import PlayList from "src/contentful/grid2-cells/Playlist";
import Blurb from "src/contentful/grid2-cells/Blurb";
import Form from "src/contentful/grid2-cells/Form";
import { Heading } from "src/contentful/grid2-cells/Heading";
import * as React from "react";
import Picture from "./Picture";
export function cellSwitch(entry, darkMode, columns) {
    if (entry) {
        switch (entry.sys.contentType.sys.id) {
            case "roledex":
                const roledex = entry.fields;
                return <Roledex key={entry.sys.id} title={roledex.title} sheets={roledex.sheets}/>;
            case "freeContent":
                const freeContent = entry.fields;
                return (<FreeContent key={entry.sys.id} colSpan={freeContent.colSpan} body={freeContent.body} darkMode={darkMode} cssStyle={freeContent.cssStyle} listStyleImage={freeContent.listStyleImage}/>);
            case "form":
                const formFields = entry.fields;
                return (<Form key={entry.sys.id} route={formFields.route} layout={formFields.layout} fields={formFields.fields} colSpan={formFields.colSpan} submitText={formFields.submitText}/>);
            case "proposition":
                const blurbProp = entry.fields;
                return (<Blurb key={entry.sys.id} title={blurbProp.title} titleType={blurbProp.titleType} body={blurbProp.body} darkMode={darkMode} link={blurbProp.link} icon={blurbProp.icon} isNaturalSize={blurbProp.isNaturalSize} newIcon={blurbProp.newIcon}/>);
            case "picture":
                const picture = entry.fields;
                return <Picture key={entry.sys.id} {...picture}/>;
            case "youTubePlayist":
                const playlist = entry.fields;
                return (<PlayList key={entry.sys.id} media={playlist.media} title={playlist.title} description={playlist.description} listId={playlist.listId}/>);
            case "heading":
                const heading = entry.fields;
                return (<Heading key={entry.sys.id} darkMode={darkMode} span={columns} title={heading.title} displayTitleH1={heading.displayTitleH1} subTitle={heading.subTitle} titleCss={heading.titleCss} subTitleCss={heading.subTitleCss} cssStyle={heading.cssStyle} image={heading.image}/>);
        }
    }
    return null;
}
//# sourceMappingURL=cellSwitch.jsx.map