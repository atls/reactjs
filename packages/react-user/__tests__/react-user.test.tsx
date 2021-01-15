import Adapter                                 from 'enzyme-adapter-react-16'
import React                                   from 'react'
import { configure, render }                   from 'enzyme'

import { UserProvider, WithUser, WithoutUser } from '../src/index'

configure({ adapter: new Adapter() })

describe('Test suit for react-user', function describer() {
  test('should return that user is authorized', function tester() {
    const authorizedMsg: string = 'User is authorized'
    const notAuthorizedMsg: string = 'User is not authorized'

    expect(
      render(
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
        .find('.result')
        .text()
    ).toBe(authorizedMsg)
  })

  test('should return that user is not authorized', function tester() {
    const authorizedMsg: string = 'User is authorized'
    const notAuthorizedMsg: string = 'User is not authorized'

    expect(
      render(
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
        .find('.result')
        .text()
    ).toBe(notAuthorizedMsg)
  })
})
