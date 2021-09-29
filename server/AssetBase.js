import getConfig from "next/config";
import { fetchCached, MINUTE } from "./cache";
import airtableInit from "./airtable";
const ASSSET_FIELD_LIGHT = "Assets (on light bg)";
const ASSSET_FIELD_DARK = "Assets (on dark bg)";
export var AssetSheet;
(function (AssetSheet) {
    AssetSheet["Tags"] = "Tags";
    AssetSheet["Icons"] = "Icons";
    AssetSheet["Illustrations"] = "Illustrations";
    AssetSheet["AbstractGraphics"] = "Abstract Graphics";
})(AssetSheet || (AssetSheet = {}));
export default async function combineTagsWithAssets(sheet) {
    const [tags, assets] = await Promise.all([getTags(), getAssets(sheet)]);
    return assets.map((record) => normalize(record.fields, record.id, tags));
}
async function getAssets(sheet) {
    return fetchCached(`brand-assets-${sheet}`, "en", 3 * MINUTE, () => fetchAssets(sheet));
}
async function getTags() {
    return fetchCached(`brand-assets-tags`, "en", 3 * MINUTE, fetchTags);
}
async function fetchTags() {
    const tags = {};
    await getAirtable(AssetSheet.Tags)
        .select({
        pageSize: 100,
    })
        .eachPage((records, fetchNextPage) => {
        records.forEach((tag) => (tags[tag.id] = tag.fields));
        fetchNextPage();
    });
    return tags;
}
async function fetchAssets(sheet) {
    const assets = [];
    await getAirtable(sheet)
        .select({
        pageSize: 100,
        filterByFormula: `AND(${IS_APROVED}, ${TERMS_SIGNED})`,
        sort: [{ field: "Order", direction: "asc" }],
    })
        .eachPage((records, fetchNextPage) => {
        records.forEach((r) => assets.push(r));
        fetchNextPage();
    });
    return assets;
}
function getAirtable(sheet) {
    return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_BRANDKIT_ID)(sheet);
}
const IS_APROVED = "Approved=1";
const TERMS_SIGNED = "Terms=1";
function normalize(asset, id, tags) {
    return {
        name: asset.Name,
        description: asset.Description,
        preview: getPreview(asset),
        uri: getURI(asset),
        tags: (asset.Tags || []).map((tagID) => tags[tagID].Name),
        id,
    };
}
export const _normalize = normalize;
function getPreview(asset) {
    const previewField = asset.Preview || asset[ASSSET_FIELD_LIGHT];
    return ((previewField &&
        previewField[0] &&
        previewField[0].thumbnails &&
        previewField[0].thumbnails.large.url) ||
        "");
}
function getURI(asset) {
    return (asset.Zip && asset.Zip[0] && asset.Zip[0].url) || "";
}
//# sourceMappingURL=AssetBase.js.map