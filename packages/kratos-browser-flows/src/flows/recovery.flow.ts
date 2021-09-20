import type { SelfServiceRecoveryFlow }           from '@ory/kratos-client'
import type { SubmitSelfServiceRecoveryFlowBody } from '@ory/kratos-client'
import type { AxiosResponse }                     from 'axios'
import type { AxiosError }                        from 'axios'

import { AbstractFlow }                           from './abstract.flow'

export class RecoveryFlow extends AbstractFlow<
  SelfServiceRecoveryFlow,
  SubmitSelfServiceRecoveryFlowBody
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
        ? await this.client.getSelfServiceRecoveryFlow(flowId, undefined, {
            withCredentials: true,
          })
        : await this.client.initializeSelfServiceRecoveryFlowForBrowsers({
            withCredentials: true,
          })

      this.setLoading(false)
      this.setState(data)
      this.setValues(data)

      this.emit('load', data)
    } catch (error) {
      this.setLoading(false)

      const { status } = (error as AxiosError<SelfServiceRecoveryFlow>)
        .response as AxiosResponse<SelfServiceRecoveryFlow>

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
      const { data } = await this.client.submitSelfServiceRecoveryFlow(
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
      const { data, status } = (error as AxiosError<SelfServiceRecoveryFlow>)
        .response as AxiosResponse<SelfServiceRecoveryFlow>

      if (status === 400) {
        this.setState(data)
        this.setValues(data)
        this.emit('load', data)
      }
    }
  }
}
