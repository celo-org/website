import fecha from "fecha";
export function printDuration(date, endDate) {
    try {
        if (endDate) {
            return `${fecha.format(date, "MMM D")}-${fecha.format(endDate, "mediumDate")}`;
        }
        return fecha.format(date, "mediumDate");
    }
    catch (e) {
        return "";
    }
}
export function parseDate(date) {
    if (date) {
        return fecha.parse(date, "YYYY-MM-DD");
    }
    return null;
}
//# sourceMappingURL=PlaceDate.jsx.map