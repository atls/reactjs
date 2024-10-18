/**
 * @jest-environment jsdom
 */

import { renderHook }     from '@testing-library/react-hooks'

import { useIdentityUrl } from './use-identity-url.hook'

describe('use-identity-url', () => {
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

  it('without params', () => {
    mockWindowLocation(new URL('https://identity.monstrs.dev'))

    const { result } = renderHook(() => useIdentityUrl({ returnTo: true }))

    expect(result.current).toBe(
      'https://accounts.monstrs.dev/auth/login?return_to=https://identity.monstrs.dev/'
    )
  })

  it('custom type', () => {
    mockWindowLocation(new URL('https://identity.monstrs.dev'))

    const { result } = renderHook(() => useIdentityUrl({ type: 'registration', returnTo: true }))

    expect(result.current).toBe(
      'https://accounts.monstrs.dev/auth/registration?return_to=https://identity.monstrs.dev/'
    )
  })

  it('return to path', () => {
    mockWindowLocation(new URL('https://identity.monstrs.dev'))

    const { result } = renderHook(() => useIdentityUrl({ returnTo: { pathname: '/custom' } }))

    expect(result.current).toBe(
      'https://accounts.monstrs.dev/auth/login?return_to=https://identity.monstrs.dev/custom'
    )
  })

  it('return to url', () => {
    mockWindowLocation(new URL('https://identity.monstrs.dev'))

    const { result } = renderHook(() => useIdentityUrl({ returnTo: { subdomain: 'custom' } }))

    expect(result.current).toBe(
      'https://accounts.monstrs.dev/auth/login?return_to=https://custom.monstrs.dev/'
    )
  })
})
