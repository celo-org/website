import getContributors from 'server/getContributors';
import respondError from 'server/respondError';
export default async function (req, res) {
    try {
        if (req.method === 'GET') {
            const assets = await getContributors();
            res.json(assets);
        }
        else {
            res.status(405).json({ error: `${req.method} does not exist here` });
        }
    }
    catch (e) {
        respondError(res, e);
    }
}
//# sourceMappingURL=contributors.js.map