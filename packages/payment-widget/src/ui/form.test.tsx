/**
 * @jest-environment jsdom
 */

import { matchers }      from '@emotion/jest'
import { RenderResult }  from '@testing-library/react'
import { fireEvent }     from '@testing-library/react'
import { render }        from '@testing-library/react'
import { screen }        from '@testing-library/react'

import React            from 'react'
import { IntlProvider } from 'react-intl'
import { theme }        from './theme/src'
import { ThemeProvider }        from './theme/src'
import { Settings }     from '../interfaces'
import { Form }         from './form.component'

expect.extend(matchers)

type CustomRender = (element: React.ReactNode | React.ReactNode[]) => RenderResult

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

const customRender: CustomRender = (element) => {
  return render(
    // @ts-ignore
    <ThemeProvider>
      <IntlProvider locale='ru' onError={() => {}}>
        {element}
      </IntlProvider>
    </ThemeProvider>
  )
}

describe('Form fragment', () => {
  const settings: Settings = {
    storeId: '123'
  }

  it.only('button reacts to filled in amount', () => {
    customRender(<Form settings={settings} />)

    const button = screen.getByRole('button', { name: 'Оплатить' })

    expect(button).toBeTruthy()
    expect(button).toHaveStyleRule('background-color', theme.colors.button.disabled.backgroundColor)

    const input = screen.getByPlaceholderText('payment_widget.order_price')

    fireEvent.change(input, { target: { value: '100' }})

    expect(screen.getByRole('button', { name: 'Оплатить' })).toHaveStyleRule('background-color', theme.colors.button.default.backgroundColor)
  })
})
