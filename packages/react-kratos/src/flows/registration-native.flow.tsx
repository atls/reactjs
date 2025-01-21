import type { UpdateRegistrationFlowBody } from '@ory/client'
import type { GenericError }               from '@ory/client'
import type { Session }                    from '@ory/client'
import type { RegistrationFlow }           from '@ory/client'
import type { ReactNode }                  from 'react'
import type { ReactElement }               from 'react'

import { AxiosError }                      from 'axios'
import { useEffect }                       from 'react'
import { useState }                        from 'react'
import { useMemo }                         from 'react'
import { useCallback }                     from 'react'
import React                               from 'react'

import { FlowProvider }                    from '../providers'
import { ValuesProvider }                  from '../providers'
import { ValuesStore }                     from '../providers'
import { SubmitProvider }                  from '../providers'
import { useSdk }                          from '../hooks'

export interface RegistrationNativeFlowProps {
  children: ReactNode
  returnTo?: string
  onSession?: (session: { session: Session; sessionToken?: string }) => Promise<void>
  onError?: (error: unknown) => void
  onGenericError?: (error: GenericError) => void
}

export const RegistrationNativeFlow = ({
  returnTo,
  children,
  onSession,
  onError,
  onGenericError,
}: RegistrationNativeFlowProps): ReactElement => {
  const sdk = useSdk()
  const [flow, setFlow] = useState<RegistrationFlow>()
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const values = useMemo(() => new ValuesStore(), [])

  const onCreate = useCallback(async () => {
    setLoading(true)

    try {
      const { data } = await sdk.createNativeRegistrationFlow({
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
  }, [sdk, returnTo, setFlow, onError])

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
        const { data } = await sdk.updateRegistrationFlow({
          flow: flow!.id,
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

        if (error instanceof AxiosError) {
          if (error.response?.status === 400) {
            if (error.response.data.error) {
              if (onGenericError) {
                onGenericError(error.response.data.error as GenericError)
              }
            } else {
              setFlow(error.response.data as RegistrationFlow)
            }
          } else if (error.response?.status === 404 || error.response?.status === 410) {
            onCreate()
          }
        }
      } finally {
        setSubmitting(false)
      }
    },
    [sdk, flow, values, onCreate, onSession, onGenericError]
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
