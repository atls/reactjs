import * as messagesRu  from '../locales/ru.json'
import * as messagesEn  from '../locales/en.json'

import React            from 'react'
import { IntlProvider } from 'react-intl'

import { Languages }    from '../interfaces/payment-settings.interfaces'
import { PaymentForm }  from './payment-form.component'

const messages = {
  [Languages.RUSSIAN]: messagesRu,
  [Languages.ENGLISH]: messagesEn,
}

export const PaymentWidget = ({ settings, additionalFields }) => {
  const locale = settings.language ?? Languages.RUSSIAN

  return (
    <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={Languages.RUSSIAN}>
      <PaymentForm settings={settings} additionalFields={additionalFields} />
    </IntlProvider>
  )
}
