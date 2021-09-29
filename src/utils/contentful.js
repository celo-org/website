import { createClient } from "contentful";
import getConfig from "next/config";
import { fetchCached, MINUTE } from "src/../server/cache";
function intialize() {
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const isPreview = publicRuntimeConfig.ENV === "development";
    return createClient({
        space: serverRuntimeConfig.CONTENTFUL_SPACE_ID,
        accessToken: isPreview
            ? serverRuntimeConfig.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : serverRuntimeConfig.CONTENTFUL_ACCESS_TOKEN,
        host: isPreview ? "preview.contentful.com" : undefined,
    });
}
export async function getKit(kitSlug, pageSlug, { locale }) {
    return fetchCached(`kit:${kitSlug}:${pageSlug || "home"}`, locale, 3 * MINUTE, () => fetchKit(kitSlug, pageSlug, { locale }));
}
async function fetchKit(kitSlug, pageSlug, { locale }) {
    const kit = await intialize().getEntries({
        content_type: "kit",
        "fields.slug": kitSlug,
        locale,
    });
    const data = kit.items[0].fields;
    const homePageSlug = kitSlug === "merchant" ? "index" : kitSlug;
    const actualPageSlug = !pageSlug ? homePageSlug : pageSlug;
    let pageID = data.pages_.find((p) => p.fields.slug === actualPageSlug)?.sys?.id;
    if (!pageID && !pageSlug) {
        pageID = data.pages_[0].sys.id;
    }
    return {
        kitName: data.name,
        metaDescription: data.metaDescription,
        ogImage: data.ogImage,
        pageID,
        sidebar: data.pages_.map((page) => {
            return {
                title: page.fields.title,
                href: `/experience/${kitSlug}${page.fields.slug === kitSlug || page.fields.slug === "index" ? "" : "/" + page.fields.slug}${addLocale(locale)}`,
                sections: [],
            };
        }),
    };
}
export async function getPageBySlug(slug, { locale }, showSysData) {
    return fetchCached(`page-slug:${slug}`, locale, 2 * MINUTE, () => fetchPageBySlug(slug, { locale }, showSysData));
}
async function fetchPageBySlug(slug, { locale }, showSysData) {
    const pages = await intialize().getEntries({
        content_type: "page",
        "fields.slug": slug,
        include: 5,
        locale,
    });
    return processPages(pages, showSysData);
}
export async function getPageById(id, { locale }) {
    return fetchCached(`page-by-id:${id}`, locale, 2 * MINUTE, () => fetchPageById(id, { locale }));
}
export async function fetchPageById(id, { locale }) {
    const pages = await intialize().getEntries({
        content_type: "page",
        "sys.id": id,
        include: 5,
        locale,
    });
    return processPages(pages);
}
function processPages(pages, showSysData) {
    const data = pages?.items[0]?.fields;
    if (!data) {
        return null;
    }
    const sections = showSysData
        ? data.sections
        : (data.sections || []).map((section) => section.fields);
    return { ...data, sections, updatedAt: pages.items[0].sys.updatedAt };
}
export function addLocale(locale) {
    if (locale === "en-US") {
        return "";
    }
    else {
        return `?locale=${locale}`;
    }
}
//# sourceMappingURL=contentful.js.map