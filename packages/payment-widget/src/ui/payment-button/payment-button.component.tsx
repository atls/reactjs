import styled               from '@emotion/styled'

import React                from 'react'
import { FC }               from 'react'

import { ButtonProps }      from '../../interfaces'
import { ThemeButton }      from '../../interfaces'
import { appearanceStyles } from './payment-button.styles'
import { baseStyles }       from './payment-button.styles'
import { shapeStyles }      from './payment-button.styles'

const ButtonElement = styled('button')<any>(baseStyles, appearanceStyles, shapeStyles)

export const PaymentButton: FC<ButtonProps> = ({
  children,
  theme = ThemeButton.Light,
  ...props
}) => (
  <ButtonElement theme={theme} {...props}>
    {children}
  </ButtonElement>
)
