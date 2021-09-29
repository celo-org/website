import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import * as React from "react";
import Image from "next/image";
import { fonts } from "src/estyles";
import { isExternalLink } from "src/utils/utils";
const renderNode = {
    [BLOCKS.HEADING_1]: (_, children) => {
        return <h2 css={fonts.h1}>{children}</h2>;
    },
    [BLOCKS.HEADING_2]: (_, children) => {
        return <h2 css={fonts.h2}>{children}</h2>;
    },
    [BLOCKS.HEADING_3]: (_, children) => {
        return <h3 css={fonts.h3}>{children}</h3>;
    },
    [BLOCKS.HEADING_4]: (_, children) => {
        return <h4 css={fonts.h4}>{children}</h4>;
    },
    [BLOCKS.HEADING_5]: (_, children) => {
        return <h5 css={fonts.h5}>{children}</h5>;
    },
    [BLOCKS.HEADING_6]: (_, children) => {
        return <h6 css={fonts.h6}>{children}</h6>;
    },
    [BLOCKS.PARAGRAPH]: (_, children) => {
        return <p css={fonts.body}>{children}</p>;
    },
    [INLINES.HYPERLINK]: (node, children) => {
        const target = isExternalLink(node.data.uri) ? "_blank" : undefined;
        return <a href={node.data.uri} target={target}>{children}</a>;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const asset = node.data.target;
        const file = asset.fields.file;
        return (<div style={{
                width: "100%",
                maxWidth: file.details.image?.width,
                maxHeight: file.details.image?.height,
            }}>
        <Image layout={"responsive"} src={`https:${file.url}`} alt={asset.fields.description} width={file.details.image?.width} height={file.details.image?.height} unoptimized={true}/>
      </div>);
    },
};
export default renderNode;
//# sourceMappingURL=enodes.jsx.map