import { ReactElement }         from 'react'

import { AdditionalFieldsType } from '../enums'
import { ButtonType }           from '../enums'
import { RequiredFieldsType }   from '../enums'
import { HandleBlurField }      from './fields.interfaces'
import { HandleChangeField }    from './fields.interfaces'

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
