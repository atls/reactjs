import { Condition }            from '@atls-ui-parts/condition'
import { HiddenInput }          from '@atls-ui-parts/hidden-input'

import React                    from 'react'
import { FC }                   from 'react'

import { Languages }            from '../interfaces'
import { PaymentSettingsProps } from '../interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = (props) => {
  const {
    storeId,
    language = Languages.RUSSIAN,
    isNewWindow = false,
    isGenerateReceipt = false,
  } = props

  return (
    <>
      <HiddenInput name='terminalkey' defaultValue={storeId} />
      <HiddenInput name='frame' defaultValue={isNewWindow.toString()} />
      <HiddenInput name='language' defaultValue={language} />
      <Condition match={isGenerateReceipt}>
        <HiddenInput name='receipt' defaultValue='' />
      </Condition>
    </>
  )
}
