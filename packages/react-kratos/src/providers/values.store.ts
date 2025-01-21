import type { UiNodeInputAttributes } from '@ory/client'

import type { Flow }                  from './flow.context'
import type { Body }                  from './submit.context'

import { EventEmitter }               from 'events'

export class ValuesStore extends EventEmitter {
  #values: Body = {} as Body

  constructor() {
    super()

    this.setMaxListeners(50)
  }

  getValue(name: keyof Body): any {
    return this.#values[name]
  }

  getValues(): Body {
    return this.#values
  }

  setValue(name: keyof Body, value: Body[keyof Body]): void {
    this.#values[name] = value
    this.emit(name, value)
  }

  setFromFlow(flow: Flow): void {
    flow?.ui?.nodes?.forEach(({ attributes }): void => {
      const { name, type, value = '' } = attributes as UiNodeInputAttributes

      if (name) {
        if (type !== 'button' && type !== 'submit') {
          if (!this.#values[name as keyof Body]) {
            this.#values[name as keyof Body] = value
            this.emit(name, value)
          }
        }
      }
    })
  }
}
