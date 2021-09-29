import AirtableAPI from "airtable";
import getConfig from "next/config";
let airTableSingleton;
export default function airtableInit(baseID) {
    const { serverRuntimeConfig } = getConfig();
    if (!airTableSingleton) {
        airTableSingleton = new AirtableAPI({ apiKey: serverRuntimeConfig.AIRTABLE_API_KEY });
    }
    return airTableSingleton.base(baseID);
}
export var ImageSizes;
(function (ImageSizes) {
    ImageSizes["large"] = "large";
    ImageSizes["small"] = "small";
})(ImageSizes || (ImageSizes = {}));
export function getImageURI(previewField, size) {
    const thumb = getThumbnail(previewField, size);
    return thumb ? thumb.url : "";
}
export function getWidthAndHeight(imageField) {
    const thumb = getThumbnail(imageField, ImageSizes.large);
    return thumb ? { width: thumb.width, height: thumb.height } : { width: 1, height: 1 };
}
function getThumbnail(imageField, size) {
    return imageField && imageField[0] && imageField[0].thumbnails && imageField[0].thumbnails[size];
}
//# sourceMappingURL=airtable.js.map