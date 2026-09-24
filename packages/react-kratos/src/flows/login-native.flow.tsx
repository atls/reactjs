import type { OnRedirectHandler }   from '@ory/client-fetch'
import type { UpdateLoginFlowBody } from '@ory/kratos-client-fetch'
import type { GenericError }        from '@ory/kratos-client-fetch'
import type { Session }             from '@ory/kratos-client-fetch'
import type { LoginFlow }           from '@ory/kratos-client-fetch'
import type { ReactNode }           from 'react'
import type { ReactElement }        from 'react'

import { useEffect }                from 'react'
import { useState }                 from 'react'
import { useMemo }                  from 'react'
import { useCallback }              from 'react'
import React                        from 'react'

import { FlowProvider }             from '../providers/index.js'
import { ValuesProvider }           from '../providers/index.js'
import { ValuesStore }              from '../providers/index.js'
import { SubmitProvider }           from '../providers/index.js'
import { useSdk }                   from '../hooks/index.js'
import { createFlowErrorHandler }   from './flow-error.handler.js'
import { redirectInBrowser }        from './flow-error.handler.js'

export interface LoginNativeFlowProps {
  children: ReactNode
  aal?: 'aal1' | 'aal2'
  refresh?: boolean
  sessionToken?: string
  returnTo?: string
  onError?: (error: unknown) => void
  onSession?: (session: { session: Session; sessionToken?: string }) => Promise<void>
  onGenericError?: (error: GenericError) => void
  onRedirect?: OnRedirectHandler
}

export const LoginNativeFlow = ({
  aal,
  refresh,
  sessionToken,
  returnTo,
  children,
  onError,
  onSession,
  onGenericError,
  onRedirect = redirectInBrowser,
}: LoginNativeFlowProps): ReactElement => {
  const sdk = useSdk()
  const [flow, setFlow] = useState<LoginFlow>()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const values = useMemo(() => new ValuesStore(), [])

  const onCreate = useCallback(
    async (useFlowId?: string) => {
      setLoading(true)

      try {
        const data = useFlowId
          ? await sdk.getLoginFlow({ id: useFlowId })
          : await sdk.createNativeLoginFlow({
              aal,
              refresh,
              returnTo,
              xSessionToken: sessionToken,
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
    [sdk, aal, refresh, returnTo, sessionToken, setFlow, onError]
  )

  const onSubmit = useCallback(
    async (
      override?: Partial<UpdateLoginFlowBody>,
      onSubmitConfirm?: () => void,
      onSubmitError?: (error: unknown) => void
    ) => {
      setSubmitting(true)

      const body: UpdateLoginFlowBody = {
        ...(values.getValues() as UpdateLoginFlowBody),
        ...((override || {}) as UpdateLoginFlowBody),
      }

      try {
        const data = await sdk.updateLoginFlow({
          flow: String(flow?.id),
          updateLoginFlowBody: body,
          xSessionToken: sessionToken,
        })

        if (onSubmitConfirm) {
          onSubmitConfirm()
        }

        if (onSession) {
          await onSession({
            session: data.session,
            sessionToken: data.session_token,
          })
        }
      } catch (error) {
        if (onSubmitError) {
          onSubmitError(error)
        }

        await createFlowErrorHandler<LoginFlow>({
          onRestartFlow: onCreate,
          onValidationError: setFlow,
          onGenericError,
          onRedirect,
        })(error)
      } finally {
        setSubmitting(false)
      }
    },
    [sdk, flow, sessionToken, values, onCreate, onSession, onGenericError, onRedirect]
  )

  useEffect(() => {
    onCreate()
  }, [onCreate])

  return (
    <FlowProvider value={{ flow, loading }}>
      <ValuesProvider value={values}>
        <SubmitProvider<UpdateLoginFlowBody> value={{ submitting, onSubmit }}>
          {children}
        </SubmitProvider>
      </ValuesProvider>
    </FlowProvider>
  )
}
