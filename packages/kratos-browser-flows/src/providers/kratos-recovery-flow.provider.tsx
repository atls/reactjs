import React                  from 'react'

import { KratosFlowProvider } from './kratos-flow.provider'

export const KratosRecoveryFlowProvider = (props) => (
  <KratosFlowProvider {...props} name='recovery' />
)
