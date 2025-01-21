import { FrontendApi }   from '@ory/client'
import { Configuration } from '@ory/client'
import { useContext }    from 'react'
import { useMemo }       from 'react'

import { SdkContext }    from '../providers'

export const useSdk = (): FrontendApi => {
  const sdk = useContext(SdkContext)

  return useMemo(() => {
    if (sdk) {
      return sdk
    }

    return new FrontendApi(
      new Configuration({
        basePath: 'http://localhost:4433',
        baseOptions: {
          withCredentials: false,
          timeout: 10000,
        },
      })
    )
  }, [sdk])
}
