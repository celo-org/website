import HomePage from "pages/index"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { TestProvider } from "src/_page-tests/test-utils"

describe("HomePage", () => {
  it("renders", async () => {
    const tree = renderer
      .create(
        <TestProvider>
          <HomePage
            title="Celo Home"
            description="A description of Celo"
            slug="home"
            sections={[]}
          />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
