import React                                                      from 'react'
import TestRenderer                                               from 'react-test-renderer'

import { LocaleConsumer, LocaleProvider, LocaleStore, useLocale } from '../src/index'

describe('Test suit for react-locale', function describer() {
  test('should return h1 with provided context', function tester() {
    const ctxStore = new LocaleStore('en', ['en', 'ru'])

    const App = () => (
      <LocaleProvider value={ctxStore}>
        <div>
          <LocaleConsumer>
            {localeStore => <h1>{`${localeStore.getCurrent()} ${localeStore.getSupported()}`}</h1>}
          </LocaleConsumer>
        </div>
      </LocaleProvider>
    )

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe(
      `${ctxStore.getCurrent()} ${ctxStore.getSupported()}`
    )
  })

  test('should track LocaleStore changes + useLocale', function tester() {
    const ctxStore = new LocaleStore('en', ['en', 'ru'])

    const App = () => <ProviderComponent />

    const ProviderComponent = () => (
      <LocaleProvider value={ctxStore}>
        <Wrapper />
      </LocaleProvider>
    )

    const Wrapper = () => (
      <div>
        <ConsumerComponent />
      </div>
    )

    const ConsumerComponent = () => {
      ctxStore.set('ru')

      const [getCurrent, getSupported] = useLocale()

      return <h1>{`${getCurrent} ${getSupported}`}</h1>
    }

    const testRenderer = TestRenderer.create(<App />)

    expect(testRenderer.root.findByType('h1').props.children).toBe('ru en,ru')
  })
})
