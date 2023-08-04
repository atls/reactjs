import { HiddenInput }          from '@atls-ui-parts/hidden-input'

import React                    from 'react'
import { FC }                   from 'react'

import { PaymentSettingsProps } from '../interfaces/payment-settings.interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = (props) => {
  const { storeId, language = 'ru', isNewWindow = false, generateReceipt = false } = props

  return (
    <>
      <HiddenInput name='terminalkey' value={storeId} />
      <HiddenInput name='frame' value={isNewWindow.toString()} />
      <HiddenInput name='language' value={language} />
      {generateReceipt && <HiddenInput name='receipt' value='' />}
    </>
  )
}
