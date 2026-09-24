import assert                     from 'node:assert/strict'
import { test }                   from 'node:test'

import { FetchError }             from '@ory/kratos-client-fetch'
import { RequiredError }          from '@ory/kratos-client-fetch'
import { ResponseError }          from '@ory/kratos-client-fetch'

import { createFlowErrorHandler } from '../flow-error.handler.js'

interface TestFlow {
  id: string
}

interface TestHandler {
  handler: (error: unknown) => Promise<void>
  redirects: Array<{ url: string; external: boolean }>
  restarts: Array<string | undefined>
  validations: Array<TestFlow>
}

const createHandler = (): TestHandler => {
  const restarts: Array<string | undefined> = []
  const validations: Array<TestFlow> = []
  const redirects: Array<{ url: string; external: boolean }> = []

  return {
    handler: createFlowErrorHandler<TestFlow>({
      onRestartFlow: async (useFlowId) => {
        restarts.push(useFlowId)
      },
      onValidationError: (flow) => {
        validations.push(flow)
      },
      onRedirect: (url, external) => {
        redirects.push({ url, external })
      },
    }),
    redirects,
    restarts,
    validations,
  }
}

test('passes validation responses to the flow owner', async () => {
  const flow = { id: 'login-flow' }
  const { handler, validations } = createHandler()

  await handler(new ResponseError(Response.json(flow, { status: 400 })))

  assert.deepEqual(validations, [flow])
})

test('restarts missing flows without a replacement id', async () => {
  const { handler, restarts } = createHandler()

  await handler(new ResponseError(new Response(undefined, { status: 404 })))

  assert.deepEqual(restarts, [undefined])
})

test('restarts expired flows with the vendor replacement id', async () => {
  const { handler, restarts } = createHandler()

  await handler(
    new ResponseError(
      Response.json(
        {
          error: { id: 'self_service_flow_expired' },
          use_flow_id: 'replacement-flow',
        },
        { status: 410 }
      )
    )
  )

  assert.deepEqual(restarts, ['replacement-flow'])
})

test('delegates reauthentication redirects to the platform adapter', async () => {
  const { handler, redirects } = createHandler()

  await handler(
    new ResponseError(
      Response.json(
        {
          error: { id: 'session_refresh_required' },
          redirect_browser_to: 'app://login?refresh=true',
        },
        { status: 403 }
      )
    )
  )

  assert.deepEqual(redirects, [{ url: 'app://login?refresh=true', external: true }])
})

test('delegates browser location changes to the platform adapter', async () => {
  const { handler, redirects } = createHandler()

  await handler(
    new ResponseError(
      Response.json(
        {
          error: { id: 'browser_location_change_required' },
          redirect_browser_to: 'https://identity.example.test/continue',
        },
        { status: 422 }
      )
    )
  )

  assert.deepEqual(redirects, [{ url: 'https://identity.example.test/continue', external: true }])
})

test('keeps unknown response failures in the vendor error contract', async () => {
  const { handler } = createHandler()
  const response = Response.json({ error: { id: 'unknown' } }, { status: 500 })

  await assert.rejects(handler(new ResponseError(response)), (error: Error) => {
    assert.equal(error.name, 'ResponseError')
    assert.equal((error as ResponseError).response, response)

    return true
  })
})

test('rethrows component SDK fetch failures unchanged', async () => {
  const { handler } = createHandler()
  const error = new FetchError(new Error('offline'))

  await assert.rejects(handler(error), (received) => {
    assert.equal(received, error)

    return true
  })
})

test('rethrows component SDK required-parameter failures unchanged', async () => {
  const { handler } = createHandler()
  const error = new RequiredError('flow')

  await assert.rejects(handler(error), (received) => {
    assert.equal(received, error)

    return true
  })
})
