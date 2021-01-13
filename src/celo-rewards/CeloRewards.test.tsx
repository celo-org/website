import * as React from "react";
import { TestProvider } from "src/_page-tests/test-utils";
import CeloRewards from "src/celo-rewards/CeloRewards";
import { render } from "@testing-library/react";

describe(CeloRewards, () => {
  it("Adding cUsd opens deep link", async () => {
    const { getByTestId } = render(
      <TestProvider>
        <CeloRewards />
      </TestProvider>
    );
    expect(getByTestId("AddCusd").closest("a")).toHaveAttribute(
      "href",
      "celo://wallet/cashIn"
    );
  });
  it("Learn More directs to education page", async () => {
    const { getByTestId } = render(
      <TestProvider>
        <CeloRewards />
      </TestProvider>
    );
    expect(getByTestId("learnMore").closest("a")).toHaveAttribute(
      "href",
      "/celo-rewards-education"
    );
  });
});
