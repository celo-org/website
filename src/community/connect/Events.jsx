import * as React from "react";
import { SectionList, StyleSheet, Text, View } from "react-native";
import EventRow from "src/community/connect/EventRow";
import { withNamespaces } from "src/i18n";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import Fade from "src/shared/AwesomeFade";
import Button, { BTN, SIZE } from "src/shared/Button.3";
import OvalCoin from "src/shared/OvalCoin";
import Spinner from "src/shared/Spinner";
import { colors, fonts, standardStyles } from "src/styles";
import { NoneFound, Radio, SectionHeader } from "src/table/table";
var Filter;
(function (Filter) {
    Filter[Filter["speaking"] = 0] = "speaking";
    Filter[Filter["hosting"] = 1] = "hosting";
})(Filter || (Filter = {}));
class Events extends React.PureComponent {
    state = {
        filter: null,
    };
    filterBy = (nextFilter) => {
        this.setState((state) => ({ filter: state.filter === nextFilter ? null : nextFilter }));
    };
    filterNone = () => {
        this.setState({ filter: null });
    };
    getSection = (events, title) => {
        if (hasEvents(events)) {
            const filteredEvents = filterEvents(events, this.state.filter);
            if (filteredEvents.length > 0) {
                return { title, data: filteredEvents };
            }
        }
    };
    getSections = () => {
        const { t, topEvent, upcomingEvents, pastEvents } = this.props;
        return [
            this.getSection([topEvent], t("events.highlightEvent")),
            this.getSection(upcomingEvents, t("events.upcomingEvents")),
            this.getSection(pastEvents, t("events.pastEvents")),
        ].filter((section) => section);
    };
    renderNotFound = () => {
        if (this.props.loading) {
            return <PlaceHolder />;
        }
        return (<NoneFound onPress={this.filterNone} actionText={"See All"} longText={"There are no events based on your search filtering"}/>);
    };
    renderItem = ({ item, section }) => {
        return (<Fade distance="20px">
        <EventRow {...item} key={item.name} section={section.title}/>
      </Fade>);
    };
    render() {
        const { t } = this.props;
        return (<GridRow desktopStyle={standardStyles.blockMargin} tabletStyle={standardStyles.blockMarginTablet} mobileStyle={standardStyles.blockMarginMobile}>
        <Cell span={Spans.fourth}>
          <View style={standardStyles.blockMarginMobile}>
            <Text style={fonts.h6}>{t("events.refineBy")}</Text>
            <Radio icon={<OvalCoin size={14} color={colors.primary}/>} selected={this.state.filter === Filter.hosting} label={"Hosting"} value={Filter.hosting} onValueSelected={this.filterBy}/>
            <Radio icon={<OvalCoin size={14} color={colors.purple}/>} selected={this.state.filter === Filter.speaking} label={"Speaking"} value={Filter.speaking} onValueSelected={this.filterBy}/>
          </View>
          <Text style={[fonts.h6, standardStyles.elementalMarginBottom]}>
            {t("events.reppingCelo")}
          </Text>
          <Text style={fonts.p}>
            Send a note to{" "}
            <Button kind={BTN.INLINE} text={"community@celo.org"} href={"mailto:community@celo.org"}/>{" "}
            before the event to learn more
          </Text>
        </Cell>
        <Cell span={Spans.three4th}>
          <SectionList sections={this.getSections()} renderSectionHeader={SectionHeader} renderItem={this.renderItem} keyExtractor={keyExtractor} ListEmptyComponent={this.renderNotFound} contentContainerStyle={styles.container}/>
          {!this.props.pastEvents && (<View style={[standardStyles.centered, standardStyles.blockMarginTop]}>
              <Button kind={BTN.DARKNAKED} size={SIZE.normal} text={t("events.pastEvents")} href={"/past-events"} target={"_new"}/>
            </View>)}
        </Cell>
      </GridRow>);
    }
}
function keyExtractor(item) {
    return item.name;
}
function hasEvents(events) {
    return events && events.length > 0 && !!events[0];
}
function filterEvents(events, currentFilter) {
    if (currentFilter !== null) {
        const filterFunction = (event) => {
            switch (currentFilter) {
                case Filter.hosting:
                    return event.celoHosted;
                case Filter.speaking:
                    return event.celoSpeaking;
            }
        };
        return events.filter(filterFunction);
    }
    return events;
}
export default withNamespaces("community")(Events);
const styles = StyleSheet.create({
    container: {
        overflow: "hidden",
    },
    placeholder: {
        height: "90vh",
    },
});
function PlaceHolder() {
    return (<View style={[standardStyles.centered, styles.placeholder]}>
      <Spinner color={colors.primary} size="medium"/>
    </View>);
}
//# sourceMappingURL=Events.jsx.map