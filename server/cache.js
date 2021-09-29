import Cache from "node-cache";
export const MINUTE = 60;
export const HOUR = MINUTE * 60;
const LIVE_MODE = process.env.ENV === "production";
const STANDARD_TTL = LIVE_MODE ? HOUR * 24 : 1;
const CACHE = new Cache({ stdTTL: STANDARD_TTL, checkperiod: 120 });
export async function fetchCached(key, locale, maxStale, fetcher) {
    const localizedKey = `${locale}:${key}`;
    return get(localizedKey, fetcher, maxStale) || set(localizedKey, fetcher);
}
function get(key, fetcher, maxStale) {
    const data = CACHE.get(key);
    if (!data) {
        console.info("missed", key);
    }
    else if (shouldRevalidate(data, maxStale)) {
        console.info("revalidating", key);
        setTimeout(() => set(key, fetcher), 1);
    }
    return data?.value;
}
function shouldRevalidate(data, maxStale) {
    if (!data.updatedAt) {
        return true;
    }
    const currentTime = Date.now();
    return currentTime - data.updatedAt > maxStale * 1000;
}
const IN_TRANSIT = {};
async function set(key, fetcher) {
    if (IN_TRANSIT[key]) {
        return IN_TRANSIT[key];
    }
    else {
        const unique = `fetch-${key}-${Math.random()}`;
        console.time(unique);
        IN_TRANSIT[key] = fetcher();
        const data = await IN_TRANSIT[key];
        console.timeEnd(unique);
        if (data === null ||
            data === undefined ||
            data.error ||
            data.type === "Error" ||
            data.sys?.type === "Error" ||
            (typeof data.status === "number" && data.status > 299)) {
            console.info("bad-data-nocache", data);
            IN_TRANSIT[key] = null;
            return data;
        }
        const updatedAt = Date.now();
        const dataWithTimeStamp = { updatedAt, value: data };
        CACHE.set(key, dataWithTimeStamp);
        setTimeout(() => {
            IN_TRANSIT[key] = null;
        }, 100);
        return data;
    }
}
//# sourceMappingURL=cache.js.map