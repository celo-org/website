import * as React from 'react'
import * as renderer from 'react-test-renderer'
import { TestProvider } from 'src/_page-tests/test-utils'
import Navigation from './Navigation'
import { render } from '@testing-library/react'
const {withRouter} = jest.requireMock("next/router")
jest.mock("next/router", () => {
    return {
        useRouter: () => ({
            pathname: "/"
        }),
        withRouter
    }
})
describe("Navigation", () =>{
    it("renders", () =>{
        const tree = renderer
        .create(
            <TestProvider>
                <Navigation />
            </TestProvider>
        )
        .toJSON()
        expect(tree).toMatchSnapshot()
    })

    describe('when', () => {
        it("", () => {
                render(<TestProvider>
                    <Navigation />
                </TestProvider>)
        })
    })
})