import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { TestProvider } from 'src/_page-tests/test-utils'
import Header from './Header.3'

describe("routeChangeComplete", () =>{
    it("renders", () =>{
        const tree = renderer
        .create(
            <TestProvider>
                <Header />
            </TestProvider>
        )
        .toJSON()
        expect(tree).toMatchSnapshot()
    })
})