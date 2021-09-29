import respondError from "server/respondError";
export default function byMethod({ getHandler, postHandler }) {
    return async (req, res) => {
        try {
            if (req.method === "GET" && getHandler) {
                await getHandler(req, res);
            }
            else if (req.method === "POST" && postHandler) {
                await postHandler(req, res);
            }
            else {
                res.status(405).json({ error: `${req.method} does not exist here` });
            }
        }
        catch (e) {
            console.error("api:caught", e);
            respondError(res, e);
        }
    };
}
//# sourceMappingURL=byMethod.js.map