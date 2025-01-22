import { useAppUrl } from '@atls/react-app-links'

export const useGatewayUrl = (defaultUrl?: string): string => {
  const url = useAppUrl({ subdomain: 'gateway' })

  return defaultUrl || url || ''
}
