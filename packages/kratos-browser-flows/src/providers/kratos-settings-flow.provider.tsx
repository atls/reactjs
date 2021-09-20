import React                  from 'react'

import { KratosFlowProvider } from './kratos-flow.provider'

export const KratosSettingsFlowProvider = (props) => (
  <KratosFlowProvider {...props} name='settings' />
)
