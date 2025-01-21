import type { UpdateRegistrationFlowBody } from '@ory/client'
import type { UpdateVerificationFlowBody } from '@ory/client'
import type { UpdateRecoveryFlowBody }     from '@ory/client'
import type { UpdateSettingsFlowBody }     from '@ory/client'
import type { UpdateLoginFlowBody }        from '@ory/client'
import type { PropsWithChildren }          from 'react'
import type { ReactElement }               from 'react'

import { createContext }                   from 'react'
import React                               from 'react'

export type Body =
  | UpdateLoginFlowBody
  | UpdateRecoveryFlowBody
  | UpdateRegistrationFlowBody
  | UpdateSettingsFlowBody
  | UpdateVerificationFlowBody

export interface ContextSubmit<T extends Body> {
  onSubmit: (
    override?: Partial<T>,
    onSubmitConfirm?: () => void,
    onSubmitError?: (error: unknown) => void
  ) => Promise<void>
  submitting: boolean
}

const Context = createContext<ContextSubmit<Body>>({
  submitting: false,
  onSubmit: async () => Promise.resolve(),
})

const { Provider, Consumer } = Context

export const SubmitConsumer = Consumer
export const SubmitContext = Context

export const SubmitProvider = <T extends Body>({
  children,
  value,
}: PropsWithChildren<{ value: ContextSubmit<T> }>): ReactElement => (
  <Provider value={value as ContextSubmit<Body>}>{children}</Provider>
)
