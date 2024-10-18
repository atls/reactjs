/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'

import { render }       from '@testing-library/react'
import React            from 'react'

import { IdentityLink } from './identity-link.component'

describe('identity-link.component', () => {
  const originalLocation = window.location

  const mockWindowLocation = (newLocation: Location | URL | string): void => {
    // @ts-expect-error
    delete window.location
    // @ts-expect-error
    window.location = newLocation
  }

  afterEach(() => {
    mockWindowLocation(originalLocation)
  })

  it('without params', async () => {
    mockWindowLocation(new URL('https://identity.monstrs.dev'))

    const { getByText } = render(
      // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
      <IdentityLink returnTo>{(url) => <a href={url}>Login</a>}</IdentityLink>
    )

    expect(getByText('Login')).toHaveAttribute(
      'href',
      'https://accounts.monstrs.dev/auth/login?return_to=https://identity.monstrs.dev/'
    )
  })
})
