import Adapter                                                    from 'enzyme-adapter-react-16'
import React                                                      from 'react'
import { configure, render }                                      from 'enzyme'

import { LocaleConsumer, LocaleProvider, LocaleStore, useLocale } from '../src/index'

configure({ adapter: new Adapter() })

describe('Test suit for react-locale', function describer() {
  test('should return h1 with provided context', function tester() {
    const ctxStore = new LocaleStore('en', ['en', 'ru'])

    expect(
      render(
        <LocaleProvider value={ctxStore}>
          <div>
            <LocaleConsumer>
              {localeStore => (
                <h1>{`${localeStore.getCurrent()} ${localeStore.getSupported()}`}</h1>
              )}
            </LocaleConsumer>
          </div>
        </LocaleProvider>
      ).text()
    ).toBe(`${ctxStore.getCurrent()} ${ctxStore.getSupported()}`)
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

      return <h1 className='consumer'>{`${getCurrent} ${getSupported}`}</h1>
    }

    expect(
      render(<App />)
        .find('.consumer')
        .text()
    ).toBe('ru en,ru')
  })
})
