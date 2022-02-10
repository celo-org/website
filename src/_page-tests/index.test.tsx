import HomePage from "pages/index"
import * as React from "react"
import * as renderer from "react-test-renderer"
import { TestProvider } from "src/_page-tests/test-utils"
import { ContentfulPage, GridRowContentType } from "src/utils/contentful"
import { Props as BlurbProps } from "src/contentful/grid2-cells/Blurb"
import { Entry } from "contentful"
import { BLOCKS } from "@contentful/rich-text-types"
import { Props as HomeCoverProps } from "src/home/Cover"

function blurbFactory(unique): Entry<BlurbProps> {
  return {
    metadata: { tags: [] },
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
      newIcon: false,
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
// const asset: Asset = {
//   sys: {
//     type: "image",
//     id: "231",
//     createdAt: "",
//     updatedAt: "",
//     locale: "",
//     contentType: {
//       sys: { id: "1", linkType: "ContentType", type: "Link" },
//     },
//   },
//   fields: {
//     title: "Image",
//     description: "Description",
//     file: {
//       url: "/celo.jpg",
//       details: {
//         size: 100,
//         image: {
//           width: 100,
//           height: 100,
//         },
//       },
//       fileName: "celo.jpg",
//       contentType: "img/jpg",
//     },
//   },
//   metadata: { tags: [] },
//   toPlainObject: () => this,
// }

const TestData: ContentfulPage<GridRowContentType | HomeCoverProps> = {
  title: "Celo Home",
  description: "A description of Celo",
  slug: "home",
  darkNav: false,
  sections: [
    {
      toPlainObject: () => this,
      update: () => this,
      metadata: { tags: [] },
      sys: {
        id: "2",
        locale: "en",
        type: "",
        createdAt: "2021-07-01",
        updatedAt: "2021-07-01",
        contentType: { sys: { id: "heading", type: "Link", linkType: "ContentType" } },
      },
      fields: {
        title: "Test",
        subTitle: {
          nodeType: BLOCKS.DOCUMENT,
          content: [
            {
              nodeType: BLOCKS.PARAGRAPH,
              content: [{ nodeType: "text", value: "Built for Us", marks: [], data: {} }],
              data: {},
            },
          ],
          data: {},
        },
        marquee: ["One", "Two"],
        links: [],
        darkMode: true,
      },
    },
    {
      metadata: { tags: [] },
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

describe("HomePage", () => {
  it("renders", async () => {
    const tree = renderer
      .create(
        <TestProvider>
          <HomePage
            darkNav={false}
            title={TestData.title}
            description={TestData.description}
            slug={TestData.slug}
            sections={TestData.sections}
          />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
