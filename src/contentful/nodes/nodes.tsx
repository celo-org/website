import { RenderNode } from "@contentful/rich-text-react-renderer"
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import dynamic from "next/dynamic"
import { Asset } from "contentful"
import * as React from "react"
import { Text } from "react-native"
export const YouTube = dynamic<{ videoId: string }>(import("react-youtube"))
export const DirectorySection = dynamic(import("src/experience/grants/DirectorySection"))
export const IdeaReadiness = dynamic(import("src/experience/grants/IdeaReadiness"))
export const JourneySteps = dynamic(import("src/experience/grants/JourneySteps"))
import { H1, H2, H3, H4 } from "src/fonts/Fonts"
import InlineAnchor from "src/shared/InlineAnchor"
import { fonts, standardStyles } from "src/styles"
import Image from "next/image"

export const renderNode: RenderNode = {
  [BLOCKS.HEADING_1]: (_, children: string) => {
    return <H1>{children}</H1>
  },
  [BLOCKS.HEADING_2]: (_, children: string) => {
    return <H2 style={standardStyles.blockMarginTopTablet}>{children}</H2>
  },
  [BLOCKS.HEADING_3]: (_, children: string) => {
    return <H3 style={standardStyles.blockMarginTopTablet}>{children}</H3>
  },
  [BLOCKS.HEADING_4]: (_, children: string) => {
    return <H4 style={standardStyles.elementalMargin}>{children}</H4>
  },
  [BLOCKS.HEADING_5]: (_, children: string) => {
    return <Text style={fonts.h5}>{children}</Text>
  },
  [BLOCKS.PARAGRAPH]: (_, children: string) => {
    return <Text style={[fonts.p, standardStyles.halfElement]}>{children}</Text>
  },
  [INLINES.HYPERLINK]: (node, children: string) => {
    return <InlineAnchor href={node.data.uri}>{children}</InlineAnchor>
  },
  [BLOCKS.EMBEDDED_ASSET]: (node) => {
    const asset = node.data.target as Asset
    const file = asset.fields.file
    return (
      <div
        style={{
          width: "100%",
          maxWidth: file.details.image?.width,
          maxHeight: file.details.image?.height,
        }}
      >
        <Image
          layout={"responsive"}
          src={`https:${file.url}`}
          alt={asset.fields.description}
          width={file.details.image?.width}
          height={file.details.image?.height}
        />
      </div>
    )
  },
}
