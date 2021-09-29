import { useAsync } from "react-async-hook";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();
const KEY = publicRuntimeConfig.YT_KEY;
async function playlistfetcher(listId) {
    if (listId) {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?playlistId=${listId}&maxResults=45&part=contentDetails,snippet&key=${KEY}`);
        return response.json();
    }
}
export function useYoutube(id) {
    const ytData = useAsync(playlistfetcher, [id]);
    return ytData?.result?.items?.filter(filterer).map(itemToThumbnailProps);
}
function filterer(item) {
    return item.contentDetails.videoPublishedAt;
}
function itemToThumbnailProps(item) {
    const title = item.snippet.title;
    const image = item.snippet.thumbnails?.medium?.url;
    const link = `https://www.youtube.com/watch?v=${item.contentDetails.videoId}`;
    const altText = item.snippet.description;
    return { image, title, link, altText, id: item.id };
}
//# sourceMappingURL=useYoutubePlaylist.jsx.map