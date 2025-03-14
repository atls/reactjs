import type { UiNodeInputAttributes }     from '@ory/kratos-client'
import type { UiNode }                    from '@ory/kratos-client'
import type { UiText }                    from '@ory/kratos-client'

import type { SubmitSelfServiceFlowBody } from './flow.interfaces'
import type { SelfServiceFlow }           from './flow.interfaces'
import type { Flow }                      from './flow.interfaces'
import type { KratosClient }              from './kratos.client'

import { EventEmitter }                   from 'events'

export abstract class AbstractFlow<
    State extends SelfServiceFlow,
    Body extends SubmitSelfServiceFlowBody,
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

  setLoading(loading: boolean): void {
    this.#loading = loading
  }

  isLoading(): boolean {
    return this.#loading
  }

  setState(state: SelfServiceFlow): void {
    this.#state = state as State
  }

  hasState(): boolean {
    return Boolean(this.#state)
  }

  getState(): State {
    return this.#state
  }

  getMessages(): Array<UiText> {
    return this.#state?.ui?.messages || []
  }

  getNode(name: string): UiNode | undefined {
    return this.#state?.ui?.nodes?.find(
      (node) => (node.attributes as UiNodeInputAttributes).name === name
    )
  }

  getNodes(name: string): Array<UiNode> {
    return (
      this.#state?.ui?.nodes?.filter(
        (node) => (node.attributes as UiNodeInputAttributes).name === name
      ) || []
    )
  }

  getNodesGroup(group: string): Array<UiNode> {
    return this.#state?.ui?.nodes?.filter((node) => node.group === group) || []
  }

  getValue(name: string): string {
    return this.#values[name as keyof Body] as string
  }

  getValues(): Body {
    return this.#values
  }

  setValue(name: string, value: string): void {
    this.#values[name as keyof Body] = value as Body[keyof Body]
  }

  protected setValues(state: State): void {
    state?.ui?.nodes?.forEach(({ attributes }) => {
      if (!this.#values[(attributes as UiNodeInputAttributes).name as keyof Body]) {
        this.#values[(attributes as UiNodeInputAttributes).name as keyof Body] =
          (attributes as UiNodeInputAttributes).value || ''
      }
    })
  }

  protected complete(href = '/'): void {
    window.location.href = href
  }

  abstract load(): Promise<void>

  abstract submit(method?: string): Promise<void>
}
