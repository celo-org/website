import * as React from "react"
import * as renderer from "react-test-renderer"
import { TestProvider } from "src/_page-tests/test-utils"
import DevelopersPage from "../../../pages/developers/index"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import { Props as BlurbProps } from "src/contentful/grid2-cells/Blurb"
import { Entry } from "contentful"
import { BLOCKS } from "@contentful/rich-text-types"

function blurbFactory(unique): Entry<BlurbProps> {
  return {
    sys: {
      id: unique,
      type: "",
      locale: "en",
      createdAt: "2021-07-01",
      updatedAt: "2021-07-01",
      contentType: { sys: { id: "proposition", type: "Link", linkType: "ContentType" } },
    },
    fields: {
      isNaturalSize: false,
      title: `Blurb ${unique}`,
      body: {
        nodeType: BLOCKS.DOCUMENT,
        content: [
          {
            nodeType: BLOCKS.PARAGRAPH,
            content: [{ nodeType: "text", value: "Hello World", marks: [], data: {} }],
            data: {},
          },
        ],
        data: {},
      },
    },
    toPlainObject: () => this,
    update: () => this,
  }
}

const TestData: ContentfulPage<GridRowContentType> = {
  title: "Celo: Build for all",
  description: "Celo's ultra light client makes it easy to build for smartphones across the world",
  slug: "developers",
  darkNav: false,
  sections: [
    {
      sys: {
        id: "1",
        type: "",
        locale: "en",
        createdAt: "2021-07-01",
        updatedAt: "2021-07-01",
        contentType: { sys: { id: "grid-row", type: "Link", linkType: "ContentType" } },
      },
      fields: {
        id: "test",
        columns: 3,
        cells: [blurbFactory("romeo"), blurbFactory("soma"), blurbFactory("rico")],
      },
      toPlainObject: () => this,
      update: () => this,
    },
  ],
}

describe("DevelopersPage", () => {
  it("renders", () => {
    const tree = renderer
      .create(
        <TestProvider>
          <DevelopersPage title={TestData.title} slug={TestData.slug} description={TestData.description} sections={TestData.sections} darkNav={TestData.darkNav} />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
