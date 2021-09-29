import * as React from "react";
import { trackDownload } from "src/experience/brandkit/tracking";
import { brandStyles } from "src/experience/common/constants";
import { NameSpaces, withNamespaces } from "src/i18n";
import Download from "src/icons/Download";
import Button, { BTN } from "src/shared/Button.3";
import { colors } from "src/styles";
export default withNamespaces(NameSpaces.brand)(function DownloadButton({ t, uri, trackingData, }) {
    const onPress = React.useCallback(async () => {
        await trackDownload(trackingData);
    }, [trackingData]);
    return (<Button kind={BTN.TERTIARY} text={t("downloadAssetBtn")} target={uri && uri.startsWith("http") && !uri.endsWith(".zip") ? "_blank" : undefined} href={uri} onPress={onPress} style={brandStyles.button} iconRight={<Download size={12} color={colors.primary}/>}/>);
});
//# sourceMappingURL=DownloadButton.jsx.map