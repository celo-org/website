import airtableInit from "./airtable";
import getConfig from "next/config";
function getAirtable(sheet) {
    const id = getConfig().serverRuntimeConfig.AIRTABLE_PUBLIC_SECTOR_ID;
    return airtableInit(id)(sheet);
}
export async function create(data) {
    return getAirtable("Web").create(convert(data));
}
function convert(data) {
    return {
        Name: data.name,
        Email: data.email,
        Reason: data.reason,
        Organization: data.orgName,
    };
}
//# sourceMappingURL=PublicSector.js.map