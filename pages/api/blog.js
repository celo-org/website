import { getFormattedMediumArticles } from 'server/mediumAPI';
import respondError from 'server/respondError';
export default async function (req, res) {
    try {
        if (req.method === 'GET') {
            const articlesdata = await getFormattedMediumArticles(req.query.tagged);
            res.json(articlesdata);
        }
        else {
            res.status(405).json({ error: `${req.method} does not exist here` });
        }
    }
    catch (e) {
        respondError(res, e);
    }
}
//# sourceMappingURL=blog.js.map