import React                    from 'react'
import { FormEventHandler }     from 'react'
import { FormattedMessage }     from 'react-intl'

import { WidgetProps }          from '../interfaces'
import { Button }               from './button/button.component'
import { Fields }               from './fields.component'
import { Settings }             from './settings.component'
import { useInit }              from '../hooks'
import { useValidate }          from '../hooks'
import { makePayment }          from '../utils'
import { makePaymentWithCheck } from '../utils'

export const Form = ({
  settings,
  amount,
  receipt,
  styles,
  additionalFields,
  disabled,
  customElements,
}: WidgetProps) => {
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
  const buttonProps = {
    type: 'submit',
    disabled: !isLoaded || !!disabled,
  }

  return (
    <form name='payform-tinkoff' onSubmit={payHandler}>
      <Settings {...settings} isGenerateReceipt={!!receipt} />
      <Fields
        errors={errors}
        validateField={validateField}
        amount={amount}
        isGenerateReceipt={!!receipt}
        additionalFields={additionalFields}
        direction={styles?.direction}
        inputGaps={styles?.inputGaps}
        customInput={customElements?.input}
      />
      {customElements?.button ? (
        customElements.button(buttonProps)
      ) : (
        <Button {...buttonProps} {...styles?.button}>
          <FormattedMessage id='payment_widget.pay' defaultMessage='Оплатить' />
        </Button>
      )}
    </form>
  )
}
