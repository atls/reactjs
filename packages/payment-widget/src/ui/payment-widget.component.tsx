import * as messagesRu        from '../locales/ru.json'
import * as messagesEn        from '../locales/en.json'

import React                  from 'react'
import { IntlProvider }       from 'react-intl'

import { LanguagesType }      from '../enums'
import { PaymentWidgetProps } from '../interfaces'
import { PaymentForm }        from './payment-form.component'
import { ThemeProvider }      from './payment-theme/src'

const messages = {
  [LanguagesType.RUSSIAN]: messagesRu,
  [LanguagesType.ENGLISH]: messagesEn,
}

export const PaymentWidget = ({
  amount,
  settings,
  receipt,
  additionalFields,
  styles,
}: PaymentWidgetProps) => {
  const locale = settings.language ?? LanguagesType.RUSSIAN

  return (
    <ThemeProvider>
      <IntlProvider
        locale={locale}
        messages={messages[locale]}
        defaultLocale={LanguagesType.RUSSIAN}
      >
        <PaymentForm
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
