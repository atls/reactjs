import type { FC }                      from 'react'

import type { KratosFlowProviderProps } from './kratos-flow.provider'

import React                            from 'react'

import { KratosFlowProvider }           from './kratos-flow.provider'

export const KratosLogoutFlowProvider: FC<Omit<KratosFlowProviderProps, 'name'>> = (props) => (
  <KratosFlowProvider {...props} name='logout' />
)
