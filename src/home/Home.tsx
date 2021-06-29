import * as React from "react"
import OpenGraph from "src/header/OpenGraph"
import celoHero from "src/home/celo-hero.png"
import Cover from "./Cover"
import Press from "src/press/Press"
import { useScreenSize } from "src/layout/ScreenSize"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import { css } from "@emotion/react"
import { GridRow } from "src/layout/Grid2"
import { cellSwitch } from "./cellSwitch"
type Props = ContentfulPage<GridRowContentType>

export default function Home(props: Props) {
  const { isMobile } = useScreenSize()
  return (
    <div css={rootCss}>
      <OpenGraph
        title={props.title}
        description={props.description}
        path={"/"}
        image={celoHero}
      />
      <Cover />
      {!isMobile && <Press />}
      {props.sections.map(section => {
        if (section.sys.contentType.sys.id === "grid-row") {
          const fields = section.fields as GridRowContentType
          return (
            <GridRow
              darkMode={fields.darkMode}
              key={section.sys.id}
              id={fields.id}
              columns={fields.columns}
              css={css(fields.cssStyle)}
            >
              {fields.cells.map((cell) => cellSwitch(cell, fields.darkMode))}
            </GridRow>
          )
        } else {
          console.log("no rendered for", section.sys.contentType.sys.id)
        }
      })
      }
    </div >
  )
}

const rootCss = css({
  display: "flex",
  position: "relative",
  flexDirection: "column",
  overflow: "hidden",
  maxWidth: "100vw",
})
