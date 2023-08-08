import { Condition }            from '@atls-ui-parts/condition'
import { HiddenInput }          from '@atls-ui-parts/hidden-input'

import React                    from 'react'
import { FC }                   from 'react'

import { PaymentSettingsProps } from '../interfaces'
import { Languages }            from '../interfaces/payment-settings.interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = (props) => {
  const {
    storeId,
    language = Languages.RUSSIAN,
    isNewWindow = false,
    generateReceipt = false,
  } = props

  return (
    <>
      <HiddenInput name='terminalkey' defaultValue={storeId} />
      <HiddenInput name='frame' defaultValue={isNewWindow.toString()} />
      <HiddenInput name='language' defaultValue={language} />
      <Condition match={generateReceipt}>
        <HiddenInput name='receipt' defaultValue='' />
      </Condition>
    </>
  )
}
