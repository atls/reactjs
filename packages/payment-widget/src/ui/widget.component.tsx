import * as messagesRu   from '../locales/ru.json'
import * as messagesEn   from '../locales/en.json'

import React             from 'react'
import { IntlProvider }  from 'react-intl'

import { LanguagesType } from '../enums'
import { WidgetProps }   from '../interfaces'
import { Form }          from './form.component'
import { ThemeProvider } from './theme/src'

const messages = {
  [LanguagesType.RUSSIAN]: messagesRu,
  [LanguagesType.ENGLISH]: messagesEn,
}

export const Widget = ({
  amount,
  settings,
  receipt,
  additionalFields,
  styles,
  disabled,
  customElements,
}: WidgetProps) => {
  const locale = settings.language ?? LanguagesType.RUSSIAN
  const useCustomTheme = !!customElements?.input

  return (
    <ThemeProvider useCustomTheme={useCustomTheme}>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale={LanguagesType.RUSSIAN}
      >
        <Form
          amount={amount}
          settings={settings}
          receipt={receipt}
          styles={styles}
          additionalFields={additionalFields}
          disabled={disabled}
          customElements={customElements}
        />
      </IntlProvider>
    </ThemeProvider>
  )
}
