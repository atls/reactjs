import type { FC }          from 'react'

import { useState }         from 'react'
import { getDomain }        from 'tldjs'
import React                from 'react'

import { UserProvider }     from '@atls/react-user'

import { useBrowserEffect } from './use-browser-effect.hook'

export type BasePathFn = () => string

export type BasePath = BasePathFn | string

export type Session = Record<string, any>

export type IdentityBrowserUserProviderProps = {
  basePath?: BasePath
  children: React.ReactNode
}

const locationExtractedBasePath: BasePathFn = () => {
  const { hostname, protocol } = window.location

  if (hostname === 'localhost') {
    return `${protocol}//localhost:4433`
  }

  const domain = getDomain(hostname)

  return `${protocol}//identity.${domain!}`
}

export class IdentitySessionsWhoamiUrl {
  static fromBasePath(basePath: BasePath): string {
    return new URL(
      '/sessions/whoami',
      typeof basePath === 'function' ? basePath() : basePath
    ).toString()
  }
}

export const fetchSession = async (url: string): Promise<Session | null> => {
  const response = await fetch(url, {
    credentials: 'include',
  })

  const data = await response.json()

  if (data?.error) {
    if (data.error.code === 401) {
      return null
    }

    throw new Error(data.error.message as string)
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return data
}

export const IdentityBrowserUserProvider: FC<IdentityBrowserUserProviderProps> = ({
  basePath = locationExtractedBasePath,
  children,
}) => {
  const [session, setSession] = useState(undefined)

  useBrowserEffect(() => {
    // @ts-expect-error
    fetchSession(IdentitySessionsWhoamiUrl.fromBasePath(basePath)).then(setSession)
  }, [locationExtractedBasePath])

  return <UserProvider value={session}>{children}</UserProvider>
}
