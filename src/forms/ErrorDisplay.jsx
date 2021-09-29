import * as React from "react";
import MessageDisplay from "src/forms/MessageDisplay";
import { NameSpaces, useTranslation } from "src/i18n";
import { textStyles } from "src/styles";
export var ErrorKeys;
(function (ErrorKeys) {
    ErrorKeys["email"] = "email";
    ErrorKeys["pleaseWait"] = "pleaseWait";
    ErrorKeys["unknownError"] = "unknownError";
    ErrorKeys["generic"] = "generic";
})(ErrorKeys || (ErrorKeys = {}));
export function getErrorTransKey(field) {
    switch (field) {
        case ErrorKeys.email:
        case ErrorKeys.unknownError:
        case ErrorKeys.pleaseWait:
            return field;
        default:
            return ErrorKeys.generic;
    }
}
export const ErrorDisplay = React.memo(({ field, isShowing }) => {
    const { t } = useTranslation(NameSpaces.common);
    return (<MessageDisplay isShowing={isShowing} style={textStyles.error}>
      {field && t(`common:validationErrors.${field}`)}
    </MessageDisplay>);
});
//# sourceMappingURL=ErrorDisplay.jsx.map