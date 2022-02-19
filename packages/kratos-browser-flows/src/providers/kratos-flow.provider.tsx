import React                from 'react'
import { FC }               from 'react'
import { useMemo }          from 'react'

import { ErrorsFlow }       from '../flows/errors.flow'
import { FlowName }         from '../flows/flow.interfaces'
import { KratosClient }     from '../flows/kratos.client'
import { LoginFlow }        from '../flows/login.flow'
import { LogoutFlow }       from '../flows/logout.flow'
import { RecoveryFlow }     from '../flows/recovery.flow'
import { RegistrationFlow } from '../flows/registration.flow'
import { SettingsFlow }     from '../flows/settings.flow'
import { VerificationFlow } from '../flows/verification.flow'
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

    if (name === 'logout') {
      return new LogoutFlow(client)
    }

    throw new Error(`Unkown flow: ${name}`)
  }, [name, client])

  return <Provider value={flow}>{children}</Provider>
}
