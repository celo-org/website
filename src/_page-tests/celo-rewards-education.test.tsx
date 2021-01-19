import CeloRewardsEducation from 'pages/celo-rewards-education'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { TestProvider } from 'src/_page-tests/test-utils'

describe('CeloRewardsEducation', () => {
  it('renders', () => {
    const tree = renderer
      .create(
        <TestProvider>
          <CeloRewardsEducation />
        </TestProvider>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
