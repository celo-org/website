import { render } from "@testing-library/react";
import * as React from "react";
import i18nForTests from "src/utils/i18nForTests";
import { I18nextProvider } from "react-i18next";
export function TestProvider({ children }) {
    return <I18nextProvider i18n={i18nForTests}>{children}</I18nextProvider>;
}
export const renderIgnoringUnstableFlushDiscreteUpdates = (component) => {
    const originalError = console.error;
    const error = jest.fn();
    console.error = error;
    const result = render(component);
    expect(error).toHaveBeenCalledTimes(1);
    expect(error).toHaveBeenCalledWith("Warning: unstable_flushDiscreteUpdates: Cannot flush updates when React is already rendering.%s", expect.any(String));
    console.error = originalError;
    return result;
};
//# sourceMappingURL=test-utils.jsx.map