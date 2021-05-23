import React                        from 'react'
import TestRenderer                 from 'react-test-renderer'

import { ModalsProvider, useModal } from '../src/index'

describe('Test suit for react-modals', () => {
  test('should return property of modal in provided store', () => {
    const ConsumerElement = () => {
      const { visible } = useModal('testModal')

      return <h1>{`${visible}`}</h1>
    }

    const Wrapper = () => (
      <div>
        <ConsumerElement />
      </div>
    )

    const App = () => (
      <ModalsProvider>
        <Wrapper />
      </ModalsProvider>
    )

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe('false')
  })
})
