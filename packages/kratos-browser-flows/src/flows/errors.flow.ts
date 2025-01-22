import type { SelfServiceFlow } from './flow.interfaces'

import { AbstractFlow }         from './abstract.flow'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class ErrorsFlow extends AbstractFlow<any, any> {
  async load(): Promise<void> {
    if (typeof window === 'undefined') {
      return
    }

    if (this.hasState() || this.isLoading()) {
      return
    }

    this.setLoading(true)

    try {
      const flowId = new URL(window.location.href).searchParams.get('flow')

      if (!flowId) {
        this.complete()
      } else {
        const { data } = await this.client.getSelfServiceError(flowId, { withCredentials: true })

        this.setLoading(false)
        this.setState(data as SelfServiceFlow)
        this.setValues(data)

        this.emit('load', data)
      }
    } catch {
      this.setLoading(false)

      this.complete()
    }
  }

  // eslint-disable-next-line
  async submit() {}
}
