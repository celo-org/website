import getConfig from "next/config";
import airtableInit from "../server/airtable";
import Sentry from "../server/sentry";
import { fetchCached, MINUTE } from "./cache";
export default async function latestAnnouncements(countryCode) {
    try {
        const announcements = await fetchCached("blue-announcements", "en", 1 * MINUTE, fetchAnouncmentRecords);
        const anyBlocked = announcements.some((announcement) => announcement.block && announcement.block.length > 0);
        if (anyBlocked) {
            return censor(announcements, countryCode);
        }
        return announcements;
    }
    catch (err) {
        Sentry.captureException(err);
    }
}
async function fetchAnouncmentRecords() {
    const records = (await getAirtable()
        .select({
        maxRecords: 10,
        filterByFormula: IS_LIVE,
        sort: [{ field: "order", direction: "desc" }],
    })
        .firstPage());
    return records.map((record) => record.fields);
}
function getAirtable() {
    return airtableInit(getConfig().serverRuntimeConfig.AIRTABLE_ANNOUNCEMENT_ID)("Bluebanner");
}
export function censor(announcements, country) {
    const lowerCountry = country?.toLowerCase();
    if (!country) {
        return announcements.filter((announcement) => !announcement.block);
    }
    return announcements.filter((announcement) => announcement.block ? !announcement.block.includes(lowerCountry) : true);
}
const IS_LIVE = "live=1";
//# sourceMappingURL=Announcement.js.map