import byMethod from 'src/../server/byMethod';
import { getPageBySlug } from 'src/utils/contentful';
async function get(req, res) {
    try {
        const locale = 'en-US';
        const pageData = await getPageBySlug(req.query.slug, { locale });
        res.json(pageData);
    }
    catch (e) {
        res.status(404).json({ status: 404 });
    }
}
export default byMethod({ getHandler: get });
//# sourceMappingURL=%5Bslug%5D.js.map