export type IdentityUrlType =
  | 'login'
  | 'registration'
  | 'settings'
  | 'verification'
  | 'recovery'
  | 'logout'

export interface UseIdentityUrlProps {
  type?: IdentityUrlType
  returnTo?: string | false
  subdomain?: string
  substractHost?: string
}
