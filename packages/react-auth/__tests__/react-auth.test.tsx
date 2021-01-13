import Adapter                                              from 'enzyme-adapter-react-16'
import React                                                from 'react'
import { configure, render }                                from 'enzyme'

import { AuthConsumer, AuthContext, AuthProvider, useAuth } from '../src/index'

configure({ adapter: new Adapter() })

describe('Test suit for react-auth package', function() {
  test('should return h1 with provided token using AuthProvider and AuthConsumer', function() {
    const tokenStub: string = 'k4Xergan4Sf7ejaD'

    expect(
      render(
        <AuthProvider value={tokenStub}>
          <div>
            <AuthConsumer>{token => <h1>{token}</h1>}</AuthConsumer>
          </div>
        </AuthProvider>
      ).text()
    ).toBe(tokenStub)
  })

  test('should return h1 with provided token using AuthContext', function() {
    const tokenStub: string = 'k4Xergan4Sf7ejaD'

    expect(
      render(
        <AuthContext.Provider value={tokenStub}>
          <div>
            <AuthContext.Consumer>{token => <h1>{token}</h1>}</AuthContext.Consumer>
          </div>
        </AuthContext.Provider>
      ).text()
    ).toBe(tokenStub)
  })

  test('should return h1 with provided token using useAuth hook', function() {
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

    expect(
      render(<App />)
        .find('.token')
        .text()
    ).toBe(tokenStub)
  })
})
