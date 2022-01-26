import { css } from "@emotion/react"
import * as React from "react"
import FullStack from "src/dev/FullStack"
import { flex } from "src/estyles"
import OpenGraph from "src/header/OpenGraph"
import { pageSwitch } from "src/public-sector/CommonContentFullPage"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"

export default function Developers(props: ContentfulPage<GridRowContentType>) {
  const items = props.sections.map(pageSwitch)
  items.splice(3, 0, <FullStack />)
  return (
    <>
      <OpenGraph
        image={props.openGraph?.fields?.file?.url}
        title={props.title}
        description={props.description}
        path={props.slug}
      />
      <div css={rootCss}>{props.sections ? items : <></>}</div>
    </>
  )
}

const rootCss = css(flex, {})
