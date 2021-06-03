import * as React from "react"
import { contentfulToProps } from "src/experience/grants/contentfulToProps"
import dynamic from "next/dynamic"
import { Asset } from "contentful"
export const DirectorySection = dynamic(import("src/experience/grants/DirectorySection"))
export const IdeaReadiness = dynamic(import("src/experience/grants/IdeaReadiness"))
export const JourneySteps = dynamic(import("src/experience/grants/JourneySteps"))

interface DirSecProps {
  fields: {
    name: string
    categoryDescription: string
    items: any[]
  }
}

interface IdeaProps {
  fields: {
    title: string
    caption: string
    stages: Asset[]
  }
}

interface StepProps {
  fields: {
    stepTerm: string
    steps: string[]
  }
}

export const KIT_NODES = {
  grantDirectorySection: ({ fields }: DirSecProps) => (
    <DirectorySection
      name={fields.name}
      description={fields.categoryDescription}
      items={fields.items.map(contentfulToProps)}
    />
  ),
  grantIdeaReadiness: ({ fields }: IdeaProps) => (
    <IdeaReadiness title={fields.title} caption={fields.caption} stages={fields.stages} />
  ),
  steps: ({ fields }: StepProps) => <JourneySteps steps={fields.steps} term={fields.stepTerm} />,
}
