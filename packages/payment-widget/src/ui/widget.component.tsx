import * as messagesRu       from '../locales/ru.json'
import * as messagesEn       from '../locales/en.json'

import React                 from 'react'
import { useMemo }    from 'react'
import { IntlProvider }      from 'react-intl'

import { LanguagesType }     from '../enums'
import { WidgetProps }       from '../interfaces'
import { Form }              from './form'
import { FormProvider }      from './form/form.provider'
import { useCustomElements } from '../hooks'

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
}: WidgetProps) => {
  const locale = settings.language ?? LanguagesType.RUSSIAN
  const customElementsProps = useMemo(
    () => ({
      existAmount: !!amount,
      existReceipt: !!receipt,
      existAdditionalFields: !!additionalFields?.length,
      nodes: children,
    }),
    [amount, receipt, additionalFields, children]
  )
  const {
    customFields,
    customButton,
    isGenerateReceiptField,
    isGenerateRequiredField,
    nameFields,
  } = useCustomElements(customElementsProps)

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
