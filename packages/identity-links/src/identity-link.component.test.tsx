/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom/extend-expect'

import { render }       from '@testing-library/react'

import React            from 'react'

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
    mockWindowLocation(new URL('https://identity.monstrs.dev'))

    const { getByText } = render(
      <IdentityLink returnTo>{(url) => <a href={url}>Login</a>}</IdentityLink>
    )

    // @ts-ignore
    expect(getByText('Login')).toHaveAttribute(
      'href',
      'https://accounts.monstrs.dev/auth/login?return_to=https://identity.monstrs.dev/'
    )
  })
})
