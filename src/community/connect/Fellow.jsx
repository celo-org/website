import * as React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { H4 } from "src/fonts/Fonts";
import { Cell, GridRow, Spans } from "src/layout/GridRow";
import AspectRatio from "src/shared/AspectRatio";
import { fonts, standardStyles } from "src/styles";
export default class Fellow extends React.PureComponent {
    render() {
        const { image, name, location, role, quote, text, color } = this.props;
        return (<View style={standardStyles.blockMarginBottom}>
        <GridRow>
          <Cell span={Spans.half}>
            <AspectRatio style={styles.imageContainer} ratio={940 / 1090}>
              <Image source={image} style={styles.image}/>
            </AspectRatio>
          </Cell>
          <Cell span={Spans.half}>
            <H4>{name}</H4>
            <Text style={fonts.h6}>
              {location} | {role}
            </Text>
            <H4 style={[
                { color },
                standardStyles.elementalMarginTop,
                standardStyles.blockMarginBottom,
            ]}>
              {quote}
            </H4>
            <Text style={fonts.p}>{text}</Text>
          </Cell>
        </GridRow>
      </View>);
    }
}
const styles = StyleSheet.create({
    slideContainer: {
        marginBottom: 50,
    },
    image: {
        height: "100%",
        width: "100%",
    },
    imageContainer: {
        width: "100%",
    },
});
//# sourceMappingURL=Fellow.jsx.map