import type { ReactNode }   from 'react'

import type { WidgetProps } from '../interfaces'

import { Children }         from 'react'
import { IntlProvider }     from 'react-intl'
import { useMemo }          from 'react'
import React                from 'react'

import * as messagesEn      from '../locales/en.json'
import * as messagesRu      from '../locales/ru.json'
import { LanguagesType }    from '../enums'
import { Form }             from './form'
import { FormProvider }     from './form/form.provider'
import { useCustomButton }  from '../hooks'
import { useCustomFields }  from '../hooks'
import { getNameFields }    from '../utils'

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
  children,
}: WidgetProps): ReactNode => {
  const childrenArray = Children.toArray(children)
  const locale = settings.language ?? LanguagesType.RUSSIAN
  const customFieldsProps = useMemo(
    () => ({
      existAmount: !!amount,
      existReceipt: !!receipt,
      existAdditionalFields: !!additionalFields?.length,
      nodeArray: childrenArray,
    }),
    [amount, receipt, additionalFields, childrenArray]
  )
  const { customFields, isGenerateReceiptField, isGenerateRequiredField } =
    useCustomFields(customFieldsProps)
  const customButton = useCustomButton(childrenArray)
  const nameFields = getNameFields(customFields)

  return (
    <IntlProvider locale={locale} messages={messages[locale]} defaultLocale={LanguagesType.RUSSIAN}>
      <FormProvider
        additionalFields={additionalFields}
        nameFields={nameFields}
        isGenerateReceipt={isGenerateReceiptField}
        isGenerateRequiredField={isGenerateRequiredField}
        disabled={!!disabled}
      >
        <Form
          amount={amount}
          settings={settings}
          receipt={receipt}
          styles={styles}
          useCustomButton={!!customButton}
          useCustomFields={!!customFields.length}
        >
          {customFields}
          {customButton}
        </Form>
      </FormProvider>
    </IntlProvider>
  )
}
