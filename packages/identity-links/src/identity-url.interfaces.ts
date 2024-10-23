export type IdentityUrlType =
  | 'login'
  | 'logout'
  | 'recovery'
  | 'registration'
  | 'settings'
  | 'verification'

export interface UseIdentityUrlReturnToProps {
  subdomain?: string
  pathname?: string
}

export interface UseIdentityUrlProps {
  type?: IdentityUrlType
  returnTo?: UseIdentityUrlReturnToProps | false | true
}

export interface IdentityLinkProps extends UseIdentityUrlProps {
  children?: (value: string) => JSX.Element
}
