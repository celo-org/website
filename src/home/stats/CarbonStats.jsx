import { NameSpaces, useTranslation } from "src/i18n";
import { Datum } from "./Stats";
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = 24 * HOUR;
const DAY_ONE = new Date("2020-04-27");
export default function CarbonStats() {
    const { t } = useTranslation(NameSpaces.home);
    const today = new Date();
    const difference = today.getTime() - DAY_ONE.getTime();
    return (<Datum value={`${Math.floor(difference / DAY)}`} title={t("daysCarbonNegative")} id="carbon" link={"https://www.wren.co/profile/celo"}/>);
}
//# sourceMappingURL=CarbonStats.jsx.map