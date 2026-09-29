import type { RegistrationFlow } from '@ory/kratos-client-fetch'
import type { VerificationFlow } from '@ory/kratos-client-fetch'
import type { RecoveryFlow }     from '@ory/kratos-client-fetch'
import type { SettingsFlow }     from '@ory/kratos-client-fetch'
import type { LoginFlow }        from '@ory/kratos-client-fetch'

import { createContext }         from 'react'

export type Flow = LoginFlow | RecoveryFlow | RegistrationFlow | SettingsFlow | VerificationFlow

export interface ContextFlow {
  flow?: Flow
  loading: boolean
}

const Context = createContext<ContextFlow>({ loading: false })

const { Provider, Consumer } = Context

export const FlowProvider = Provider
export const FlowConsumer = Consumer
export const FlowContext = Context
