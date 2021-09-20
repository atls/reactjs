import React                  from 'react'

import { KratosFlowProvider } from './kratos-flow.provider'

export const KratosVerificationFlowProvider = (props) => (
  <KratosFlowProvider {...props} name='verification' />
)
