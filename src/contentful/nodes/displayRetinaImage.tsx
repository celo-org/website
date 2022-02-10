import { Asset } from "contentful"

export function displayedImageSize(
  asset: Asset,
  parentDirective?: 1 | 2
): { width: number; height: number } {
  const size = asset?.fields?.file?.details?.image

  if (size && displayRetinaImage(asset, parentDirective)) {
    return {
      width: size.width / (parentDirective || 2),
      height: size.height / (parentDirective || 2),
    }
  } else {
    return size
  }
}

export function displayRetinaImage(asset: Asset, parentDirective?: 1 | 2) {
  const isNotSVG = asset.fields.file.contentType !== "image/svg+xml"
  const hasParentDirective = parentDirective && parentDirective > 1
  return (hasParentDirective || taggedRetina(asset)) && isNotSVG
}

function taggedRetina(asset: Asset) {
  return asset.metadata.tags.find((tag) => tag.sys.id === "retina2x")
}
