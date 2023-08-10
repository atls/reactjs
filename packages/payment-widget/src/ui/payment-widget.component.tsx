import * as messagesRu        from '../locales/ru.json'
import * as messagesEn        from '../locales/en.json'

import React                  from 'react'
import { FC }                 from 'react'
import { IntlProvider }       from 'react-intl'

import { PaymentWidgetProps } from '../interfaces'
import { Languages }          from '../interfaces'
import { PaymentForm }        from './payment-form.component'

const messages = {
  [Languages.RUSSIAN]: messagesRu,
  [Languages.ENGLISH]: messagesEn,
}

export const PaymentWidget: FC<PaymentWidgetProps> = ({
  amount,
  settings,
  additionalFields,
  receipt,
}) => {
  const locale = settings.language ?? Languages.RUSSIAN

  return (
    <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={Languages.RUSSIAN}>
      <PaymentForm
        amount={amount}
        settings={settings}
        additionalFields={additionalFields}
        receipt={receipt}
      />
    </IntlProvider>
  )
}
