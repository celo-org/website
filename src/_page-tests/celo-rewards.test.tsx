import CeloRewards from "pages/celo-rewards"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { TestProvider } from "src/_page-tests/test-utils"

describe("CeloRewards", () => {
  it("renders", () => {
    const tree = renderer
      .create(
        <TestProvider>
          <CeloRewards />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
