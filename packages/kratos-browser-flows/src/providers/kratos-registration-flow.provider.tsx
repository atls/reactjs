import type { FC }                      from 'react'

import type { FlowName }                from '../flows/flow.interfaces'
import type { KratosFlowProviderProps } from './kratos-flow.provider'

import React                            from 'react'

import { KratosFlowProvider }           from './kratos-flow.provider'

export const KratosRegistrationFlowProvider: FC<Omit<KratosFlowProviderProps, 'name'>> = (
  props
) => <KratosFlowProvider {...props} name={'registration' as FlowName} />
