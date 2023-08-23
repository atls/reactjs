import { Condition }     from '@atls-ui-parts/condition'
import { HiddenInput }   from '@atls-ui-parts/hidden-input'

import React             from 'react'

import { LanguagesType } from '../enums'
import { SettingsProps } from '../interfaces'

export const Settings = ({
  storeId,
  language = LanguagesType.RUSSIAN,
  isNewWindow = false,
  isGenerateReceipt = false,
}: SettingsProps) => (
  <>
    <HiddenInput name='terminalkey' defaultValue={storeId} disabled readOnly />
    <HiddenInput name='frame' defaultValue={String(isNewWindow)} disabled readOnly />
    <HiddenInput name='language' defaultValue={language} disabled readOnly />
    <Condition match={isGenerateReceipt}>
      <HiddenInput name='receipt' defaultValue='' disabled readOnly />
    </Condition>
  </>
)
