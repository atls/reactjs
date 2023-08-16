import styled               from '@emotion/styled'
import { ButtonProps }      from '@atls-ui-parts/button'

import React                from 'react'
import { FC }               from 'react'
import { useHover }         from 'react-laag'

import { appearanceStyles } from './payment-button.styles'
import { contentStyles }    from './payment-button.styles'
import { baseStyles }       from './payment-button.styles'
import { shapeStyles }      from './payment-button.styles'

const ButtonElement = styled('button')<any>(
  baseStyles,
  contentStyles,
  appearanceStyles,
  shapeStyles
)

export const PaymentButton: FC<ButtonProps> = ({ children, ...props }) => {
  const [hover, hoverProps] = useHover()
  return (
    <ButtonElement hover={hover} {...hoverProps} {...props}>
      {children}
    </ButtonElement>
  )
}
