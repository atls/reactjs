import { ReactElement }      from 'react'

import { ButtonType }        from '../enums'
import { HandleBlurField }   from './fields.interfaces'
import { HandleChangeField } from './fields.interfaces'

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
  name: string
  children: (props: ChildrenInputProps) => ReactElement
}

export interface ButtonWrapperProps {
  children: (props: ChildrenButtonProps) => ReactElement
}
