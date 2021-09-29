import analytics from "src/analytics/analytics";
export var Types;
(function (Types) {
    Types[Types["PlanningDoc"] = 0] = "PlanningDoc";
    Types[Types["Action"] = 1] = "Action";
})(Types || (Types = {}));
export async function trackDownload({ name, type }) {
    await analytics.track(`${name} Downloaded`, `event-kit: ${type}`);
}
export async function trackOpen({ name, type }) {
    await analytics.track(`${name} Open`, `event-kit: ${type}`);
}
//# sourceMappingURL=tracking.js.map