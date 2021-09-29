import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import * as React from "react";
import { Text } from "react-native";
import { H1, H2, H3, H4 } from "src/fonts/Fonts";
import InlineAnchor from "src/shared/InlineAnchor";
import { fonts, standardStyles } from "src/styles";
import Image from "next/image";
export const renderNode = {
    [BLOCKS.HEADING_1]: (_, children) => {
        return <H1>{children}</H1>;
    },
    [BLOCKS.HEADING_2]: (_, children) => {
        return <H2 style={standardStyles.blockMarginTopTablet}>{children}</H2>;
    },
    [BLOCKS.HEADING_3]: (_, children) => {
        return <H3 style={standardStyles.blockMarginTopTablet}>{children}</H3>;
    },
    [BLOCKS.HEADING_4]: (_, children) => {
        return <H4 style={standardStyles.elementalMargin}>{children}</H4>;
    },
    [BLOCKS.HEADING_5]: (_, children) => {
        return <Text style={fonts.h5}>{children}</Text>;
    },
    [BLOCKS.PARAGRAPH]: (_, children) => {
        return <Text style={[fonts.p, standardStyles.halfElement]}>{children}</Text>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
        return <InlineAnchor href={node.data.uri}>{children}</InlineAnchor>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target;
        const file = asset.fields.file;
        return (<div style={{
                width: "100%",
                maxWidth: file.details.image?.width,
                maxHeight: file.details.image?.height,
            }}>
        <Image unoptimized={true} layout={"responsive"} src={`https:${file.url}`} alt={asset.fields.description} width={file.details.image?.width} height={file.details.image?.height}/>
      </div>);
    },
};
//# sourceMappingURL=nodes.jsx.map