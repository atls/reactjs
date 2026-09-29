import type { FrontendApi } from '@ory/kratos-client-fetch'

import { createContext }    from 'react'

const Context = createContext<FrontendApi | undefined>(undefined)

const { Provider, Consumer } = Context

export const SdkProvider = Provider
export const SdkConsumer = Consumer
export const SdkContext = Context
