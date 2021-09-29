import { useState, useCallback } from "react";
export function useBooleanToggle() {
    const [isOn, setOn] = useState(false);
    const toggle = useCallback(() => {
        return setOn(!isOn);
    }, [isOn, setOn]);
    return [isOn, toggle];
}
//# sourceMappingURL=useBooleanToggle.js.map