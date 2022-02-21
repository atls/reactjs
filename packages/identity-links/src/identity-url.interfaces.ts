export type IdentityUrlType =
  | 'login'
  | 'registration'
  | 'settings'
  | 'verification'
  | 'recovery'
  | 'logout'

export interface UseIdentityUrlReturnToProps {
  subdomain?: string
  pathname?: string
}

export interface UseIdentityUrlProps {
  type?: IdentityUrlType
  returnTo?: true | false | UseIdentityUrlReturnToProps
}
