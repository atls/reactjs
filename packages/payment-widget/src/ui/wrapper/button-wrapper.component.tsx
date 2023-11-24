import { FC }                 from 'react'

import { ButtonWrapperProps } from '../../interfaces'
import { useForm }            from '../form'

export const ButtonWrapper: FC<ButtonWrapperProps> = ({ children }) => {
  const { disabled } = useForm()
  if (typeof children === 'function') {
    return children({ type: 'submit', disabled })
  }

  return null
}
