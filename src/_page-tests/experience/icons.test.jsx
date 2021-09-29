import * as React from "react";
import * as renderer from "react-test-renderer";
import { TestProvider } from "src/_page-tests/test-utils";
import Icons from "../../../pages/experience/brand/icons";
const ICONS = [
    {
        name: "Tree",
        description: "Organic Technology",
        preview: "icon.png",
        uri: "example.com/tree-icon.png",
        tags: ["plant"],
        id: "1",
    },
    {
        name: "Forest",
        description: "Ecological Technology",
        preview: "icon.png",
        uri: "example.com/forest-icon.png",
        tags: ["plant"],
        id: "2",
    },
];
describe("Experience/Icons", () => {
    it("renders", () => {
        const tree = renderer
            .create(<TestProvider>
          <Icons icons={ICONS}/>
        </TestProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=icons.test.jsx.map