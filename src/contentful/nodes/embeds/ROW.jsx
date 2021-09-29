import { css } from "@emotion/react";
import { flexRow, WHEN_MOBILE } from "src/estyles";
import Button from "src/shared/Button.3";
export const ROW = {
    row: ({ fields }) => (<div css={css(rootStyle, fields.cssStyle, fields.mobileCss && { [WHEN_MOBILE]: fields.mobileCss })}>
      {fields.items.map(({ fields, sys }) => {
            switch (sys.contentType.sys.id) {
                case "button":
                    const button = fields;
                    return (<Button text={button.words} href={button.href || button.assetLink?.fields?.file?.url} kind={button.kind} size={button.size} align={button.align} target={button.assetLink?.fields?.file?.url ||
                            (button.href?.startsWith("http") && "_blank")}/>);
                case "logoGalleryItem":
                    const item = fields;
                    const imageFields = item?.image?.fields;
                    const rendered = (<img key={sys.id} alt={imageFields?.description} src={imageFields?.file?.url} width={imageFields?.file?.details?.image?.width} height={imageFields?.file?.details?.image?.height}/>);
                    if (item.url) {
                        return (<a href={item.url} rel="noreferrer">
                  {rendered}
                </a>);
                    }
                    return rendered;
            }
        })}
    </div>),
};
const rootStyle = css(flexRow, {
    flexWrap: "wrap"
});
//# sourceMappingURL=ROW.jsx.map