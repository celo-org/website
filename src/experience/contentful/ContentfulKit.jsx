import * as React from "react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import Page from "src/experience/common/Page";
import { embedded } from "src/contentful/nodes/embedded";
import { renderNode } from "src/contentful/nodes/nodes";
const OPTIONS = {
    renderNode: {
        ...renderNode,
        [BLOCKS.EMBEDDED_ENTRY]: embedded,
        [INLINES.EMBEDDED_ENTRY]: embedded,
    },
};
export default function ContentfulKit({ kitName, metaDescription, path, sidebar, sections, ogImage, }) {
    const children = sections.map((section) => {
        return {
            id: section.slug,
            children: documentToReactComponents(section.contentField, OPTIONS),
        };
    });
    return (<Page pages={sidebar} sections={children} title={`${kitName}`} kitName={kitName} path={`/experience/${path}`} metaDescription={metaDescription} ogImage={ogImage}/>);
}
//# sourceMappingURL=ContentfulKit.jsx.map