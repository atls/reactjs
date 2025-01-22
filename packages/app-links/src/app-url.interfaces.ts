import type { JSX } from 'react'

export interface UseAppUrlProps {
  subdomain?: string
  pathname?: string
}

export interface AppLinkProps extends UseAppUrlProps {
  children?: (value: string) => JSX.Element
}
