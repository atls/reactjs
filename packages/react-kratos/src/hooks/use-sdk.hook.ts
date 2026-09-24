import type { FrontendApi } from '@ory/kratos-client-fetch'

import { useContext }       from 'react'

import { SdkContext }       from '../providers/index.js'

export const useSdk = (): FrontendApi => {
  const sdk = useContext(SdkContext)

  if (!sdk) {
    throw new Error('Missing <SdkProvider>')
  }

  return sdk
}
