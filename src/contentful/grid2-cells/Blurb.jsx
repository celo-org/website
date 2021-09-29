import { css } from "@emotion/react";
import * as React from "react";
import { flex, fonts, WHEN_MOBILE, whiteText } from "src/estyles";
import Button, { SIZE } from "src/shared/Button.3";
import { standardStyles } from "src/styles";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import renderNode, { renderWhiteParagraph } from "src/contentful/nodes/paragraph";
import { ROW } from "src/contentful/nodes/embeds/ROW";
import Image from "next/image";
var Headings;
(function (Headings) {
    Headings["large"] = "large";
    Headings["medium"] = "medium";
    Headings["small"] = "small";
    Headings["plain"] = "plain";
})(Headings || (Headings = {}));
function embedded(node) {
    const contentType = node.data?.target?.sys?.contentType?.sys?.id;
    const renderer = ROW[contentType];
    if (renderer) {
        return renderer(node.data.target);
    }
    else {
        console.info(contentType);
        return null;
    }
}
const embeddable = { [BLOCKS.EMBEDDED_ENTRY]: embedded };
const renderWhiteParagraphWithRow = { ...renderWhiteParagraph, ...embeddable };
const renderParagraphWithRow = { ...renderNode, ...embeddable };
export default function Blurb(props) {
    const image = props.icon?.fields?.file;
    const imageURL = image?.url;
    const width = props.isNaturalSize ? image?.details?.image?.width : props.newIcon ? 48 : 100;
    const height = props.isNaturalSize ? image?.details?.image?.height : props.newIcon ? 48 : 100;
    return (<div css={rootCss}>
      <div css={containerCss}>
        {imageURL && (<Image unoptimized={true} layout={props.isNaturalSize ? "intrinsic" : "fixed"} src={`https:${imageURL}`} width={width} height={height} alt="" css={props.isNaturalSize ? {} : fixedSizeCss}/>)}
        {props.title && <h4 css={headingStyle(props.titleType, props.darkMode)}>{props.title}</h4>}
        {documentToReactComponents(props.body, {
            renderNode: props.darkMode ? renderWhiteParagraphWithRow : renderParagraphWithRow,
        })}
      </div>
      {props.link && (<Button style={standardStyles.elementalMarginTop} href={props.link.fields.href || props.link.fields.assetLink?.fields?.file?.url} text={props.link.fields.words} kind={props.link.fields.kind} size={SIZE.normal} target={props.link.fields.assetLink?.fields?.file?.url ||
                (props.link.fields.href?.startsWith("http") && "_blank")}/>)}
    </div>);
}
const rootCss = css(flex, {
    flex: 1,
    justifyContent: "space-between",
    marginBottom: 36,
    [WHEN_MOBILE]: {
        alignItems: "center",
        alignContent: "center",
    },
});
const containerCss = css(flex, {
    flex: 1,
    "p:first-of-type": {
        marginTop: 0,
    },
    "p:last-of-type": {
        marginBottom: 0,
    },
    [WHEN_MOBILE]: {
        alignItems: "center",
        alignContent: "center",
        textAlign: "center",
        maxWidth: 288,
        li: {
            listStyle: "none",
        },
        ul: {
            marginBlockStart: 0,
            marginBlockEnd: 0,
            marginInlineStart: 0,
            marginInlinEend: 0,
            paddingInlineStart: 0,
        },
    },
});
const fixedSizeCss = css({
    width: 100,
    height: 100,
});
const headingCss = css({
    marginTop: 16,
    marginBottom: 12,
});
function headingStyle(type, darkMode) {
    switch (type) {
        case "large":
            return css(fonts.h4, headingCss, darkMode && whiteText);
        case "small":
            return css(fonts.h5, headingCss, darkMode && whiteText);
        case "plain":
            return css(fonts.body, { fontWeight: "normal" }, headingCss, darkMode && whiteText);
        default:
            return css(fonts.h3, headingCss, darkMode && whiteText);
    }
}
//# sourceMappingURL=Blurb.jsx.map