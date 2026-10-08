import 'global-jsdom/register'

import assert             from 'node:assert/strict'
import { afterEach }      from 'node:test'
import { test }           from 'node:test'

import { cleanup }        from '@testing-library/react'
import { renderHook }     from '@testing-library/react'
import { waitFor }        from '@testing-library/react'

import { useIdentityUrl } from './use-identity-url.hook.js'

const dom = globalThis as typeof globalThis & {
  $jsdom: { reconfigure: (options: { url: string }) => void }
}

dom.$jsdom.reconfigure({ url: 'https://identity.monstrs.dev/' })

afterEach(() => {
  cleanup()
})

test('uses the current URL as the default return target', async () => {
  const { result } = renderHook(() => useIdentityUrl({ returnTo: true }))

  await waitFor(() => {
    assert.equal(
      result.current,
      'https://accounts.monstrs.dev/auth/login?return_to=https://identity.monstrs.dev/'
    )
  })
})

test('uses the requested identity action', async () => {
  const { result } = renderHook(() => useIdentityUrl({ type: 'registration', returnTo: true }))

  await waitFor(() => {
    assert.equal(
      result.current,
      'https://accounts.monstrs.dev/auth/registration?return_to=https://identity.monstrs.dev/'
    )
  })
})

test('uses a custom return path', async () => {
  const { result } = renderHook(() => useIdentityUrl({ returnTo: { pathname: '/custom' } }))

  await waitFor(() => {
    assert.equal(
      result.current,
      'https://accounts.monstrs.dev/auth/login?return_to=https://identity.monstrs.dev/custom'
    )
  })
})

test('uses a custom return subdomain', async () => {
  const { result } = renderHook(() => useIdentityUrl({ returnTo: { subdomain: 'custom' } }))

  await waitFor(() => {
    assert.equal(
      result.current,
      'https://accounts.monstrs.dev/auth/login?return_to=https://custom.monstrs.dev/'
    )
  })
})
