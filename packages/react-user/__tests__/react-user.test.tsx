import React                                   from 'react'
import TestRenderer                            from 'react-test-renderer'

import { UserProvider, WithUser, WithoutUser } from '../src/index'

describe('Test suit for react-user', function describer() {
  test('should return that user is authorized', function tester() {
    const authorizedMsg: string = 'User is authorized'
    const notAuthorizedMsg: string = 'User is not authorized'

    const App = () => (
      <UserProvider value>
        <div>
          <WithUser>
            <h1 className='result'>{authorizedMsg}</h1>
          </WithUser>

          <WithoutUser>
            <h1 className='result'>{notAuthorizedMsg}</h1>
          </WithoutUser>
        </div>
      </UserProvider>
    )

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe(authorizedMsg)
  })

  test('should return that user is not authorized', function tester() {
    const authorizedMsg: string = 'User is authorized'
    const notAuthorizedMsg: string = 'User is not authorized'

    const App = () => (
      <UserProvider value={false}>
        <div>
          <WithUser>
            <h1 className='result'>{authorizedMsg}</h1>
          </WithUser>

          <WithoutUser>
            <h1 className='result'>{notAuthorizedMsg}</h1>
          </WithoutUser>
        </div>
      </UserProvider>
    )

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe(notAuthorizedMsg)
  })
})
