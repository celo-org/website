import { fireEvent, render, waitFor } from "@testing-library/react";
import * as React from "react";
import { TestProvider } from "src/_page-tests/test-utils";
import CookieConsentWithEmotion from "src/header/CookieFolder/CookieConsentWithEmotion";
jest.mock("src/analytics/analytics", () => {
    return { agree: jest.fn(), disagree: jest.fn(), showVisitorCookieConsent: jest.fn(() => true) };
});
describe("CookieConsent", () => {
    describe("when agree", () => {
        const onAgree = jest.fn();
        const onDisagree = jest.fn();
        it("initializes Sentry", async () => {
            const { getByText, queryByText } = render(<TestProvider>
          <CookieConsentWithEmotion onAgree={onAgree} onDisagree={onDisagree}/>
        </TestProvider>);
            await waitFor(() => queryByText("Yes"));
            fireEvent.click(getByText("Yes"));
            expect(onAgree).toHaveBeenCalled();
        });
    });
    describe("when disagree", () => {
        const onAgree = jest.fn();
        const onDisagree = jest.fn();
        it("calls disagree", async () => {
            const { getByText, queryByText } = render(<TestProvider>
          <CookieConsentWithEmotion onAgree={onAgree} onDisagree={onDisagree}/>
        </TestProvider>);
            await waitFor(() => queryByText("No"));
            fireEvent.click(getByText("No"));
            expect(onDisagree).toHaveBeenCalled();
        });
    });
});
//# sourceMappingURL=CookieConsent.test.jsx.map