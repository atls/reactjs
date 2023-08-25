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

export const Widget = ({ amount, settings, receipt, additionalFields, styles }: WidgetProps) => {
  const locale = settings.language ?? LanguagesType.RUSSIAN

  return (
    <ThemeProvider>
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
        />
      </IntlProvider>
    </ThemeProvider>
  )
}
