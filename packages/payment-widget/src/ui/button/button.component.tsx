import styled               from '@emotion/styled'
import { ButtonProps }      from '@atls-ui-parts/button'

import React                from 'react'
import { FC }               from 'react'
import { useHover }         from 'react-laag'

import { appearanceStyles } from './button.styles'
import { contentStyles }    from './button.styles'
import { baseStyles }       from './button.styles'
import { shapeStyles }      from './button.styles'

const ButtonElement = styled('button')<any>(
  baseStyles,
  contentStyles,
  appearanceStyles,
  shapeStyles
)

export const Button: FC<ButtonProps> = ({ children, ...props }) => {
  const [hover, hoverProps] = useHover()
  return (
    <ButtonElement hover={hover} {...hoverProps} {...props}>
      {children}
    </ButtonElement>
  )
}
