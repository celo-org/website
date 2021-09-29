import analytics from "src/analytics/analytics";
export var AssetTypes;
(function (AssetTypes) {
    AssetTypes["logo"] = "logo";
    AssetTypes["icon"] = "icon";
    AssetTypes["font"] = "font";
    AssetTypes["illustration"] = "illustration";
    AssetTypes["graphic"] = "graphic";
})(AssetTypes || (AssetTypes = {}));
export const GLYPH_TRACKING = { name: "Celo Glyphs", type: AssetTypes.logo };
export const JOST_TRACKING = { name: "Jost", type: AssetTypes.font };
export const GARMOND_TRACKING = { name: "Garmond", type: AssetTypes.font };
export const LOGO_PKG_TRACKING = { name: "Logo Package", type: AssetTypes.logo };
export const EXCHANGE_ICONS_PKG_TRACKING = {
    name: "Exchange Icons Package",
    type: AssetTypes.icon,
};
export const VOICE_DOC_TRACKING = { name: "Celo Voice Doc", type: AssetTypes.logo };
export async function trackDownload({ name, type }) {
    await analytics.track(`${name} Downloaded`, `brand-kit: ${type}`);
}
//# sourceMappingURL=tracking.js.map