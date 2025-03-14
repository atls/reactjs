import type { UpdateLoginFlowBody } from '@ory/client'
import type { GenericError }        from '@ory/client'
import type { Session }             from '@ory/client'
import type { LoginFlow }           from '@ory/client'
import type { ReactNode }           from 'react'
import type { ReactElement }        from 'react'

import { AxiosError }               from 'axios'
import { useEffect }                from 'react'
import { useState }                 from 'react'
import { useMemo }                  from 'react'
import { useCallback }              from 'react'
import React                        from 'react'

import { FlowProvider }             from '../providers'
import { ValuesProvider }           from '../providers'
import { ValuesStore }              from '../providers'
import { SubmitProvider }           from '../providers'
import { useSdk }                   from '../hooks'

export interface LoginNativeFlowProps {
  children: ReactNode
  aal?: 'aal1' | 'aal2'
  refresh?: boolean
  sessionToken?: string
  returnTo?: string
  onError?: (error: unknown) => void
  onSession?: (session: { session: Session; sessionToken?: string }) => Promise<void>
  onGenericError?: (error: GenericError) => void
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
}: LoginNativeFlowProps): ReactElement => {
  const sdk = useSdk()
  const [flow, setFlow] = useState<LoginFlow>()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const values = useMemo(() => new ValuesStore(), [])

  const onCreate = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await sdk.createNativeLoginFlow({
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
  }, [sdk, aal, refresh, returnTo, sessionToken, setFlow, onError])

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
        const { data } = await sdk.updateLoginFlow({
          flow: String(flow?.id),
          updateLoginFlowBody: body,
          xSessionToken: sessionToken,
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

        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            if (error.response.data.error) {
              if (onGenericError) {
                onGenericError(error.response.data.error as GenericError)
              }
            } else {
              setFlow(error.response.data as LoginFlow)
            }
          } else if (error.response?.status === 404 || error.response?.status === 410) {
            onCreate()
          }
        }
      } finally {
        setSubmitting(false)
      }
    },
    [sdk, flow, sessionToken, values, onCreate, onSession, onGenericError]
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
