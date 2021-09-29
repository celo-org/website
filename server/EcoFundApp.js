import getConfig from "next/config";
import { Tables } from "../fullstack/EcoFundFields";
import airtableInit from "../server/airtable";
export default function submit(fields, table) {
    switch (table) {
        case Tables.Applicants:
            return apply(fields);
        case Tables.Recommendations:
            return recommend(fields);
        default:
            return Promise.reject({ message: `Invalid Table ${table}` });
    }
}
function getAirtable(tableName) {
    const { serverRuntimeConfig } = getConfig();
    return airtableInit(serverRuntimeConfig.AIRTABLE_ECOFUND_ID)(tableName);
}
async function recommend(fields) {
    return getAirtable(Tables.Recommendations).create(fields);
}
async function apply(fields) {
    return getAirtable(Tables.Applicants).create(fields);
}
//# sourceMappingURL=EcoFundApp.js.map