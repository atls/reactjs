import { Input }                from '@atls-ui-proto/input'

import React                    from 'react'
import { FC }                   from 'react'

import { PaymentSettingsProps } from '../interfaces/payment-settings.interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = (props) => {
  const { storeId, language = 'ru', isNewWindow = false, generateReceipt = false } = props

  return (
    <>
      <Input type='hidden' name='terminalkey' value={storeId} />
      <Input type='hidden' name='frame' value={isNewWindow.toString()} />
      <Input type='hidden' name='language' value={language} />
      {generateReceipt && <Input type='hidden' name='receipt' value='' />}
    </>
  )
}
