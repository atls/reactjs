import React                    from 'react'
import { FC }                   from 'react'
import { FormEventHandler }     from 'react'
import { FormattedMessage }     from 'react-intl'

import { FormProps }            from '../../interfaces'
import { Button }               from '../button/button.component'
import { Fields }               from '../fields.component'
import { Settings }             from '../settings.component'
import { useInit }              from '../../hooks'
import { makePayment }          from '../../utils'
import { makePaymentWithCheck } from '../../utils'
import { useForm }              from './use-form.hook'

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
  const { isValidate, disabled } = useForm()
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
        amount={amount}
        isGenerateReceipt={isGenerateReceipt}
        additionalFields={additionalFields}
        direction={styles?.direction}
        inputGaps={styles?.inputGaps}
      />
      {children}
      {!useCustomButton && (
        <Button type='submit' disabled={!isLoaded || disabled} {...styles?.button}>
          <FormattedMessage id='payment_widget.pay' defaultMessage='Оплатить' />
        </Button>
      )}
    </form>
  )
}
