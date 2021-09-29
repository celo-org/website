import getConfig from "next/config";
import airtableInit from "./airtable";
import { fetchCached, MINUTE } from "./cache";
const SHEET = "About Profiles";
export default async function getContributors() {
    return fetchCached(`air-${SHEET}`, "en", 3 * MINUTE, fetchContributors);
}
async function fetchContributors() {
    return getAirtable(SHEET)
        .select({
        filterByFormula: `AND(${IS_APROVED})`,
    })
        .all()
        .then((records) => {
        return records.map((r) => normalize(r.fields));
    });
}
function getAirtable(sheet) {
    return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ANNOUNCEMENT_ID)(sheet);
}
const IS_APROVED = "Approved=1";
function normalize(asset) {
    return {
        name: asset["Full Name"],
        purpose: asset["Unique Purpose"],
        team: asset.Team,
        company: asset.Company,
        photo: getImageURI(asset, Sizes.large),
        preview: getImageURI(asset, Sizes.small),
        url: asset["Social Media Link"],
    };
}
var Sizes;
(function (Sizes) {
    Sizes["large"] = "large";
    Sizes["small"] = "small";
})(Sizes || (Sizes = {}));
function getImageURI(asset, size) {
    const previewField = asset.Photo;
    return ((previewField &&
        previewField[0] &&
        previewField[0].thumbnails &&
        previewField[0].thumbnails[size].url) ||
        "");
}
//# sourceMappingURL=getContributors.js.map