import 'global-jsdom/register'

import assert           from 'node:assert/strict'
import { afterEach }    from 'node:test'
import { test }         from 'node:test'

import { cleanup }      from '@testing-library/react'
import { render }       from '@testing-library/react'
import React            from 'react'

import { IdentityLink } from './identity-link.component.js'

const dom = globalThis as typeof globalThis & {
  $jsdom: { reconfigure: (options: { url: string }) => void }
}

dom.$jsdom.reconfigure({ url: 'https://identity.atls.tech/' })

afterEach(() => {
  cleanup()
})

test('renders a login link with the current URL as return target', async () => {
  const { findByRole } = render(
    <IdentityLink returnTo>{(url) => <a href={url}>Login</a>}</IdentityLink>
  )

  const link = await findByRole('link', { name: 'Login' })

  assert.equal(
    link.getAttribute('href'),
    'https://accounts.atls.tech/auth/login?return_to=https://identity.atls.tech/'
  )
})
