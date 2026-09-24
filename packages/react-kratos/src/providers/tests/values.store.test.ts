import type { Flow }   from '../flow.context.js'
import type { Body }   from '../submit.context.js'

import assert          from 'node:assert/strict'
import { test }        from 'node:test'

import { ValuesStore } from '../values.store.js'

const createFlow = (name: string, value: string): Flow =>
  ({
    id: 'flow-id',
    type: 'api',
    expires_at: '2030-01-01T00:00:00.000Z',
    issued_at: '2029-01-01T00:00:00.000Z',
    request_url: 'https://identity.example.test/self-service',
    ui: {
      action: 'https://identity.example.test/self-service',
      method: 'POST',
      messages: [],
      nodes: [
        {
          type: 'input',
          group: 'default',
          attributes: {
            name,
            type: 'text',
            value,
            required: true,
            disabled: false,
            node_type: 'input',
          },
          messages: [],
          meta: {},
        },
      ],
    },
  }) as unknown as Flow

test('initializes and emits dynamic values from flow nodes', () => {
  const name = 'identifier' as keyof Body
  const store = new ValuesStore()
  const emitted: Array<unknown> = []

  store.on(String(name), (value) => {
    emitted.push(value)
  })

  store.setFromFlow(createFlow(String(name), 'person@example.test'))

  assert.equal(store.getValue(name), 'person@example.test')
  assert.deepEqual(store.getValues(), { identifier: 'person@example.test' })
  assert.deepEqual(emitted, ['person@example.test'])
})

test('replaces an initialized falsy value from a later flow', () => {
  const name = 'identifier' as keyof Body
  const store = new ValuesStore()
  const emitted: Array<unknown> = []

  store.on(String(name), (value) => {
    emitted.push(value)
  })

  store.setValue(name, '' as Body[keyof Body])
  store.setFromFlow(createFlow(String(name), 'server@example.test'))

  assert.equal(store.getValue(name), 'server@example.test')
  assert.deepEqual(store.getValues(), { identifier: 'server@example.test' })
  assert.deepEqual(emitted, ['', 'server@example.test'])
})

test('does not replace an initialized non-empty value from a later flow', () => {
  const name = 'identifier' as keyof Body
  const store = new ValuesStore()
  const emitted: Array<unknown> = []

  store.on(String(name), (value) => {
    emitted.push(value)
  })

  store.setValue(name, 'person@example.test' as Body[keyof Body])
  store.setFromFlow(createFlow(String(name), 'server@example.test'))

  assert.equal(store.getValue(name), 'person@example.test')
  assert.deepEqual(store.getValues(), { identifier: 'person@example.test' })
  assert.deepEqual(emitted, ['person@example.test'])
})
