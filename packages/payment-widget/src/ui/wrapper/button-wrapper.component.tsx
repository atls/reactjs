import { FC }                 from 'react'

import { ButtonType }         from '../../enums'
import { ButtonWrapperProps } from '../../interfaces'
import { useForm }            from '../form'

export const ButtonWrapper: FC<ButtonWrapperProps> = ({ children }) => {
  const { disabled } = useForm()
  if (typeof children === 'function') {
    return children({ type: ButtonType.Submit, disabled })
  }

  return null
}
