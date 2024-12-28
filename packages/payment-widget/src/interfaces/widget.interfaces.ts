import type { ReactNode }       from 'react'

import type { AdditionalField } from './fields.interfaces.js'
import type { ReceiptSettings } from './receipt.interfaces.js'
import type { Settings }        from './settings.interfaces.js'
import type { Styles }          from './styles.interfaces.js'

export interface WidgetProps {
  settings: Settings
  amount?: number
  receipt?: ReceiptSettings
  styles?: Styles
  additionalFields?: Array<AdditionalField>
  disabled?: boolean
  children?: ReactNode
}
