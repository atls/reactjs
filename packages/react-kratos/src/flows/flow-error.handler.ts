import type { OnRedirectHandler } from '@ory/client-fetch'
import type { GenericError }      from '@ory/kratos-client-fetch'

import { ResponseError }          from '@ory/kratos-client-fetch'
import { handleFlowError }        from '@ory/client-fetch'
import { isGenericErrorResponse } from '@ory/client-fetch'

export interface FlowErrorHandlerOptions<T> {
  onRestartFlow: (useFlowId?: string) => Promise<void>
  onValidationError: (flow: T) => void
  onRedirect: OnRedirectHandler
  onGenericError?: (error: GenericError) => void
}

export const createFlowErrorHandler = <T>({
  onRestartFlow,
  onValidationError,
  onRedirect,
  onGenericError,
}: FlowErrorHandlerOptions<T>): ((error: unknown) => Promise<void>) => {
  let restart: Promise<void> | undefined
  const handler = handleFlowError<T>({
    onRestartFlow: (useFlowId) => {
      restart = onRestartFlow(useFlowId)
    },
    onRedirect,
    onValidationError: (body) => {
      if (isGenericErrorResponse(body)) {
        onGenericError?.(body.error)
      } else {
        onValidationError(body)
      }
    },
  })

  return async (error): Promise<void> => {
    await handler(error)
    await restart
  }
}

export const cloneResponseError = (error: unknown): unknown =>
  error instanceof ResponseError ? new ResponseError(error.response.clone(), error.message) : error

export const redirectInBrowser: OnRedirectHandler = (url) => {
  if (typeof window === 'undefined') {
    throw new Error('Missing redirect adapter')
  }

  window.location.assign(url)
}
