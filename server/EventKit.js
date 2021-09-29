import airtableInit from "./airtable";
import { fetchCached, MINUTE } from "./cache";
const AIRTABLE_BASE_ID = "appjKfoHvrO5SZWdd";
export var Sheets;
(function (Sheets) {
    Sheets["Planning"] = "Planning";
})(Sheets || (Sheets = {}));
export default async function getAssets(sheet) {
    return fetchCached(`exp-events-${sheet}`, "en", 5 * MINUTE, () => fetchAssets(sheet));
}
async function fetchAssets(sheet) {
    const assets = [];
    await getAirtable(sheet)
        .select({
        pageSize: 100,
        filterByFormula: `${TERMS_SIGNED}`,
        sort: [{ field: "Order", direction: "asc" }],
    })
        .eachPage((records, fetchNextPage) => {
        records.forEach((doc) => assets.push(normalize(doc.fields, doc.id)));
        fetchNextPage();
    });
    return assets;
}
function getAirtable(sheet) {
    return airtableInit(AIRTABLE_BASE_ID)(sheet);
}
const TERMS_SIGNED = "Terms=1";
function normalize(asset, id) {
    return {
        title: asset.Name,
        preview: getPreview(asset),
        uri: getURI(asset),
        id,
    };
}
export const _normalize = normalize;
function getPreview(asset) {
    const previewField = asset.Preview;
    return ((previewField &&
        previewField[0] &&
        previewField[0].thumbnails &&
        previewField[0].thumbnails.large.url) ||
        "");
}
function getURI(asset) {
    return asset.Location;
}
//# sourceMappingURL=EventKit.js.map