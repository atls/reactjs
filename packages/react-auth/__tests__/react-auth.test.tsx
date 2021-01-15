import React                                                from 'react'
import TestRenderer                                         from 'react-test-renderer'

import { AuthConsumer, AuthContext, AuthProvider, useAuth } from '../src/index'

describe('Test suit for react-auth package', function describer() {
  test('should return h1 with provided token using AuthProvider and AuthConsumer', function tester() {
    const tokenStub: string = 'k4Xergan4Sf7ejaD'

    const App = () => (
      <AuthProvider value={tokenStub}>
        <div>
          <AuthConsumer>{token => <h1>{token}</h1>}</AuthConsumer>
        </div>
      </AuthProvider>
    )

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe(tokenStub)
  })

  test('should return h1 with provided token using AuthContext', function tester() {
    const tokenStub: string = 'k4Xergan4Sf7ejaD'

    const App = () => (
      <AuthContext.Provider value={tokenStub}>
        <div>
          <AuthContext.Consumer>{token => <h1>{token}</h1>}</AuthContext.Consumer>
        </div>
      </AuthContext.Provider>
    )

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe(tokenStub)
  })

  test('should return h1 with provided token using useAuth hook', function tester() {
    const tokenStub: string = 'k4Xergan4Sf7ejaD'

    const App = () => <ProviderComponent />

    const ProviderComponent = () => (
      <AuthProvider value={tokenStub}>
        <Wrapper />
      </AuthProvider>
    )

    const Wrapper = () => (
      <div>
        <ConsumerComponent />
      </div>
    )

    const ConsumerComponent = () => {
      const token = useAuth()

      return <h1 className='token'>{token}</h1>
    }

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe(tokenStub)
  })
})
