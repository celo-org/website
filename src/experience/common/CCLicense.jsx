import * as React from "react";
import { Text } from "react-native";
import { brandStyles } from "src/experience/common/constants";
import { NameSpaces, Trans, withNamespaces } from "src/i18n";
import InlineAnchor from "src/shared/InlineAnchor";
import pagePaths from "src/shared/menu-items";
import { fonts, standardStyles } from "src/styles";
export default withNamespaces(NameSpaces.brand)(function CCLicense({ textI18nKey, t, }) {
    return (<>
      <Text style={[fonts.h5, brandStyles.gap, standardStyles.blockMarginTop]}>
        {t("licenseTitle")}
      </Text>
      <Text style={[fonts.p, brandStyles.gap, standardStyles.elementalMargin]}>
        <Trans ns={NameSpaces.brand} i18nKey={textI18nKey}>
          <InlineAnchor href={pagePaths.BRAND_POLICY.link}>Brand Policy</InlineAnchor>
        </Trans>
      </Text>
    </>);
});
//# sourceMappingURL=CCLicense.jsx.map