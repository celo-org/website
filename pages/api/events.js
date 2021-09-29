import byMethod from '../../server/byMethod';
import getFormattedEvents from '../../server/EventHelpers';
async function get(req, res) {
    try {
        const events = await getFormattedEvents(req.query.upcoming === 'true');
        res.json(events);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ pastEvents: [], upcomingEvents: [], topEvent: {} });
    }
}
export default byMethod({ getHandler: get });
//# sourceMappingURL=events.js.map