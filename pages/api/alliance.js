import getAllies from 'server/Alliance';
import respondError from 'server/respondError';
export default async function (req, res) {
    try {
        if (req.method === 'GET') {
            const allies = await getAllies();
            res.json(allies.filter((ally) => ally.records.length > 0));
        }
        else {
            res.status(405).json({ error: `${req.method} does not exist here` });
        }
    }
    catch (e) {
        respondError(res, e);
    }
}
//# sourceMappingURL=alliance.js.map