import { AbstractFlow } from './abstract.flow'

export class ErrorsFlow extends AbstractFlow<any, any> {
  async load() {
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
        this.setState(data)
        this.setValues(data)

        this.emit('load', data)
      }
    } catch (error) {
      this.setLoading(false)

      this.complete()
    }
  }

  // eslint-disable-next-line
  async submit() {}
}
