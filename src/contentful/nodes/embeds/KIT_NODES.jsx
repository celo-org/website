import * as React from "react";
import { contentfulToProps } from "src/experience/grants/contentfulToProps";
import dynamic from "next/dynamic";
export const DirectorySection = dynamic(import("src/experience/grants/DirectorySection"));
export const IdeaReadiness = dynamic(import("src/experience/grants/IdeaReadiness"));
export const JourneySteps = dynamic(import("src/experience/grants/JourneySteps"));
export const KIT_NODES = {
    grantDirectorySection: ({ fields }) => (<DirectorySection name={fields.name} description={fields.categoryDescription} items={fields.items.map(contentfulToProps)}/>),
    grantIdeaReadiness: ({ fields }) => (<IdeaReadiness title={fields.title} caption={fields.caption} stages={fields.stages}/>),
    steps: ({ fields }) => <JourneySteps steps={fields.steps} term={fields.stepTerm}/>,
};
//# sourceMappingURL=KIT_NODES.jsx.map