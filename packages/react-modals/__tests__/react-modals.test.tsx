import Adapter                      from 'enzyme-adapter-react-16'
import React                        from 'react'
import { configure, render }        from 'enzyme'

import { ModalsProvider, useModal } from '../src/index'

configure({ adapter: new Adapter() })

describe('Test suit for react-modals', function describer() {
  test('should return property of modal in provided store', function tester() {
    const App = () => <Wrapper />

    const Wrapper = () => (
      <div>
        <ConsumerElement />
      </div>
    )

    const ConsumerElement = () => {
      const { visible } = useModal('testModal')

      return <h1 className='ctx'>{`${visible}`}</h1>
    }

    expect(
      render(
        <ModalsProvider>
          <App />
        </ModalsProvider>
      )
        .find('.ctx')
        .text()
    ).toBe('false')
  })
})
