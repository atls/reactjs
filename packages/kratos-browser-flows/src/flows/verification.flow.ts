import type { SelfServiceVerificationFlow }           from '@ory/kratos-client'
import type { SubmitSelfServiceVerificationFlowBody } from '@ory/kratos-client'
import type { AxiosResponse }                         from 'axios'
import type { AxiosError }                            from 'axios'

import { AbstractFlow }                               from './abstract.flow'

export class VerificationFlow extends AbstractFlow<
  SelfServiceVerificationFlow,
  SubmitSelfServiceVerificationFlowBody
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
        ? await this.client.getSelfServiceVerificationFlow(flowId, undefined, {
            withCredentials: true,
          })
        : await this.client.initializeSelfServiceVerificationFlowForBrowsers({
            withCredentials: true,
          })

      this.setLoading(false)
      this.setState(data)
      this.setValues(data)

      this.emit('load', data)
    } catch (error) {
      this.setLoading(false)

      const { status } = (error as AxiosError<SelfServiceVerificationFlow>)
        .response as AxiosResponse<SelfServiceVerificationFlow>

      if (status === 410) {
        this.complete(window.location.pathname)
      } else if (status === 403) {
        this.complete(window.location.pathname)
      } else {
        throw error
      }

      throw error
    }
  }

  async submit(method?: string) {
    const body = this.getValues()

    if (method) {
      body.method = method
    }

    try {
      const { data } = await this.client.submitSelfServiceVerificationFlow(
        this.getState().id,
        undefined,
        body,
        {
          withCredentials: true,
        }
      )

      this.setState(data)
      this.setValues(data)
      this.emit('load', data)
    } catch (error) {
      const { data, status } = (error as AxiosError<SelfServiceVerificationFlow>)
        .response as AxiosResponse<SelfServiceVerificationFlow>

      if (status === 400) {
        this.setState(data)
        this.setValues(data)
        this.emit('load', data)
      }
    }
  }
}
