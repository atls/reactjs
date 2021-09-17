/**
 * @jest-environment jsdom
 */

import { renderHook }     from '@testing-library/react-hooks'

import { useIdentityUrl } from './use-identity-url.hook'

describe('use-identity-url', () => {
  const originalLocation = window.location

  const mockWindowLocation = (newLocation) => {
    // @ts-ignore
    delete window.location
    window.location = newLocation
  }

  afterEach(() => {
    mockWindowLocation(originalLocation)
  })

  it('without params', () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { result } = renderHook(() => useIdentityUrl())

    expect(result.current).toBe(
      'https://accounts.identity.atls.tech/auth/login?return_to=https://identity.atls.tech/'
    )
  })

  it('custom type', () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { result } = renderHook(() => useIdentityUrl({ type: 'registration' }))

    expect(result.current).toBe(
      'https://accounts.identity.atls.tech/auth/registration?return_to=https://identity.atls.tech/'
    )
  })

  it('custom subdomain', () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { result } = renderHook(() => useIdentityUrl({ subdomain: 'custom' }))

    expect(result.current).toBe(
      'https://custom.identity.atls.tech/auth/login?return_to=https://identity.atls.tech/'
    )
  })

  it('return to path', () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { result } = renderHook(() => useIdentityUrl({ returnTo: '/custom' }))

    expect(result.current).toBe(
      'https://accounts.identity.atls.tech/auth/login?return_to=https://identity.atls.tech/custom'
    )
  })

  it('return to url', () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { result } = renderHook(() => useIdentityUrl({ returnTo: 'https://custom.atls.tech/' }))

    expect(result.current).toBe(
      'https://accounts.identity.atls.tech/auth/login?return_to=https://custom.atls.tech/'
    )
  })

  it('substract host', () => {
    mockWindowLocation(new URL('https://identity.atls.tech'))

    const { result } = renderHook(() => useIdentityUrl({ substractHost: 'identity' }))

    expect(result.current).toBe(
      'https://accounts.atls.tech/auth/login?return_to=https://identity.atls.tech/'
    )
  })
})
