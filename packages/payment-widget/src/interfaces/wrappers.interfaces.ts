import { ReactElement }      from 'react'

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
  type: string
  disabled: boolean
}

export interface InputWrapperProps {
  name: string
  children: (props: ChildrenInputProps) => ReactElement
}

export interface ButtonWrapperProps {
  children: (props: ChildrenButtonProps) => ReactElement
}
