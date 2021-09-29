import * as React from "react";
import OpenGraph from "src/header/OpenGraph";
import Cover from "./Cover";
import { GridRow } from "src/layout/Grid2";
import { css } from "@emotion/react";
import { cellSwitch } from "src/public-sector/cellSwitch";
import HR from "src/contentful/HorizontalRule";
import { WHEN_DESKTOP } from "src/estyles";
export default function Home(props) {
    return (<div css={rootCss}>
      <OpenGraph title={props.title} description={props.description} path={"/"} image={`https:${props.openGraph?.fields?.file?.url}`}/>
      <Cover title={props.cover?.title} subtitle={props.cover?.subTitle} press={props.press}/>
      {props.sections.map((section) => {
            if (section.sys.contentType.sys.id === "grid-row") {
                const fields = section.fields;
                return (<GridRow darkMode={fields.darkMode} key={section.sys.id} id={fields.id} columns={fields.columns} css={css(fields.cssStyle, fields.desktopCss && { [WHEN_DESKTOP]: fields.desktopCss })}>
              {fields.cells.map((cell) => cellSwitch(cell, fields.darkMode, fields.columns))}
            </GridRow>);
            }
            else if (section.sys.contentType.sys.id === "horizontal") {
                const hr = section.fields;
                return <HR key={section.sys.id} darkMode={hr.darkMode}/>;
            }
            else {
                console.log("no rendered for", section.sys.contentType.sys.id);
            }
        })}
    </div>);
}
const rootCss = css({
    display: "flex",
    position: "relative",
    flexDirection: "column",
    overflow: "hidden",
    maxWidth: "100vw",
});
//# sourceMappingURL=Home.jsx.map