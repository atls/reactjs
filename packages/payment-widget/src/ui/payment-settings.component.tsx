import { Condition }            from '@atls-ui-parts/condition'
import { HiddenInput }          from '@atls-ui-parts/hidden-input'

import React                    from 'react'
import { FC }                   from 'react'

import { Languages }            from '../interfaces'
import { PaymentSettingsProps } from '../interfaces'

export const PaymentSettings: FC<PaymentSettingsProps> = ({
  storeId,
  language = Languages.RUSSIAN,
  isNewWindow = false,
  isGenerateReceipt = false,
}) => (
  <>
    <HiddenInput name='terminalkey' defaultValue={storeId} disabled readOnly />
    <HiddenInput name='frame' defaultValue={String(isNewWindow)} disabled readOnly />
    <HiddenInput name='language' defaultValue={language} disabled readOnly />
    <Condition match={isGenerateReceipt}>
      <HiddenInput name='receipt' defaultValue='' disabled readOnly />
    </Condition>
  </>
)
