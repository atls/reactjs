import type { SelfServiceSettingsFlow }           from '@ory/kratos-client'
import type { SubmitSelfServiceSettingsFlowBody } from '@ory/kratos-client'
import type { AxiosResponse }                     from 'axios'
import type { AxiosError }                        from 'axios'

import { AbstractFlow }                           from './abstract.flow'

export class SettingsFlow extends AbstractFlow<
  SelfServiceSettingsFlow,
  SubmitSelfServiceSettingsFlowBody
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
        ? await this.client.getSelfServiceSettingsFlow(flowId, undefined, undefined, {
            withCredentials: true,
          })
        : await this.client.initializeSelfServiceSettingsFlowForBrowsers(undefined, {
            withCredentials: true,
          })

      this.setLoading(false)
      this.setState(data)
      this.setValues(data)

      this.emit('load', data)
    } catch (error) {
      this.setLoading(false)

      const { status } = (error as AxiosError<SelfServiceSettingsFlow>)
        .response as AxiosResponse<SelfServiceSettingsFlow>

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
      const { data } = await this.client.submitSelfServiceSettingsFlow(
        this.getState().id,
        undefined,
        body,
        {
          withCredentials: true,
        }
      )

      this.setState(data.flow)
      this.setValues(data.flow)
      this.emit('load', data.flow)
    } catch (error) {
      const { data, status } = (error as AxiosError<SelfServiceSettingsFlow>)
        .response as AxiosResponse<SelfServiceSettingsFlow>

      if (status === 400) {
        this.setState(data)
        this.setValues(data)
        this.emit('load', data)
      }
    }
  }
}
