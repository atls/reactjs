import type { SelfServiceLoginFlow }           from '@ory/kratos-client'
import type { SubmitSelfServiceLoginFlowBody } from '@ory/kratos-client'
import type { AxiosResponse }                  from 'axios'
import type { AxiosError }                     from 'axios'

import { AbstractFlow }                        from './abstract.flow'

export class LoginFlow extends AbstractFlow<SelfServiceLoginFlow, SubmitSelfServiceLoginFlowBody> {
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

      const { data } = flowId
        ? await this.client.getSelfServiceLoginFlow(flowId, undefined, { withCredentials: true })
        : await this.client.initializeSelfServiceLoginFlowForBrowsers(false, undefined, undefined, {
            withCredentials: true,
          })

      this.setLoading(false)
      this.setState(data)
      this.setValues(data)

      this.emit('load', data)
    } catch (error) {
      this.setLoading(false)
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const { status } = (error as AxiosError<SelfServiceLoginFlow>)
        .response as AxiosResponse<SelfServiceLoginFlow>

      if (status === 400) {
        this.complete()
      } else if (status === 410) {
        this.complete('/auth/login')
      } else {
        throw error
      }
    }
  }

  async submit(method?: string): Promise<void> {
    const body = this.getValues()

    if (method) {
      body.method = method
    }

    try {
      await this.client.submitSelfServiceLoginFlow(this.getState().id, undefined, body, {
        withCredentials: true,
      })

      this.complete()
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/non-nullable-type-assertion-style
      const { data, status } = (error as AxiosError<SelfServiceLoginFlow>)
        .response as AxiosResponse<SelfServiceLoginFlow>

      if (status === 400) {
        this.setState(data)
        this.setValues(data)
        this.emit('load', data)
      }
    }
  }
}
