import getConfig from "next/config";
import { Category } from "../src/alliance/CategoryEnum";
import addToCRM from "./addToCRM";
import airtableInit, { getImageURI, getWidthAndHeight, ImageSizes } from "./airtable";
import { fetchCached, MINUTE } from "./cache";
export const CATEGORY_FIELD = "Web Category*";
export const LOGO_FIELD = "Logo Upload";
export const URL_FIELD = "Company URL*";
const READ_SHEET = "MOU Tracking";
const WRITE_SHEET = "Web Requests";
export default async function getAllies() {
    return Promise.all(Object.keys(Category).map((category) => {
        return fetchCached(`air-${READ_SHEET}-${category}`, "en", 2 * MINUTE, () => fetchAllies(category));
    }));
}
async function fetchAllies(category) {
    return getAirtable(READ_SHEET)
        .select({
        filterByFormula: `AND(${IS_APROVED},SEARCH("${category}", {${CATEGORY_FIELD}}))`,
        fields: ["Name", "Approved", CATEGORY_FIELD, LOGO_FIELD, URL_FIELD],
        view: "Alliance Web",
    })
        .all()
        .then((records) => {
        return { name: category, records: records.map((r) => normalize(r.fields)) };
    });
}
function getAirtable(sheet) {
    return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ALLIANCE_ID)(sheet);
}
const IS_APROVED = "Approved=1";
export function normalize(asset) {
    return {
        name: asset.Name,
        logo: {
            uri: getImageURI(asset["Logo Upload"], ImageSizes.large),
            ...getWidthAndHeight(asset["Logo Upload"]),
        },
        url: asset[URL_FIELD],
    };
}
export async function create(data) {
    const actions = [
        getAirtable(WRITE_SHEET).create(convertWebToAirtable(data)),
    ];
    if (data.subscribe) {
        actions.push(addToCRM({ email: data.email, fullName: data.name, interest: "Alliance" }));
    }
    return Promise.all(actions);
}
function convertWebToAirtable(input) {
    return {
        Name: input.name,
        Contribution: input.contribution,
        Newsletter: input.subscribe,
        Email: input.email,
    };
}
//# sourceMappingURL=Alliance.js.map