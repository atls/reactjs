import React                  from 'react'

import { KratosFlowProvider } from './kratos-flow.provider'

export const KratosRegistrationFlowProvider = (props) => (
  <KratosFlowProvider {...props} name='registration' />
)
