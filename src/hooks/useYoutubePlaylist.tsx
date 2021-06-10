import { useAsync } from "react-async-hook"
import { Props } from "src/shared/Thumbnail"
import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

const KEY = publicRuntimeConfig.YT_KEY

// https://developers.google.com/youtube/v3/docs/playlistItems/list
async function playlistfetcher(listId: string) {
  if (listId) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${listId}&maxResults=45&part=contentDetails,snippet&key=${KEY}`
    )
    return response.json()
  }
}
export function useYoutube(id: string): undefined | Props[] {
  const ytData = useAsync(playlistfetcher, [id])
  return ytData?.result?.items?.map(itemToThumbnailProps)
}

interface YTThumbnail {
  url: string
  width: number
  height: number
}

interface YouTubeItem {
  kind: "youtube#playlistItem"
  etag: string
  id: string
  snippet: {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
      default: YTThumbnail
      medium: YTThumbnail
      high: YTThumbnail
      standard: YTThumbnail
    }
    channelTitle: "Celo Org"
    playlistId: string
    position: number
    resourceId: { kind: "youtube#video"; videoId: string }
    videoOwnerChannelTitle: "Celo Org"
    videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw"
  }
  contentDetails: {
    videoId: string
    videoPublishedAt: string // "2020-06-23T10:26:02Z"
  }
}

function itemToThumbnailProps(item: YouTubeItem): Props {
  const title = item.snippet.title
  const image = item.snippet.thumbnails.medium.url
  const link = `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
  const altText = item.snippet.description
  return { image, title, link, altText, id: item.id }
}
