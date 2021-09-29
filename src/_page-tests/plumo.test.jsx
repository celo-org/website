import PlumoLanding from "pages/plumo";
import * as React from "react";
import * as renderer from "react-test-renderer";
import { TestProvider } from "src/_page-tests/test-utils";
describe("PlumoLanding", () => {
    it("renders", async () => {
        const tree = renderer
            .create(<TestProvider>
          <PlumoLanding darkNav={true} title="Plumo" description="Things about Plumo" slug="/plumo" sections={[]}/>
        </TestProvider>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
});
//# sourceMappingURL=plumo.test.jsx.map