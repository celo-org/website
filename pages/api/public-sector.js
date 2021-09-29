import byMethod from '../../server/byMethod';
import { create } from 'src/../server/PublicSector';
async function submit(req, res) {
    await create(req.body);
    res.json({ ok: true });
}
export default byMethod({ postHandler: submit });
//# sourceMappingURL=public-sector.js.map