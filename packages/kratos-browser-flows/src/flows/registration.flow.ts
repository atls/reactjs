import type { SelfServiceRegistrationFlow }           from '@ory/kratos-client'
import type { SubmitSelfServiceRegistrationFlowBody } from '@ory/kratos-client'
import type { AxiosResponse }                         from 'axios'
import type { AxiosError }                            from 'axios'

import { AbstractFlow }                               from './abstract.flow'

export class RegistrationFlow extends AbstractFlow<
  SelfServiceRegistrationFlow,
  SubmitSelfServiceRegistrationFlowBody
> {
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

      const { data } = flowId
        ? await this.client.getSelfServiceRegistrationFlow(flowId, undefined, {
            withCredentials: true,
          })
        : await this.client.initializeSelfServiceRegistrationFlowForBrowsers({
            withCredentials: true,
          })

      this.setLoading(false)
      this.setState(data)
      this.setValues(data)

      this.emit('load', data)
    } catch (error) {
      this.setLoading(false)

      const { status } = (error as AxiosError<SelfServiceRegistrationFlow>)
        .response as AxiosResponse<SelfServiceRegistrationFlow>

      if (status === 410) {
        this.complete(window.location.pathname)
      } else if (status === 403) {
        this.complete(window.location.pathname)
      } else if (status === 400) {
        this.complete()
      } else {
        throw error
      }
    }
  }

  async submit(method?: string) {
    const body = this.getValues()

    if (method) {
      body.method = method
    }

    try {
      await this.client.submitSelfServiceRegistrationFlow(this.getState().id, body, {
        withCredentials: true,
      })

      this.complete()
    } catch (error) {
      const { data, status } = (error as AxiosError<SelfServiceRegistrationFlow>)
        .response as AxiosResponse<SelfServiceRegistrationFlow>

      if (status === 400) {
        this.setState(data)
        this.setValues(data)
        this.emit('load', data)
      }
    }
  }
}
