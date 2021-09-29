import scrollIntoView from "scroll-into-view";
import { HEADER_HEIGHT } from "src/shared/Styles";
export default function scrollToHash(extraDistance) {
    const element = document.getElementById(window.location.hash.replace("#", ""));
    if (element) {
        scrollIntoView(element, {
            time: 200,
            align: { top: 0, topOffset: HEADER_HEIGHT + extraDistance },
        });
    }
}
//# sourceMappingURL=scrollToHash.js.map