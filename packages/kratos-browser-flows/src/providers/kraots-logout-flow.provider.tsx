import type { FC }                      from 'react'

import type { FlowName }                from '../flows/flow.interfaces'
import type { KratosFlowProviderProps } from './kratos-flow.provider'

import React                            from 'react'

import { KratosFlowProvider }           from './kratos-flow.provider'

export const KratosLogoutFlowProvider: FC<Omit<KratosFlowProviderProps, 'name'>> = (props) => (
  <KratosFlowProvider {...props} name={'logout' as FlowName} />
)
