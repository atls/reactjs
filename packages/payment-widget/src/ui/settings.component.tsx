import type { SettingsProps } from '../interfaces/index.js'

import { Condition }          from '@atls-ui-parts/condition'
import { HiddenInput }        from '@atls-ui-parts/hidden-input'
import { memo }               from 'react'
import React                  from 'react'

import { LanguagesType }      from '../enums/index.js'

export const Settings = memo(({
  storeId,
  language = LanguagesType.RUSSIAN,
  isNewWindow = false,
  isGenerateReceipt = false,
}: SettingsProps) => (
  <>
    <HiddenInput disabled readOnly name='terminalkey' defaultValue={storeId} />
    <HiddenInput disabled readOnly name='frame' defaultValue={String(isNewWindow)} />
    <HiddenInput disabled readOnly name='language' defaultValue={language} />
    <Condition match={isGenerateReceipt}>
      <HiddenInput disabled readOnly name='receipt' defaultValue='' />
    </Condition>
  </>
))
