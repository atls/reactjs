import React                        from 'react'
import TestRenderer                 from 'react-test-renderer'

import { ModalsProvider, useModal } from '../src/index'

describe('Test suit for react-modals', function describer() {
  test('should return property of modal in provided store', function tester() {
    const App = () => (
      <ModalsProvider>
        <Wrapper />
      </ModalsProvider>
    )

    const Wrapper = () => (
      <div>
        <ConsumerElement />
      </div>
    )

    const ConsumerElement = () => {
      const { visible } = useModal('testModal')

      return <h1>{`${visible}`}</h1>
    }

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe('false')
  })
})
