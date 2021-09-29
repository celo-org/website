var Countries;
(function (Countries) {
    Countries["Canada"] = "ca";
    Countries["China"] = "cn";
    Countries["Cuba"] = "cu";
    Countries["NorthKorea"] = "kp";
    Countries["Iran"] = "ir";
    Countries["Syria"] = "sy";
    Countries["Sudan"] = "sd";
    Countries["UnitedStates"] = "us";
})(Countries || (Countries = {}));
const RESTRICTED_JURISDICTIONS = new Set(Object.keys(Countries).map((name) => Countries[name]));
export function isJurisdictionRestricted(country) {
    if (!country) {
        return true;
    }
    return RESTRICTED_JURISDICTIONS.has(country);
}
//# sourceMappingURL=countries.js.map