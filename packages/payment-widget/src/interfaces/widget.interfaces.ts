import { AdditionalField } from './fields.interfaces'
import { ReceiptSettings } from './receipt.interfaces'
import { Settings }        from './settings.interfaces'
import { Styles }          from './styles.interfaces'

export interface WidgetProps {
  settings: Settings
  amount?: number
  receipt?: ReceiptSettings
  styles?: Styles
  additionalFields?: AdditionalField[]
  customTheme?: boolean
  disabled?: boolean
}