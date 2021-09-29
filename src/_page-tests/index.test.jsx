import HomePage from "pages/index";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { TestProvider } from "src/_page-tests/test-utils";
import { BLOCKS } from "@contentful/rich-text-types";
function blurbFactory(unique) {
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
    };
}
const TestData = {
    title: "Celo Home",
    description: "A description of Celo",
    slug: "home",
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
};
describe("HomePage", () => {
    it("renders", async () => {
        const tree = renderer
            .create(<TestProvider>
          <HomePage darkNav={false} title={TestData.title} description={TestData.description} slug={TestData.slug} sections={TestData.sections}/>
        </TestProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=index.test.jsx.map