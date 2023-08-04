import React            from 'react'
import { useState }     from 'react'
import { useEffect }    from 'react'

import { UserProvider } from '@atls/react-user'

const fetchSession = async (url) => {
  const response = await fetch(url)
  const text = await response.text()

  return text ? JSON.parse(text) : null
}

export const ApiAuthUserProvider = ({ url = '/api/auth/session', children }) => {
  const [session, setSession] = useState(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // eslint-disable-next-line no-console
      fetchSession(url).then(setSession).catch(console.error)
    }
  }, [url])

  return <UserProvider value={session}>{children}</UserProvider>
}
