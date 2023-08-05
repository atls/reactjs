import { HiddenInput }         from '@atls-ui-parts/hidden-input'

import React                   from 'react'
import { FC }                  from 'react'

import { PaymentSettingsProps } from '../interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = (props) => {
  const { storeId, language = 'ru', isNewWindow = false, generateReceipt = false } = props

  return (
    <>
      <HiddenInput name='terminalkey' defaultValue={storeId} />
      <HiddenInput name='frame' defaultValue={isNewWindow.toString()} />
      <HiddenInput name='language' defaultValue={language} />
      {generateReceipt && <HiddenInput name='receipt' defaultValue='' />}
    </>
  )
}
