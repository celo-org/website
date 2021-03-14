import { RenderNode } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import dynamic from "next/dynamic"
import { Asset } from 'contentful'
import * as React from 'react'
import { Text } from 'react-native'
const YouTube = dynamic<{videoId:string}>(import('react-youtube'))
import { contentfulToProps } from 'src/experience/grants/contentfulToProps'
const DirectorySection = dynamic(import('src/experience/grants/DirectorySection'))
const IdeaReadiness = dynamic(import( 'src/experience/grants/IdeaReadiness'))
const JourneySteps  = dynamic(import('src/experience/grants/JourneySteps'))
import { H1, H2, H3, H4 } from 'src/fonts/Fonts'
import Button from 'src/shared/Button.3'
import InlineAnchor from 'src/shared/InlineAnchor'
import { fonts, standardStyles } from 'src/styles'
import { Content, Tile } from 'src/experience/common/Tile'
import { css } from '@emotion/react'
import LogoGallary from "src/public-sector/LogoGallary"

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
    const file = (node.data.target as Asset).fields.file
    return <img src={file.url} style={file.details.image} width={file.details.image?.width} height={file.details.image?.width} />
  },
  [BLOCKS.EMBEDDED_ENTRY]: embedded,
  [INLINES.EMBEDDED_ENTRY]: embedded,
}

function embedded(node) {
  const fields = node.data.target.fields
  switch (node.data?.target?.sys?.contentType?.sys?.id) {
    case 'button':
      return (
        <Button
          text={fields.words}
          href={fields.href || fields.assetLink?.fields?.file?.url}
          kind={fields.kind}
        />
      )
    case 'grid':
      const numberAcross = node.data.target.fields.by
      const ratio = node.data.target.fields.tileRatio
      return (
        <div css={gridCss}>
          {node.data.target.fields.content.map((content: Content) => (
            <Tile
              key={content.sys.id}
              content={content}
              numberAcross={numberAcross}
              ratio={ratio}
            />
          ))}
        </div>
      )
    case 'iFrameEmbed':
      const url = node.data.target.fields.url
      return <iframe src={url} height="500px" />
    case 'video':
      return <YouTube videoId={fields.youtubeID} />
    case 'grantDirectorySection':
      return (
        <DirectorySection
          name={fields.name}
          description={fields.categoryDescription}
          items={fields.items.map(contentfulToProps)}
        />
      )
    case 'grantIdeaReadiness':
      return <IdeaReadiness title={fields.title} caption={fields.caption} stages={fields.stages} />
    case 'steps':
      return <JourneySteps steps={fields.steps} term={fields.stepTerm} />
    case "logoGallery":
      return (
        <LogoGallary
          key={node.data?.target?.sys?.id}
          list={(fields.list)}
        />
      )

      default:
      console.info(node.data?.target?.sys?.contentType?.sys?.id)
      return null
  }
}

const gridCss = css({
  flexWrap: 'wrap',
  flexDirection: 'row',
  marginHorizontal: -10
})
