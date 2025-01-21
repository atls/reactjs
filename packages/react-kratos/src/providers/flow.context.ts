import type { RegistrationFlow } from '@ory/client'
import type { VerificationFlow } from '@ory/client'
import type { RecoveryFlow }     from '@ory/client'
import type { SettingsFlow }     from '@ory/client'
import type { LoginFlow }        from '@ory/client'

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
