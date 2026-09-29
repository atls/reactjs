import 'global-jsdom/register'

import type { FrontendApi }                from '@ory/kratos-client-fetch'
import type { LoginFlow }                  from '@ory/kratos-client-fetch'
import type { RegistrationFlow }           from '@ory/kratos-client-fetch'
import type { UpdateLoginFlowBody }        from '@ory/kratos-client-fetch'
import type { UpdateRegistrationFlowBody } from '@ory/kratos-client-fetch'
import type { ReactElement }               from 'react'

import type { Body }                       from '../src/index.js'
import type { ContextSubmit }              from '../src/index.js'

import assert                              from 'node:assert/strict'
import { afterEach }                       from 'node:test'
import { test }                            from 'node:test'

import { ResponseError }                   from '@ory/kratos-client-fetch'
import { act }                             from '@testing-library/react'
import { cleanup }                         from '@testing-library/react'
import { render }                          from '@testing-library/react'
import { screen }                          from '@testing-library/react'
import { waitFor }                         from '@testing-library/react'
import React                               from 'react'

import { FlowInputNode }                   from '../src/index.js'
import { FlowMessages }                    from '../src/index.js'
import { FlowSubmit }                      from '../src/index.js'
import { LoginNativeFlow }                 from '../src/index.js'
import { RegistrationNativeFlow }          from '../src/index.js'
import { SdkProvider }                     from '../src/index.js'

type NativeFlow = LoginFlow | RegistrationFlow
type Submit<T extends Body> = ContextSubmit<T>['onSubmit']

const requireValue = <T,>(value: T | undefined, name: string): T => {
  if (typeof value === 'undefined') {
    throw new Error(`Missing ${name}`)
  }

  return value
}

interface FlowProbeProps<T extends Body> {
  nodeName: string
  onSubmitReady: (submit: Submit<T>) => void
}

const FlowProbe = <T extends Body>({
  nodeName,
  onSubmitReady,
}: FlowProbeProps<T>): ReactElement => (
  <>
    <FlowMessages>
      {(messages) => <div data-testid='messages'>{messages.map(({ text }) => text).join('|')}</div>}
    </FlowMessages>
    <FlowInputNode name={nodeName}>
      {(node) => <div data-testid='node'>{node.attributes.name}</div>}
    </FlowInputNode>
    <FlowSubmit<T>>
      {({ onSubmit, submitting }) => {
        onSubmitReady(onSubmit)

        return <div data-testid='submitting'>{submitting ? 'submitting' : 'idle'}</div>
      }}
    </FlowSubmit>
  </>
)

const createFlow = <T extends NativeFlow>(id: string, message: string, nodeName: string): T =>
  ({
    id,
    type: 'api',
    expires_at: '2030-01-01T00:00:00.000Z',
    issued_at: '2029-01-01T00:00:00.000Z',
    request_url: 'https://identity.example.test/self-service',
    ui: {
      action: 'https://identity.example.test/self-service',
      method: 'POST',
      messages: [
        {
          id: 1,
          text: message,
          type: 'error',
          context: {},
        },
      ],
      nodes: [
        {
          type: 'input',
          group: 'default',
          attributes: {
            name: nodeName,
            type: 'text',
            value: '',
            required: true,
            disabled: false,
            node_type: 'input',
          },
          messages: [],
          meta: {},
        },
      ],
    },
  }) as unknown as T

afterEach(() => {
  cleanup()
})

test('login expiration rejects when loading the replacement flow fails', async () => {
  const initial = createFlow<LoginFlow>('login-initial', 'login initial', 'identifier')
  const replacementId = 'login-replacement'
  const restartError = new Error('login replacement failed')
  const requestedFlowIds: Array<string> = []
  const reportedErrors: Array<unknown> = []
  const sdk = {
    createNativeLoginFlow: async () => initial,
    getLoginFlow: async ({ id }: Parameters<FrontendApi['getLoginFlow']>[0]) => {
      requestedFlowIds.push(id)

      throw restartError
    },
    updateLoginFlow: async () => {
      throw new ResponseError(
        Response.json(
          {
            error: { id: 'self_service_flow_expired' },
            use_flow_id: replacementId,
          },
          { status: 410 }
        )
      )
    },
  } as unknown as FrontendApi
  let submit: Submit<UpdateLoginFlowBody> | undefined

  render(
    <SdkProvider value={sdk}>
      <LoginNativeFlow
        onError={(error) => {
          reportedErrors.push(error)
        }}
      >
        <FlowProbe<UpdateLoginFlowBody>
          nodeName='identifier'
          onSubmitReady={(ready) => {
            submit = ready
          }}
        />
      </LoginNativeFlow>
    </SdkProvider>
  )

  await screen.findByText('login initial')
  const onSubmit = requireValue(submit, 'login submit callback')

  await act(async () => {
    await assert.rejects(onSubmit(), (error: Error) => {
      assert.equal(error, restartError)

      return true
    })
  })

  assert.deepEqual(requestedFlowIds, [replacementId])
  assert.deepEqual(reportedErrors, [restartError])
  assert.equal(screen.getByTestId('submitting').textContent, 'idle')
})

