import { HandleBlurField }   from './fields.interfaces'
import { HandleChangeField } from './fields.interfaces'

export interface CustomInputProps {
  type: string
  name: string
  placeholder: string
  required: boolean
  value: string
  errorText: string
  onChangeNative: HandleChangeField
  onBlur: HandleBlurField
}
