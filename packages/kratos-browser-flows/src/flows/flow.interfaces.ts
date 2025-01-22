import type { SelfServiceRegistrationFlow }           from '@ory/kratos-client'
import type { SelfServiceVerificationFlow }           from '@ory/kratos-client'
import type { SelfServiceRecoveryFlow }               from '@ory/kratos-client'
import type { SelfServiceSettingsFlow }               from '@ory/kratos-client'
import type { SelfServiceLoginFlow }                  from '@ory/kratos-client'
import type { SubmitSelfServiceRegistrationFlowBody } from '@ory/kratos-client'
import type { SubmitSelfServiceVerificationFlowBody } from '@ory/kratos-client'
import type { SubmitSelfServiceRecoveryFlowBody }     from '@ory/kratos-client'
import type { SubmitSelfServiceSettingsFlowBody }     from '@ory/kratos-client'
import type { SubmitSelfServiceLoginFlowBody }        from '@ory/kratos-client'
import type { UiText }                                from '@ory/kratos-client'
import type { UiNode }                                from '@ory/kratos-client'
import type { EventEmitter }                          from 'events'

export type FlowName =
  | 'errors'
  | 'login'
  | 'recovery'
  | 'registration'
  | 'settings'
  | 'verification'

export type SelfServiceFlow =
  | SelfServiceLoginFlow
  | SelfServiceRecoveryFlow
  | SelfServiceRegistrationFlow
  | SelfServiceSettingsFlow
  | SelfServiceVerificationFlow

export type SubmitSelfServiceFlowBody =
  | SubmitSelfServiceLoginFlowBody
  | SubmitSelfServiceRecoveryFlowBody
  | SubmitSelfServiceRegistrationFlowBody
  | SubmitSelfServiceSettingsFlowBody
  | SubmitSelfServiceVerificationFlowBody

export interface Flow extends EventEmitter {
  setLoading: (loading: boolean) => void

  isLoading: () => boolean

  setState: (state: SelfServiceFlow) => void

  hasState: () => boolean

  getState: () => SelfServiceFlow

  getMessages: () => Array<UiText>

  getNode: (name: string) => UiNode | undefined

  getNodes: (name: string) => Array<UiNode>

  getNodesGroup: (group: string) => Array<UiNode>

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getValue: (name: string) => any

  setValue: (name: string, value: string) => void

  getValues: () => SubmitSelfServiceFlowBody

  load: () => Promise<void>

  submit: (method?: string) => Promise<void>
}
