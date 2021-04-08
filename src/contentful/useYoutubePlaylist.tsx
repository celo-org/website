import { useAsync } from "react-async-hook"
import {Props} from 'src/contentful/Thumbnail'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

const KEY = publicRuntimeConfig.YT_KEY

async function playlistfetcher(listId: string) {
  if (listId) {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${listId}&part=contentDetails,snippet&key=${KEY}`
    )
    return response.json()
  }
}
export function useYoutube(id: string): undefined | Props[] {
  const ytData = useAsync(playlistfetcher, [id])
  return ytData?.result?.items?.map(itemToThumbnailProps)
}

interface YTThumbnail {
  url: string,
  width: number,
  height: number,
}

interface YouTubeItem {
  kind: "youtube#playlistItem",
  etag: string,
  id: string,
  snippet: {
    publishedAt: string,
    channelId: string,
    title: string,
    description: string
    thumbnails: {
      default: YTThumbnail,
      medium: YTThumbnail,
      high: YTThumbnail,
      standard: YTThumbnail,
    },
    channelTitle: "Celo Org",
    playlistId: string,
    position: number,
    resourceId: { kind: "youtube#video", videoId: string },
    videoOwnerChannelTitle: "Celo Org",
    videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
  },
  contentDetails: {
    videoId: string,
    videoPublishedAt: string // "2020-06-23T10:26:02Z"
  }
}

function itemToThumbnailProps(item: YouTubeItem): Props {
  const title = item.snippet.title
  const image = item.snippet.thumbnails.medium.url
  const link = `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`
  const altText = item.snippet.description
  return {image, title, link, altText}
}

// const example = {
//   kind: "youtube#playlistItemListResponse",
//   etag: "ojz7SHooQ5OW6A_1fc8-0ouBk_E",
//   nextPageToken: "CAUQAA",
//   items: [
//     {
//       kind: "youtube#playlistItem",
//       etag: "AKutZCmgR7krhUXnZvS4uDyl0bI",
//       id:
//         "UExzUWJzb3A3M2NmRVkxRHo0WXlYMlM0Vk5wYW1vemoxdi41NkI0NEY2RDEwNTU3Q0M2",
//       snippet: {
//         publishedAt: "2020-06-23T10:22:11Z",
//         channelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//         title: "Types of Stablecoins",
//         description:
//           "Markus Franke of cLabs, who works on Celo, on the different types of stablecoins.",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/0XB_2O6FsIk/default.jpg",
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: "https://i.ytimg.com/vi/0XB_2O6FsIk/mqdefault.jpg",
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: "https://i.ytimg.com/vi/0XB_2O6FsIk/hqdefault.jpg",
//             width: 480,
//             height: 360,
//           },
//           standard: {
//             url: "https://i.ytimg.com/vi/0XB_2O6FsIk/sddefault.jpg",
//             width: 640,
//             height: 480,
//           },
//         },
//         channelTitle: "Celo Org",
//         playlistId: "PLsQbsop73cfEY1Dz4YyX2S4VNpamozj1v",
//         position: 0,
//         resourceId: { kind: "youtube#video", videoId: "0XB_2O6FsIk" },
//         videoOwnerChannelTitle: "Celo Org",
//         videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//       },
//       contentDetails: {
//         videoId: "0XB_2O6FsIk",
//         videoPublishedAt: "2020-06-23T10:26:02Z",
//       },
//     },
//     {
//       kind: "youtube#playlistItem",
//       etag: "MBU2Rrv7LPXT7RWBmhaeUGiAuPo",
//       id:
//         "UExzUWJzb3A3M2NmRVkxRHo0WXlYMlM0Vk5wYW1vemoxdi4yODlGNEE0NkRGMEEzMEQy",
//       snippet: {
//         publishedAt: "2020-06-23T10:36:25Z",
//         channelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//         title: "Stability Protocol",
//         description: "",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/lfbouGPNbQY/default.jpg",
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: "https://i.ytimg.com/vi/lfbouGPNbQY/mqdefault.jpg",
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: "https://i.ytimg.com/vi/lfbouGPNbQY/hqdefault.jpg",
//             width: 480,
//             height: 360,
//           },
//           standard: {
//             url: "https://i.ytimg.com/vi/lfbouGPNbQY/sddefault.jpg",
//             width: 640,
//             height: 480,
//           },
//         },
//         channelTitle: "Celo Org",
//         playlistId: "PLsQbsop73cfEY1Dz4YyX2S4VNpamozj1v",
//         position: 1,
//         resourceId: { kind: "youtube#video", videoId: "lfbouGPNbQY" },
//         videoOwnerChannelTitle: "Celo Org",
//         videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//       },
//       contentDetails: {
//         videoId: "lfbouGPNbQY",
//         videoPublishedAt: "2020-06-23T10:48:24Z",
//       },
//     },
//     {
//       kind: "youtube#playlistItem",
//       etag: "jHUfZTxXSNZmd9Z0_S2tDxTQUFg",
//       id:
//         "UExzUWJzb3A3M2NmRVkxRHo0WXlYMlM0Vk5wYW1vemoxdi4wMTcyMDhGQUE4NTIzM0Y5",
//       snippet: {
//         publishedAt: "2020-06-23T12:20:45Z",
//         channelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//         title: "Stability Research",
//         description: "",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/HHn5PmCPt0M/default.jpg",
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: "https://i.ytimg.com/vi/HHn5PmCPt0M/mqdefault.jpg",
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: "https://i.ytimg.com/vi/HHn5PmCPt0M/hqdefault.jpg",
//             width: 480,
//             height: 360,
//           },
//           standard: {
//             url: "https://i.ytimg.com/vi/HHn5PmCPt0M/sddefault.jpg",
//             width: 640,
//             height: 480,
//           },
//         },
//         channelTitle: "Celo Org",
//         playlistId: "PLsQbsop73cfEY1Dz4YyX2S4VNpamozj1v",
//         position: 2,
//         resourceId: { kind: "youtube#video", videoId: "HHn5PmCPt0M" },
//         videoOwnerChannelTitle: "Celo Org",
//         videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//       },
//       contentDetails: {
//         videoId: "HHn5PmCPt0M",
//         videoPublishedAt: "2020-06-23T12:16:45Z",
//       },
//     },
//     {
//       kind: "youtube#playlistItem",
//       etag: "kNCVeCanJO-pnVCES0A73BmBY0E",
//       id:
//         "UExzUWJzb3A3M2NmRVkxRHo0WXlYMlM0Vk5wYW1vemoxdi41MjE1MkI0OTQ2QzJGNzNG",
//       snippet: {
//         publishedAt: "2020-07-21T09:27:25Z",
//         channelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//         title: "Managing Financial Crime Risk on Distributed Ledgers",
//         description: "",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/iYMDejO6uYc/default.jpg",
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: "https://i.ytimg.com/vi/iYMDejO6uYc/mqdefault.jpg",
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: "https://i.ytimg.com/vi/iYMDejO6uYc/hqdefault.jpg",
//             width: 480,
//             height: 360,
//           },
//           standard: {
//             url: "https://i.ytimg.com/vi/iYMDejO6uYc/sddefault.jpg",
//             width: 640,
//             height: 480,
//           },
//         },
//         channelTitle: "Celo Org",
//         playlistId: "PLsQbsop73cfEY1Dz4YyX2S4VNpamozj1v",
//         position: 3,
//         resourceId: { kind: "youtube#video", videoId: "iYMDejO6uYc" },
//         videoOwnerChannelTitle: "Celo Org",
//         videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//       },
//       contentDetails: {
//         videoId: "iYMDejO6uYc",
//         videoPublishedAt: "2020-07-21T10:06:35Z",
//       },
//     },
//     {
//       kind: "youtube#playlistItem",
//       etag: "sky_B6zllTCoENaDQbF1U9rdMM4",
//       id:
//         "UExzUWJzb3A3M2NmRVkxRHo0WXlYMlM0Vk5wYW1vemoxdi4wOTA3OTZBNzVEMTUzOTMy",
//       snippet: {
//         publishedAt: "2020-07-21T10:19:53Z",
//         channelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//         title: "Influencing the Velocity of Central Bank Digital Currencies",
//         description: "",
//         thumbnails: {
//           default: {
//             url: "https://i.ytimg.com/vi/yxKtDcHs9dI/default.jpg",
//             width: 120,
//             height: 90,
//           },
//           medium: {
//             url: "https://i.ytimg.com/vi/yxKtDcHs9dI/mqdefault.jpg",
//             width: 320,
//             height: 180,
//           },
//           high: {
//             url: "https://i.ytimg.com/vi/yxKtDcHs9dI/hqdefault.jpg",
//             width: 480,
//             height: 360,
//           },
//           standard: {
//             url: "https://i.ytimg.com/vi/yxKtDcHs9dI/sddefault.jpg",
//             width: 640,
//             height: 480,
//           },
//         },
//         channelTitle: "Celo Org",
//         playlistId: "PLsQbsop73cfEY1Dz4YyX2S4VNpamozj1v",
//         position: 4,
//         resourceId: { kind: "youtube#video", videoId: "yxKtDcHs9dI" },
//         videoOwnerChannelTitle: "Celo Org",
//         videoOwnerChannelId: "UCCZgos_YAJSXm5QX5D5Wkcw",
//       },
//       contentDetails: {
//         videoId: "yxKtDcHs9dI",
//         videoPublishedAt: "2020-07-21T10:28:09Z",
//       },
//     },
//   ],
//   pageInfo: { totalResults: 7, resultsPerPage: 5 },
// }
