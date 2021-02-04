import JoinJobsPage from 'pages/jobs'
import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { TestProvider } from 'src/_page-tests/test-utils'

describe('JoinJobsPage', () => {
  describe('with jobs', () => {
    it('renders', () => {
      const tree = renderer
        .create(
          <TestProvider>
            <JoinJobsPage />
          </TestProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
  describe('without jobs', () => {
    it('renders', () => {
      const tree = renderer
        .create(
          <TestProvider>
            <JoinJobsPage />
          </TestProvider>
        )
        .toJSON()
      expect(tree).toMatchSnapshot()
    })
  })
})
