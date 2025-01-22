import type { ReactNode } from 'react'
import type { FC }        from 'react'

import { useState }       from 'react'
import { useEffect }      from 'react'
import React              from 'react'

import { UserProvider }   from '@atls/react-user'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Session = any

interface ApiAuthUserProviderProps {
  url?: string
  children: ReactNode
}

const fetchSession = async (url: string): Promise<Session> => {
  const response = await fetch(url)
  const text = await response.text()

  return text ? JSON.parse(text) : null
}

export const ApiAuthUserProvider: FC<ApiAuthUserProviderProps> = ({
  url = '/api/auth/session',
  children,
}) => {
  const [session, setSession] = useState<Session>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      fetchSession(url).then(setSession).catch(console.error)
    }
  }, [url])

  return <UserProvider value={session}>{children}</UserProvider>
}
