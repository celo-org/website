export default function makeSafeForJson(obj) {
    if (typeof obj === "object") {
        for (const keys in obj) {
            if (typeof obj[keys] === "object") {
                makeSafeForJson(obj[keys]);
            }
            else {
                const keyValue = obj[keys];
                obj[keys] = keyValue === undefined ? null : keyValue;
            }
        }
    }
    return obj;
}
//# sourceMappingURL=makeSafeForJson.js.map