test('registration expiration rejects when loading the replacement flow fails', async () => {
  const initial = createFlow<RegistrationFlow>(
    'registration-initial',
    'registration initial',
    'traits.email'
  )
  const replacementId = 'registration-replacement'
  const restartError = new Error('registration replacement failed')
  const requestedFlowIds: Array<string> = []
  const reportedErrors: Array<unknown> = []
  const sdk = {
    createNativeRegistrationFlow: async () => initial,
    getRegistrationFlow: async ({ id }: Parameters<FrontendApi['getRegistrationFlow']>[0]) => {
      requestedFlowIds.push(id)

      throw restartError
    },
    updateRegistrationFlow: async () => {
      throw new ResponseError(
        Response.json(
          {
            error: { id: 'self_service_flow_expired' },
            use_flow_id: replacementId,
          },
          { status: 410 }
        )
      )
    },
  } as unknown as FrontendApi
  let submit: Submit<UpdateRegistrationFlowBody> | undefined

  render(
    <SdkProvider value={sdk}>
      <RegistrationNativeFlow
        onError={(error) => {
          reportedErrors.push(error)
        }}
      >
        <FlowProbe<UpdateRegistrationFlowBody>
          nodeName='traits.email'
          onSubmitReady={(ready) => {
            submit = ready
          }}
        />
      </RegistrationNativeFlow>
    </SdkProvider>
  )

  await screen.findByText('registration initial')
  const onSubmit = requireValue(submit, 'registration submit callback')

  await act(async () => {
    await assert.rejects(onSubmit(), (error: Error) => {
      assert.equal(error, restartError)

      return true
    })
  })

  assert.deepEqual(requestedFlowIds, [replacementId])
  assert.deepEqual(reportedErrors, [restartError])
  assert.equal(screen.getByTestId('submitting').textContent, 'idle')
})

test('unknown login failures reject the public submit promise and reset submitting', async () => {
  const initial = createFlow<LoginFlow>('login-initial', 'login initial', 'identifier')
  const response = Response.json({ error: { id: 'unknown' } }, { status: 500 })
  let rejectUpdate: ((error: Error) => void) | undefined
  const sdk = {
    createNativeLoginFlow: async () => initial,
    updateLoginFlow: async () =>
      new Promise<never>((resolve, reject) => {
        rejectUpdate = reject
      }),
  } as unknown as FrontendApi
  let submit: Submit<UpdateLoginFlowBody> | undefined

  render(
    <SdkProvider value={sdk}>
      <LoginNativeFlow>
        <FlowProbe<UpdateLoginFlowBody>
          nodeName='identifier'
          onSubmitReady={(ready) => {
            submit = ready
          }}
        />
      </LoginNativeFlow>
    </SdkProvider>
  )

  await screen.findByText('login initial')
  const onSubmit = requireValue(submit, 'login submit callback')

  let pending: Promise<void> | undefined

  act(() => {
    pending = onSubmit()
  })

  await waitFor(() => {
    assert.equal(screen.getByTestId('submitting').textContent, 'submitting')
  })

  const reject = requireValue(rejectUpdate, 'update rejection callback')
  const submitResult = requireValue(pending, 'submit result')

  await act(async () => {
    reject(new ResponseError(response))

    await assert.rejects(submitResult, (error: Error) => {
      assert.equal(error.name, 'ResponseError')
      assert.equal((error as ResponseError).response, response)

      return true
    })
  })

  assert.equal(screen.getByTestId('submitting').textContent, 'idle')
})
