import * as React from "react";
import Events from "src/community/connect/Events";
export async function getEvents(query) {
    const res = await fetch(`/api/events?${query}`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "GET",
    });
    return res.json();
}
export default class EventData extends React.PureComponent {
    state = { upcomingEvents: [], topEvent: null, loaded: false };
    componentDidMount = async () => {
        const { upcomingEvents, topEvent } = await getEvents("upcoming=true");
        if (upcomingEvents || topEvent) {
            this.setState({ upcomingEvents, topEvent, loaded: true });
        }
        else {
            this.setState({ loaded: true });
            console.error("events missing");
        }
    };
    render() {
        const state = this.state;
        return (<Events upcomingEvents={state.upcomingEvents} topEvent={state.topEvent} loading={!state.loaded}/>);
    }
}
//# sourceMappingURL=EventsData.jsx.map