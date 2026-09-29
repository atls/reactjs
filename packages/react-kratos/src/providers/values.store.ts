import type { UiNodeInputAttributes } from '@ory/kratos-client-fetch'

import type { Flow }                  from './flow.context.js'
import type { Body }                  from './submit.context.js'

// eslint-disable-next-line n/prefer-node-protocol -- `events` is the browser polyfill package.
import { EventEmitter }               from 'events'

export class ValuesStore extends EventEmitter {
  #values: Record<string, unknown> = {}

  constructor() {
    super()

    this.setMaxListeners(50)
  }

  getValue(name: keyof Body): string {
    return this.#values[String(name)] as string
  }

  getValues(): Body {
    return this.#values as unknown as Body
  }

  setValue(name: keyof Body, value: Body[keyof Body]): void {
    const nodeName = String(name)

    this.#values[nodeName] = value
    this.emit(nodeName, value)
  }

  setFromFlow(flow: Flow): void {
    flow.ui.nodes.forEach(({ attributes }): void => {
      const { name, type, value = '' } = attributes as UiNodeInputAttributes

      if (name) {
        if (type !== 'button' && type !== 'submit') {
          if (!this.#values[name]) {
            this.#values[name] = value
            this.emit(name, value)
          }
        }
      }
    })
  }
}
