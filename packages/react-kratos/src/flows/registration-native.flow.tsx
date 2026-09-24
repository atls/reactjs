import type { OnRedirectHandler }          from '@ory/client-fetch'
import type { UpdateRegistrationFlowBody } from '@ory/kratos-client-fetch'
import type { GenericError }               from '@ory/kratos-client-fetch'
import type { Session }                    from '@ory/kratos-client-fetch'
import type { RegistrationFlow }           from '@ory/kratos-client-fetch'
import type { ReactNode }                  from 'react'
import type { ReactElement }               from 'react'

import { useEffect }                       from 'react'
import { useState }                        from 'react'
import { useMemo }                         from 'react'
import { useCallback }                     from 'react'
import React                               from 'react'

import { FlowProvider }                    from '../providers/index.js'
import { ValuesProvider }                  from '../providers/index.js'
import { ValuesStore }                     from '../providers/index.js'
import { SubmitProvider }                  from '../providers/index.js'
import { useSdk }                          from '../hooks/index.js'
import { createFlowErrorHandler }          from './flow-error.handler.js'
import { redirectInBrowser }               from './flow-error.handler.js'

export interface RegistrationNativeFlowProps {
  children: ReactNode
  returnTo?: string
  onSession?: (session: { session: Session; sessionToken?: string }) => Promise<void>
  onError?: (error: unknown) => void
  onGenericError?: (error: GenericError) => void
  onRedirect?: OnRedirectHandler
}

export const RegistrationNativeFlow = ({
  returnTo,
  children,
  onSession,
  onError,
  onGenericError,
  onRedirect = redirectInBrowser,
}: RegistrationNativeFlowProps): ReactElement => {
  const sdk = useSdk()
  const [flow, setFlow] = useState<RegistrationFlow>()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const values = useMemo(() => new ValuesStore(), [])

  const onCreate = useCallback(
    async (useFlowId?: string) => {
      setLoading(true)

      try {
        const data = useFlowId
          ? await sdk.getRegistrationFlow({ id: useFlowId })
          : await sdk.createNativeRegistrationFlow({
              returnTo,
              returnSessionTokenExchangeCode: true,
            })

        setFlow(data)
      } catch (error) {
        if (onError) {
          onError(error)
        }
      } finally {
        setLoading(false)
      }
    },
    [sdk, returnTo, setFlow, onError]
  )

  const onSubmit = useCallback(
    async (
      override?: Partial<UpdateRegistrationFlowBody>,
      onSubmitConfirm?: () => void,
      onSubmitError?: (error: unknown) => void
    ): Promise<void> => {
      setSubmitting(true)

      const body: UpdateRegistrationFlowBody = {
        ...(values.getValues() as UpdateRegistrationFlowBody),
        ...((override || {}) as UpdateRegistrationFlowBody),
      }

      try {
        const data = await sdk.updateRegistrationFlow({
          flow: String(flow?.id),
          updateRegistrationFlowBody: body,
        })

        if (onSubmitConfirm) {
          onSubmitConfirm()
        }

        if (data.session && onSession) {
          await onSession({
            session: data.session,
            sessionToken: data.session_token,
          })
        }
      } catch (error) {
        if (onSubmitError) {
          onSubmitError(error)
        }

        await createFlowErrorHandler<RegistrationFlow>({
          onRestartFlow: onCreate,
          onValidationError: setFlow,
          onGenericError,
          onRedirect,
        })(error)
      } finally {
        setSubmitting(false)
      }
    },
    [sdk, flow, values, onCreate, onSession, onGenericError, onRedirect]
  )

  useEffect(() => {
    onCreate()
  }, [onCreate])

  return (
    <FlowProvider value={{ flow, loading }}>
      <ValuesProvider value={values}>
        <SubmitProvider<UpdateRegistrationFlowBody> value={{ submitting, onSubmit }}>
          {children}
        </SubmitProvider>
      </ValuesProvider>
    </FlowProvider>
  )
}
