/**
 * @jest-environment jsdom
 */

import React            from 'react'
import { render }       from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { IdentityLink } from './identity-link.component'

describe('identity-link.component', () => {
  const originalLocation = window.location

  const mockWindowLocation = (newLocation) => {
    // @ts-ignore
    delete window.location
    window.location = newLocation
  }

  afterEach(() => {
    mockWindowLocation(originalLocation)
  })

  it('without params', async () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { getByText } = render(<IdentityLink>{(url) => <a href={url}>Login</a>}</IdentityLink>)

    // @ts-ignore
    expect(getByText('Login')).toHaveAttribute(
      'href',
      'https://accounts.identity.atls.tech/auth/login?return_to=https://identity.atls.tech/'
    )
  })
})
