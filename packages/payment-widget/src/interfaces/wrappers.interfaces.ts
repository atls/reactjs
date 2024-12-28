import type { ReactElement }         from 'react'

import type { AdditionalFieldsType } from '../enums/index.js'
import type { ButtonType }           from '../enums/index.js'
import type { RequiredFieldsType }   from '../enums/index.js'
import type { HandleBlurField }      from './fields.interfaces.js'
import type { HandleChangeField }    from './fields.interfaces.js'

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
