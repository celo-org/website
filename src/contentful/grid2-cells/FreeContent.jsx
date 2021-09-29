import { css } from "@emotion/react";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { flex, fonts, WHEN_MOBILE } from "src/estyles";
import renderNode from "src/contentful/nodes/enodes";
import { BLOCKS, INLINES } from "@contentful/rich-text-types";
import { BUTTON } from "src/contentful/nodes/embeds/BUTTON";
import { GALLARY } from "src/contentful/nodes/embeds/GALLARY";
import { ROW } from "../nodes/embeds/ROW";
const EMBEDDABLE = {
    ...BUTTON,
    ...GALLARY,
    ...ROW,
};
function embedded(node) {
    const contentType = node.data?.target?.sys?.contentType?.sys?.id;
    const renderer = EMBEDDABLE[contentType];
    if (renderer) {
        return renderer(node.data.target);
    }
    else {
        console.info(contentType);
        return null;
    }
}
const OPTIONS = {
    renderNode: {
        ...renderNode,
        [BLOCKS.HEADING_1]: (_, children) => {
            return <h2 css={h1ResponsiveCss}>{children}</h2>;
        },
        [BLOCKS.EMBEDDED_ENTRY]: embedded,
        [INLINES.EMBEDDED_ENTRY]: embedded,
    },
};
const h1ResponsiveCss = css(fonts.h1, { [WHEN_MOBILE]: fonts.h1Mobile });
export function FreeContent({ colSpan, body, cssStyle, darkMode, listStyleImage }) {
    const customBullets = listStyleImage
        ? {
            ul: {
                listStyleImage: `url(${listStyleImage.fields.file.url})`,
            },
        }
        : null;
    return (<div css={css(rootCss, { gridColumn: `span ${colSpan}` })}>
      <div css={css(flex, darkMode && darkModeText, cssStyle, customBullets)}>
        {documentToReactComponents(body, OPTIONS)}
      </div>
    </div>);
}
const rootCss = css(flex, {
    maxWidth: "calc(100vw - 16px)",
    a: {
        marginTop: 16,
    },
    "h2:first-of-type": {
        marginTop: 8,
    },
    ul: { paddingInlineStart: 16 },
});
const darkModeText = css({ "h1, h2, h3, h4, h5, h6, p, div, ul, span": { color: "white" } });
//# sourceMappingURL=FreeContent.jsx.map