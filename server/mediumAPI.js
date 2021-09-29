import { parse, validate } from "fast-xml-parser";
import htmlToFormattedText from "html-to-formatted-text";
import { fetchCached, MINUTE } from "../server/cache";
import Sentry from "../server/sentry";
import retryAbortableFetch from "../src/utils/retryAbortableFetch";
function getFirstImgURL(htmlstring) {
    try {
        return htmlstring.split("<img")[1].split("src=")[1].split('"')[1];
    }
    catch (e) {
        console.error(e);
    }
}
function getGramaticallyCorrectExcerpt(htmlstring) {
    try {
        const charsInClosingTag = 4;
        const approximateMaxChars = 320;
        const firstParagraph = htmlstring.substring(htmlstring.indexOf("<p"), htmlstring.indexOf("</p>") + charsInClosingTag);
        const plainText = htmlToFormattedText(firstParagraph).replace("&amp;", "&");
        return plainText.length > approximateMaxChars
            ? plainText.substring(0, plainText.indexOf(". ") + 1)
            : plainText;
    }
    catch (e) {
        console.error(e);
    }
}
function transform(items) {
    return items.slice(0, 3).map((item) => {
        return {
            title: item.title,
            href: item.link,
            imgSource: getFirstImgURL(item["content:encoded"]),
            text: getGramaticallyCorrectExcerpt(item["content:encoded"]),
        };
    });
}
function parseXML(xmlData) {
    if (validate(xmlData) === true) {
        const jsonRSS = parse(xmlData, {});
        const item = jsonRSS.rss?.channel?.item;
        return item instanceof Array ? item : !item ? [] : [item];
    }
    else {
        return [];
    }
}
const BASE_URL = "https://medium.com/feed/celoOrg";
async function fetchMediumArticles(tagged) {
    const url = tagged ? `${BASE_URL}/tagged/${tagged}` : BASE_URL;
    const response = (await retryAbortableFetch(url));
    return response.text();
}
async function getAndTransform(tagged) {
    const xmlString = await fetchMediumArticles(tagged);
    return transform(parseXML(xmlString));
}
export async function getFormattedMediumArticles(tagged) {
    try {
        const articles = await fetchCached(`medium-blog-${tagged}`, "en", MINUTE * 5, () => getAndTransform(tagged));
        return { articles };
    }
    catch (e) {
        Sentry.withScope((scope) => {
            scope.setTag("Service", "Medium");
            Sentry.captureException(e);
        });
        return { articles: [] };
    }
}
//# sourceMappingURL=mediumAPI.js.map