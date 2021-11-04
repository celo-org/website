import * as React from "react"
import {
  TestProvider,
} from "src/_page-tests/test-utils"
import About from "src/about/About"
import { render } from "@testing-library/react"


describe("About", () => {
  it("includes element with #contributors id", async () => {
    render(
      <TestProvider>
        <About contributors={[]} />
      </TestProvider>
    )
    expect(document.getElementById("contributors")).toBeTruthy()
  })
  it("includes element with #backers id", async () => {
    render(
      <TestProvider>
        <About contributors={[]} />
      </TestProvider>
    )
    expect(document.getElementById("backers")).toBeTruthy()
  })
})
