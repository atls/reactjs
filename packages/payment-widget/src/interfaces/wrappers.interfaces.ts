import type { ReactElement }         from 'react'

import type { AdditionalFieldsType } from '../enums'
import type { ButtonType }           from '../enums'
import type { RequiredFieldsType }   from '../enums'
import type { HandleBlurField }      from './fields.interfaces'
import type { HandleChangeField }    from './fields.interfaces'

interface ChildrenInputProps {
  name: string
  value: string
  onChangeNative: HandleChangeField
  onBlur: HandleBlurField
  errorText: string
}

interface ChildrenButtonProps {
  type: ButtonType
  disabled: boolean
}

export interface InputWrapperProps {
  name: AdditionalFieldsType | RequiredFieldsType
  children: (props: ChildrenInputProps) => ReactElement
}

export interface ButtonWrapperProps {
  children: (props: ChildrenButtonProps) => ReactElement
}
