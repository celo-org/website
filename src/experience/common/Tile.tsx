import { Asset, Sys } from 'contentful'
import * as React from 'react'
import { AssetTypes } from 'src/experience/brandkit/tracking'
import Showcase from 'src/experience/common/Showcase'
import { ScreenSizes, useScreenSize } from 'src/layout/ScreenSize'

export interface Content {
  sys: Sys
  fields: {
    description: string
    title: string
    image: Asset
    download: Asset
  }
}
// Contentful sends these values as strings
type NumberAcross = '2' | '3' | '4'
interface TileProps {
  content: Content
  numberAcross: NumberAcross
  ratio: number
}
export function Tile({ content, numberAcross, ratio }: TileProps) {
  const size = useTileSize(numberAcross)
  const { width, height } = content?.fields?.image?.fields?.file?.details?.image || {}
  const realRatio = width && height ? width / height : ratio || 1
  return (
    <Showcase
      key={content.sys.id}
      ratio={realRatio || 1}
      assetType={AssetTypes.illustration}
      description={content.fields.description}
      name={content.fields.title}
      preview={content?.fields?.image?.fields?.file?.url}
      uri={content?.fields?.download?.fields?.file?.url.replace("http:", "")}
      loading={false}
      size={size} />
  )
}
function useTileSize(numberAcross: NumberAcross) {
  const { screen } = useScreenSize()

  if (numberAcross === '2') {
    switch (screen) {
      case ScreenSizes.DESKTOP:
        return 350
      case ScreenSizes.MOBILE:
        return 345
      case ScreenSizes.TABLET:
        return 222
    }
  } else if (numberAcross === '3') {
    switch (screen) {
      case ScreenSizes.DESKTOP:
        return 226
      case ScreenSizes.MOBILE:
        return '100%'
      case ScreenSizes.TABLET:
        return 180
    }
  } else if (numberAcross === '4') {
    return 165
  }
}