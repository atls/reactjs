import type { ReactNode }       from 'react'

import type { AdditionalField } from './fields.interfaces'
import type { ReceiptSettings } from './receipt.interfaces'
import type { Settings }        from './settings.interfaces'
import type { Styles }          from './styles.interfaces'

export interface WidgetProps {
  settings: Settings
  amount?: number
  receipt?: ReceiptSettings
  styles?: Styles
  additionalFields?: Array<AdditionalField>
  disabled?: boolean
  children?: ReactNode
}
