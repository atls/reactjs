import type { UiNodeInputAttributes }     from '@ory/kratos-client'
import { EventEmitter }                   from 'events'

import { KratosClient }                   from './kratos.client'
import type { SubmitSelfServiceFlowBody } from './flow.interfaces'
import type { SelfServiceFlow }           from './flow.interfaces'
import type { Flow }                      from './flow.interfaces'

export abstract class AbstractFlow<
    State extends SelfServiceFlow,
    Body extends SubmitSelfServiceFlowBody
  >
  extends EventEmitter
  implements Flow
{
  #values: Body = {} as Body

  #state: State

  #loading = false

  constructor(protected readonly client: KratosClient) {
    super()

    this.setMaxListeners(50)
  }

  setLoading(loading) {
    this.#loading = loading
  }

  isLoading() {
    return this.#loading
  }

  setState(state) {
    this.#state = state
  }

  hasState() {
    return Boolean(this.#state)
  }

  getState() {
    return this.#state
  }

  getMessages() {
    return this.#state?.ui?.messages || []
  }

  getNode(name) {
    return this.#state?.ui?.nodes?.find(
      (node) => (node.attributes as UiNodeInputAttributes).name === name
    )
  }

  getNodes(name) {
    return (
      this.#state?.ui?.nodes?.filter(
        (node) => (node.attributes as UiNodeInputAttributes).name === name
      ) || []
    )
  }

  getNodesGroup(group) {
    return this.#state?.ui?.nodes?.filter((node) => node.group === group) || []
  }

  getValue(name): string | any {
    return this.#values[name]
  }

  getValues() {
    return this.#values
  }

  setValue(name: string, value: string) {
    this.#values[name] = value
  }

  protected setValues(state: State) {
    state?.ui?.nodes?.forEach(({ attributes }) => {
      if (!this.#values[(attributes as UiNodeInputAttributes).name]) {
        this.#values[(attributes as UiNodeInputAttributes).name] =
          (attributes as UiNodeInputAttributes).value || ''
      }
    })
  }

  protected complete(href = '/') {
    window.location.href = href
  }

  abstract load()

  abstract submit(method?: string)
}
