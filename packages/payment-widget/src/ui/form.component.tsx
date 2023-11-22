import React                    from 'react'
import { FC }                   from 'react'
import { FormEventHandler }     from 'react'
import { FormattedMessage }     from 'react-intl'
import { useMemo }              from 'react'
import { createContext }        from 'react'

import { FormProps }            from '../interfaces'
import { Button }               from './button/button.component'
import { Fields }               from './fields.component'
import { Settings }             from './settings.component'
import { useInit }              from '../hooks'
import { useValidate }          from '../hooks'
import { makePayment }          from '../utils'
import { makePaymentWithCheck } from '../utils'

export const FormContext = createContext<any>(null)

export const Form: FC<FormProps> = ({
  settings,
  amount,
  receipt,
  styles,
  additionalFields,
  useCustomButton,
  isGenerateReceipt,
  children,
}) => {
  const isLoaded = useInit()
  const { errors, validateField, isValidate } = useValidate()
  const payHandler: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    if (!isValidate) return

    if (receipt) {
      makePaymentWithCheck(event, receipt)
    } else {
      makePayment(event)
    }
  }

  return (
    <form name='payform-tinkoff' onSubmit={payHandler}>
      <Settings {...settings} isGenerateReceipt={isGenerateReceipt} />
      <Fields
        errors={errors}
        validateField={validateField}
        amount={amount}
        isGenerateReceipt={isGenerateReceipt}
        additionalFields={additionalFields}
        direction={styles?.direction}
        inputGaps={styles?.inputGaps}
      />
      <FormContext.Provider
        value={useMemo(() => ({ errors, validateField }), [errors, validateField])}
      >
        {children}
      </FormContext.Provider>
      {!useCustomButton && (
        <Button type='submit' disabled={!isLoaded} {...styles?.button}>
          <FormattedMessage id='payment_widget.pay' defaultMessage='Оплатить' />
        </Button>
      )}
    </form>
  )
}
