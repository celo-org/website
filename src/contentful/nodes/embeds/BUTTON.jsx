import * as React from "react";
import Button from "src/shared/Button.3";
export const BUTTON = {
    button: ({ fields }) => (<Button text={fields.words} href={fields.href || fields.assetLink?.fields?.file?.url} kind={fields.kind} size={fields.size} align={fields.align} target={fields.assetLink?.fields?.file?.url || (fields.href?.startsWith("http") && "_blank")}/>),
};
//# sourceMappingURL=BUTTON.jsx.map