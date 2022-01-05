import * as React from "react"
import DownloadButton from "src/experience/brandkit/DownloadButton"
import { AssetTypes } from "src/experience/brandkit/tracking"
import Fade from "src/shared/AwesomeFade"
import { css } from "@emotion/react"
import { fonts } from "src/estyles"

interface Props {
  name: string
  tags: string[]
  preview: string
  uri: string
  assetType: AssetTypes
}

export default React.memo(function Showcase({ name, tags, preview, uri, assetType }: Props) {
  const trackingData = React.useMemo(
    () => ({ name: `${name} ${assetType}`, type: assetType }),
    [name, assetType]
  )
  return (
    <div css={rootStyle}>
      <Fade duration={FADE_MS}>
        <div>
          <img src={preview} width={164} height={52} css={previewStyle} />
          <h6 css={titleStyle}>{name?.trimLeft()}</h6>
          <ul css={keyWordCss}>
            {tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
          {uri && <DownloadButton uri={uri} trackingData={trackingData} />}
        </div>
      </Fade>
    </div>
  )
})

const FADE_MS = 400

const rootStyle = css({
  width: 200,
  margin: 10,
  marginTop: 36,
})

const previewStyle = css({
  marginBottom: 16,
  marginTop: 16,
})

const keyWordCss = css(fonts.legal, {
  paddingInlineStart: "1rem",
  marginBottom: 16,
  lineHeight: 1.375,
})

const titleStyle = css(fonts.h6, { margin: "8px 0" })
