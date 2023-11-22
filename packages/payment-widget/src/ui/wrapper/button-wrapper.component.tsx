import { FC }                 from 'react'

import { ButtonWrapperProps } from '../../interfaces'

export const ButtonWrapper: FC<ButtonWrapperProps> = ({ children }) => {
  if (typeof children === 'function') {
    return children()
  }

  return null
}
