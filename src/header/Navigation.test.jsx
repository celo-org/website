import * as React from "react";
import * as renderer from "react-test-renderer";
import { TestProvider } from "src/_page-tests/test-utils";
import Navigation from "./Navigation";
describe("Navigation", () => {
    it("renders", () => {
        const tree = renderer
            .create(<TestProvider>
          <Navigation darkMode={false}/>
        </TestProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=Navigation.test.jsx.map