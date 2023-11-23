import { ReactElement }                       from 'react'

import { HandleBlurField }                    from './fields.interfaces'

import { HandleChangeField } from './fields.interfaces'

export interface InputWrapperProps {
  name: string
  children: (
    value: string,
    onChange: HandleChangeField,
    onBlur: HandleBlurField,
    errorText: string
  ) => ReactElement
}

export interface ButtonWrapperProps {
  children: () => ReactElement
}
