import { AbstractFlow } from './abstract.flow'

export class LogoutFlow extends AbstractFlow<any, any> {
  async load() {
    if (typeof window === 'undefined') {
      return
    }

    if (this.hasState() || this.isLoading()) {
      return
    }

    this.setLoading(true)

    const { data } = await this.client.createSelfServiceLogoutFlowUrlForBrowsers(undefined, {
      withCredentials: true,
    })

    await this.client.submitSelfServiceLogoutFlow(data.logout_token)

    this.setLoading(false)
  }

  // eslint-disable-next-line
  async submit() {}
}
