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

import { EventEmitter }                               from 'events'

export type FlowName =
  | 'login'
  | 'registration'
  | 'recovery'
  | 'settings'
  | 'verification'
  | 'errors'

export type SelfServiceFlow =
  | SelfServiceRegistrationFlow
  | SelfServiceVerificationFlow
  | SelfServiceRecoveryFlow
  | SelfServiceSettingsFlow
  | SelfServiceLoginFlow

export type SubmitSelfServiceFlowBody =
  | SubmitSelfServiceRegistrationFlowBody
  | SubmitSelfServiceVerificationFlowBody
  | SubmitSelfServiceRecoveryFlowBody
  | SubmitSelfServiceSettingsFlowBody
  | SubmitSelfServiceLoginFlowBody

export interface Flow extends EventEmitter {
  setLoading(loading: boolean)

  isLoading()

  setState(state: SelfServiceFlow)

  hasState()

  getState(): SelfServiceFlow

  getMessages(): Array<UiText>

  getNode(name: string): UiNode | undefined

  getNodes(name: string): Array<UiNode>

  getNodesGroup(group: string): Array<UiNode>

  getValue(name): string | any

  setValue(name: string, value: string)

  getValues(): SubmitSelfServiceFlowBody

  load(): Promise<void>

  submit(method?: string): Promise<void>
}
