import { wrenApi } from "server/wrenApi";
import respondError from "server/respondError";
export default async function (req, res) {
    try {
        if (req.method === "GET") {
            const results = await wrenApi();
            res.json(results.stats.totalTons);
        }
        else {
            res.status(405).json({ error: `${req.method} does not exist here` });
        }
    }
    catch (e) {
        respondError(res, e);
    }
}
//# sourceMappingURL=carbon.js.map