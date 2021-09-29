import byMethod from '../../server/byMethod';
import fetchPress from '../../server/fetchPress';
async function get(_, res) {
    try {
        const milestones = await fetchPress();
        res.json(milestones);
    }
    catch {
        res.status(500).json([]);
    }
}
export default byMethod({ getHandler: get });
//# sourceMappingURL=press.js.map