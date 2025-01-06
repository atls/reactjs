import type { FC }                from 'react'
import type { PropsWithChildren } from 'react'

import type { WidgetProps }       from '../interfaces/index.js'

import { Children }               from 'react'
import { IntlProvider }           from 'react-intl'
import { useMemo }                from 'react'
import React                      from 'react'

import { LanguagesType }          from '../enums/index.js'
import { EnLocale }               from '../locales/index.js'
import { RuLocale }               from '../locales/index.js'
import { Form }                   from './form/index.js'
import { FormProvider }           from './form/index.js'
import { useCustomButton }        from '../hooks/index.js'
import { useCustomFields }        from '../hooks/index.js'
import { getNameFields }          from '../utils/index.js'

const messages = {
  [LanguagesType.RUSSIAN]: RuLocale,
  [LanguagesType.ENGLISH]: EnLocale,
}

export const Widget: FC<PropsWithChildren<WidgetProps>> = ({
  amount,
  settings,
  receipt,
  additionalFields,
  styles,
  disabled,
}) => {
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
    <IntlProvider
      locale={locale ?? navigator.language}
      // @ts-expect-error types mismatch
      messages={messages[locale]}
      defaultLocale={LanguagesType.RUSSIAN}
    >
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
