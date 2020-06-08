import { Component, createElement } from 'react'

import { Provider }                 from './Context'
import { ModalsStore }              from './ModalsStore'

export class ModalsProvider extends Component {
  public readonly store: ModalsStore

  public constructor(props: any) {
    super(props)
    this.store = props.store || new ModalsStore()
  }

  public render(): JSX.Element {
    const { children } = this.props
    return createElement(Provider, { value: this.store }, children)
  }
}
