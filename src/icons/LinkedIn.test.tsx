import * as React from 'react'
import renderer from 'react-test-renderer'
import { colors } from 'src/styles'
import {TestProvider} from 'src/_page-tests/test-utils'
import LinkedIn from "./LinkedIn"

describe('Logo for LinkendIn', () =>{
    it('renders', () =>{
        const tree = renderer.create(
            <TestProvider>
                <LinkedIn color={colors.dark} size={0} />
            </TestProvider>
        )
        expect(tree).toMatchSnapshot()
    })
})