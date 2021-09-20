import React                from 'react'
import { useMemo }          from 'react'
import { FC }               from 'react'

import { RegistrationFlow } from '../flows/registration.flow'
import { VerificationFlow } from '../flows/verification.flow'
import { RecoveryFlow }     from '../flows/recovery.flow'
import { SettingsFlow }     from '../flows/settings.flow'
import { ErrorsFlow }       from '../flows/errors.flow'
import { LoginFlow }        from '../flows/login.flow'
import { FlowName }         from '../flows/flow.interfaces'
import { KratosClient }     from '../flows/kratos.client'
import { Provider }         from './flows.context'

export interface KratosFlowProviderProps {
  basePath?: string
  name: FlowName
}

export const KratosFlowProvider: FC<KratosFlowProviderProps> = ({ name, basePath, children }) => {
  const client = useMemo(() => new KratosClient(basePath), [basePath])

  const flow = useMemo(() => {
    if (name === 'login') {
      return new LoginFlow(client)
    }

    if (name === 'registration') {
      return new RegistrationFlow(client)
    }

    if (name === 'verification') {
      return new VerificationFlow(client)
    }

    if (name === 'recovery') {
      return new RecoveryFlow(client)
    }

    if (name === 'settings') {
      return new SettingsFlow(client)
    }

    if (name === 'errors') {
      return new ErrorsFlow(client)
    }

    throw new Error(`Unkown flow: ${name}`)
  }, [name, client])

  return <Provider value={flow}>{children}</Provider>
}
