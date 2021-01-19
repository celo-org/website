import * as React from "react";
import { TestProvider } from "src/_page-tests/test-utils";
import CeloRewardsEducation from "src/celo-rewards/CeloRewardsEducation";
import { render } from "@testing-library/react";

describe(CeloRewardsEducation, () => {
  it("Adding cUsd opens deep link", async () => {
    const { getByTestId } = render(
      <TestProvider>
        <CeloRewardsEducation />
      </TestProvider>
    );
    expect(getByTestId("AddCusd").closest("a")).toHaveAttribute(
      "href",
      "celo://wallet/cashIn"
    );
  });
});
