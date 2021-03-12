// import { css } from "@emotion/react"
import {
  RenderNode,
  NodeRenderer,
  // documentToReactComponents,
} from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
// import { Asset } from "contentful"
import LogoGallary from "src/public-sector/LogoGallary"


const embeddedNode: NodeRenderer = (node) => {
  const target = node.data.target
  const fields = target.fields
  const id = target.sys.contentType.sys.id
  switch (id) {
  case "logoGallery":
    return (
      <LogoGallary
        key={target.sys.id}
        list={(fields.list)}
      />
    )
  }
}


const renderNode: RenderNode = {
  // [INLINES.HYPERLINK]: hyperLink,
  [INLINES.EMBEDDED_ENTRY]: embeddedNode,
  [BLOCKS.EMBEDDED_ENTRY]: embeddedNode,
  // [BLOCKS.EMBEDDED_ASSET]: assetRender,
}

export default {
  renderNode,
}
